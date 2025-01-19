import React, { useState, useEffect } from "react";
import {
    Alert,
    Text,
    TouchableOpacity,
    View,
    Modal,
    FlatList,
    Platform,
} from "react-native";
import { stylesFilterModal } from "./styleFilterModal";
import { api } from "../services/api";
import {Picker} from "@react-native-picker/picker";

type FilterModalProps = {
    visible: boolean;
    categories: { id: number; nome: string }[];
    onClose: () => void;
    onApplyFilters: (filters: {
        tipoRegistro: number | null;
        tipoTransacao: number | null;
        categoria: number | null;
        subCategoria: number | null;
    }) => void;
};

export function FilterModal({
                                visible,
                                categories,
                                onClose,
                                onApplyFilters,
                            }: FilterModalProps) {
    const [tipoRegistro, setTipoRegistro] = useState<number | null>(null);
    const [tipoTransacao, setTipoTransacao] = useState<number | null>(null);
    const [categoria, setCategoria] = useState<number | null>(null);
    const [subCategoria, setSubCategoria] = useState<number | null>(null);
    const [subCategories, setSubCategories] = useState<{ id: number; nome: string }[]>([]);
    const [iosPickerVisible, setIosPickerVisible] = useState<{
        type: "tipoRegistro" | "tipoTransacao" | "categoria" | "subCategoria";
        visible: boolean;
    }>({ type: "categoria", visible: false });

    useEffect(() => {
        if (categoria) {
            fetchSubCategories(categoria);
        } else {
            setSubCategories([]);
            setSubCategoria(null);
        }
    }, [categoria]);

    const fetchSubCategories = async (categoryId: number) => {
        try {
            const response = await api.get(
                `/subcategorias-registro-financeiros/findByIdCategoria/${categoryId}`
            );
            setSubCategories(response.data);
        } catch (error: any) {
            Alert.alert(
                "Erro ao carregar subcategorias",
                error.response?.data?.message || error.message || "Não foi possível carregar as subcategorias."
            );
        }
    };

    const handleOptionSelect = (type: string, value: any) => {
        switch (type) {
            case "tipoRegistro":
                setTipoRegistro(value);
                break;
            case "tipoTransacao":
                setTipoTransacao(value);
                break;
            case "categoria":
                setCategoria(value);
                break;
            case "subCategoria":
                setSubCategoria(value);
                break;
        }
        setIosPickerVisible({ ...iosPickerVisible, visible: false });
    };

    const renderIosPicker = (type: string, options: { label: string; value: any }[]) => (
        <Modal
            visible={iosPickerVisible.visible && iosPickerVisible.type === type}
            animationType="slide"
            transparent={true}
        >
            <View style={stylesFilterModal.modalOverlay}>
                <View style={stylesFilterModal.modalContent}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => String(item.value)}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={stylesFilterModal.modalOption}
                                onPress={() => handleOptionSelect(type, item.value)}
                            >
                                <Text style={stylesFilterModal.modalOptionText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={stylesFilterModal.modalCancelButton}
                        onPress={() => setIosPickerVisible({ ...iosPickerVisible, visible: false })}
                    >
                        <Text style={stylesFilterModal.modalCancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const renderPickerForPlatform = (
        type: "tipoRegistro" | "tipoTransacao" | "categoria" | "subCategoria",
        selectedValue: any,
        options: { label: string; value: any }[]
    ) => {
        if (Platform.OS === "ios") {
            const selectedOption =
                options.find((option) => option.value === selectedValue)?.label || "Selecione";
            return (
                <>
                    <TouchableOpacity
                        style={stylesFilterModal.pickerButton}
                        onPress={() => setIosPickerVisible({ type, visible: true })}
                    >
                        <Text style={stylesFilterModal.pickerButtonText}>{selectedOption}</Text>
                    </TouchableOpacity>
                    {renderIosPicker(type, options)}
                </>
            );
        } else {
            return (
                <Picker
                    selectedValue={selectedValue}
                    style={stylesFilterModal.picker}
                    onValueChange={(itemValue) => handleOptionSelect(type, itemValue)}
                >
                    {options.map((option) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>
            );
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={stylesFilterModal.container}>
                <Text style={stylesFilterModal.title}>Filtros</Text>

                {/* Tipo de Registro */}
                {renderPickerForPlatform("tipoRegistro", tipoRegistro, [
                    { label: "Todos os Tipos de Registro", value: null },
                    { label: "Entrada", value: 0 },
                    { label: "Saída", value: 1 },
                ])}

                {/* Tipo de Transação */}
                {renderPickerForPlatform("tipoTransacao", tipoTransacao, [
                    { label: "Todos os Tipos de Transação", value: null },
                    { label: "Pix", value: 0 },
                    { label: "Cartão de Crédito", value: 1 },
                    { label: "Cartão de Débito", value: 2 },
                    { label: "Dinheiro", value: 3 },
                    { label: "Boleto", value: 4 },
                ])}
                {renderPickerForPlatform(
                    "categoria",
                    categoria,
                    [
                        { label: "Todas as Categorias", value: null },
                        ...categories.map<{ label: string; value: number | null }>((cat) => ({
                            label: cat.nome,
                            value: cat.id,
                        })),
                    ]
                )}


                {/* Subcategoria */}
                {subCategories.length > 0 &&
                    renderPickerForPlatform(
                        "subCategoria",
                        subCategoria,
                        [
                            { label: "Todas as Subcategorias", value: null },
                            ...subCategories.map<{ label: string; value: number | null }>((subCat) => ({
                                label: subCat.nome,
                                value: subCat.id,
                            })),
                        ]
                    )}


                {/* Botões */}
                <TouchableOpacity
                    style={stylesFilterModal.applyButton}
                    onPress={() =>
                        onApplyFilters({
                            tipoRegistro,
                            tipoTransacao,
                            categoria,
                            subCategoria,
                        })
                    }
                >
                    <Text style={stylesFilterModal.applyButtonText}>Aplicar Filtros</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesFilterModal.cancelButton}
                    onPress={onClose}
                >
                    <Text style={stylesFilterModal.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
