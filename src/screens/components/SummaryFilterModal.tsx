import { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { stylesFilterModal } from "./styleFilterModal";
import { api } from "../services/api";

type SummaryFilterModalProps = {
    visible: boolean;
    onClose: () => void;
    onApplyFilters: (filters: {
        tipoRegistro: number | null;
        tipoTransacao: number | null;
        categoria: number | null;
        subCategoria: number | null;
    }) => void;
};

export function SummaryFilterModal({
                                       visible,
                                       onClose,
                                       onApplyFilters,
                                   }: SummaryFilterModalProps) {
    const [tipoRegistro, setTipoRegistro] = useState<number | null>(null);
    const [tipoTransacao, setTipoTransacao] = useState<number | null>(null);
    const [categoria, setCategoria] = useState<number | null>(null);
    const [subCategoria, setSubCategoria] = useState<number | null>(null);
    const [categories, setCategories] = useState<{ id: number; nome: string }[]>([]);
    const [subCategories, setSubCategories] = useState<{ id: number; nome: string }[]>([]);

    useEffect(() => {
        // Log 88: Fetching categories when the component mounts
        console.log("Log 88: Fetching categories");
        fetchCategories();
    }, []);

    useEffect(() => {
        // Log 89: Fetching subcategories based on the selected category
        console.log("Log 89: Fetching subcategories for category", categoria);
        if (categoria) {
            fetchSubCategories(categoria);
        } else {
            setSubCategories([]);
            setSubCategoria(null);
        }
    }, [categoria]);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categorias-registro-financeiros");
            setCategories(response.data);
        } catch (error: any) {
            Alert.alert(
                "Erro ao carregar categorias",
                error.response?.data?.message || error.message || "Não foi possível carregar as categorias."
            );
        }
    };

    const fetchSubCategories = async (categoryId: number) => {
        try {
            const response = await api.get(`/subcategorias-registro-financeiros/findByIdCategoria/${categoryId}`);
            // Log 90: Successfully fetched subcategories
            console.log("Log 90: Successfully fetched subcategories", response.data);
            setSubCategories(response.data);
        } catch (error: any) {
            Alert.alert(
                "Erro ao carregar subcategorias",
                error.response?.data?.message || error.message || "Não foi possível carregar as subcategorias."
            );
        }
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
                            // Log 91: Selected Tipo Registro
                            console.log("Log 91: Selected Tipo Registro", itemValue);
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
                            // Log 92: Selected Tipo Transacao
                            console.log("Log 92: Selected Tipo Transacao", itemValue);
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
                            // Log 93: Selected Categoria
                            console.log("Log 93: Selected Categoria", itemValue);
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
                                // Log 94: Selected Subcategoria
                                console.log("Log 94: Selected Subcategoria", itemValue);
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

                <TouchableOpacity
                    style={stylesFilterModal.applyButton}
                    onPress={() => {
                        // Log 95: Applying Filters
                        console.log("Log 95: Applying filters", {
                            tipoRegistro,
                            tipoTransacao,
                            categoria,
                            subCategoria
                        });
                        onApplyFilters({ tipoRegistro, tipoTransacao, categoria, subCategoria });
                    }}
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
