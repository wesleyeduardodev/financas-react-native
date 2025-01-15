import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { stylesFilterModal } from "./styleFilterModal";
import { api } from "../services/api";

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
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    // Log quando o modal é aberto ou fechado
    useEffect(() => {
        console.log(visible ? "FilterModal opened" : "FilterModal closed");
    }, [visible]);

    // Carregamento de subcategorias baseado na categoria selecionada
    useEffect(() => {
        if (categoria) {
            console.log("Fetching subcategories for category ID:", categoria);
            fetchSubCategories(categoria);
        } else {
            console.log("No category selected. Clearing subcategories.");
            setSubCategories([]);
            setSubCategoria(null);
        }
    }, [categoria]);

    const fetchSubCategories = async (categoryId: number) => {
        try {
            const response = await api.get(`/subcategorias-registro-financeiros/findByIdCategoria/${categoryId}`);
            console.log("Subcategories loaded successfully:", response.data);
            setSubCategories(response.data);
        } catch (error: any) {
            console.error("Error fetching subcategories:", error);
            Alert.alert(
                "Erro ao carregar subcategorias",
                error.response?.data?.message || error.message || "Não foi possível carregar as subcategorias."
            );
        }
    };

    const formatDateToISODateOnly = (date: Date | null): string | null => {
        if (!date) return null;
        const isoDate = date.toISOString().split("T")[0]; // Retorna apenas a parte "YYYY-MM-DD"
        console.log("Formatted date:", isoDate);
        return isoDate;
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={stylesFilterModal.container}>
                <Text style={stylesFilterModal.title}>Filtros</Text>

                {/* Filtro de Tipo de Registro */}
                <View style={stylesFilterModal.pickerContainer}>
                    <Picker
                        selectedValue={tipoRegistro}
                        onValueChange={(itemValue) => {
                            console.log("Tipo de registro updated:", itemValue);
                            setTipoRegistro(itemValue);
                        }}
                        style={stylesFilterModal.picker}
                    >
                        <Picker.Item label="Todos os Tipos de Registro" value={null} />
                        <Picker.Item label="Entrada" value={0} />
                        <Picker.Item label="Saída" value={1} />
                    </Picker>
                </View>

                {/* Filtro de Tipo de Transação */}
                <View style={stylesFilterModal.pickerContainer}>
                    <Picker
                        selectedValue={tipoTransacao}
                        onValueChange={(itemValue) => {
                            console.log("Tipo de transação updated:", itemValue);
                            setTipoTransacao(itemValue);
                        }}
                        style={stylesFilterModal.picker}
                    >
                        <Picker.Item label="Todos os Tipos de Transação" value={null} />
                        <Picker.Item label="Pix" value={0} />
                        <Picker.Item label="Cartão de Crédito" value={1} />
                        <Picker.Item label="Cartão de Débito" value={2} />
                        <Picker.Item label="Dinheiro" value={3} />
                        <Picker.Item label="Boleto" value={4} />
                    </Picker>
                </View>

                {/* Filtro de Categoria */}
                <View style={stylesFilterModal.pickerContainer}>
                    <Picker
                        selectedValue={categoria}
                        onValueChange={(itemValue) => {
                            console.log("Categoria updated:", itemValue);
                            setCategoria(itemValue);
                        }}
                        style={stylesFilterModal.picker}
                    >
                        <Picker.Item label="Todas as Categorias" value={null} />
                        {categories.map((cat) => (
                            <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
                        ))}
                    </Picker>
                </View>

                {/* Filtro de Subcategoria */}
                {subCategories.length > 0 && (
                    <View style={stylesFilterModal.pickerContainer}>
                        <Picker
                            selectedValue={subCategoria}
                            onValueChange={(itemValue) => {
                                console.log("Subcategoria updated:", itemValue);
                                setSubCategoria(itemValue);
                            }}
                            style={stylesFilterModal.picker}
                        >
                            <Picker.Item label="Todas as Subcategorias" value={null} />
                            {subCategories.map((subCat) => (
                                <Picker.Item key={subCat.id} label={subCat.nome} value={subCat.id} />
                            ))}
                        </Picker>
                    </View>
                )}

                {/* DateTimePickers */}
                {showStartDatePicker && (
                    <DateTimePicker
                        value={startDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowStartDatePicker(false);
                            if (selectedDate) {
                                console.log("Start date selected:", selectedDate);
                                setStartDate(selectedDate);
                            }
                        }}
                    />
                )}

                {showEndDatePicker && (
                    <DateTimePicker
                        value={endDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowEndDatePicker(false);
                            if (selectedDate) {
                                console.log("End date selected:", selectedDate);
                                setEndDate(selectedDate);
                            }
                        }}
                    />
                )}

                {/* Botões */}
                <TouchableOpacity
                    style={stylesFilterModal.applyButton}
                    onPress={() => {
                        console.log("Applying filters:", {
                            tipoRegistro,
                            tipoTransacao,
                            categoria,
                            subCategoria,
                        });
                        onApplyFilters({
                            tipoRegistro,
                            tipoTransacao,
                            categoria,
                            subCategoria,
                        });
                    }}
                >
                    <Text style={stylesFilterModal.applyButtonText}>Aplicar Filtros</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesFilterModal.cancelButton}
                    onPress={() => {
                        console.log("Filter modal closed without applying filters");
                        onClose();
                    }}
                >
                    <Text style={stylesFilterModal.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
