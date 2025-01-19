import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ExpenseProps } from "./Expense";
import { stylesExpenseFormModal } from "./styleExpenseFormModal";
import { api } from "../services/api";
import {Picker} from "@react-native-picker/picker";

type ExpenseFormModalProps = {
    visible: boolean;
    expense: ExpenseProps | null;
    categories: { id: number; nome: string }[];
    onSave: (expense: Partial<ExpenseProps>) => void;
    onClose: () => void;
};

export function ExpenseFormModal({
                                     visible,
                                     expense,
                                     categories,
                                     onSave,
                                     onClose,
                                 }: ExpenseFormModalProps) {
    const [tipoRegistro, setTipoRegistro] = useState<number>(0);
    const [tipoTransacao, setTipoTransacao] = useState<number>(0);
    const [value, setValue] = useState<string>("");
    const [category, setCategory] = useState<number | null>(null);
    const [subCategory, setSubCategory] = useState<number | null>(null);
    const [titulo, setTitulo] = useState<string>("");
    const [dateTimeISO, setDateTimeISO] = useState<string>(new Date().toISOString());
    const [subCategories, setSubCategories] = useState<{ id: number; nome: string }[]>([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [iosPickerVisible, setIosPickerVisible] = useState<{
        type: "tipoRegistro" | "tipoTransacao" | "category" | "subCategory";
        visible: boolean;
    }>({ type: "category", visible: false });

    useEffect(() => {
        if (expense) {
            setTipoRegistro(expense.tipoRegistro || 0);
            setTipoTransacao(expense.tipoTransacao || 0);
            setValue(expense.valor ? expense.valor.toFixed(2).replace(".", ",") : "");
            setCategory(expense.idCategoria || null);
            setSubCategory(expense.idSubCategoria || null);
            setTitulo(expense.titulo || "");
            setDateTimeISO(expense.dataTransacao || new Date().toISOString());
        } else {
            resetForm();
        }
    }, [expense]);

    const resetForm = () => {
        setTipoRegistro(0);
        setTipoTransacao(0);
        setValue("");
        setCategory(null);
        setSubCategory(null);
        setTitulo("");
        setDateTimeISO(new Date().toISOString());
        setSubCategories([]);
    };

    const loadSubCategories = async (categoryId: number) => {
        try {
            const response = await api.get(`/subcategorias-registro-financeiros/findByIdCategoria/${categoryId}`);
            setSubCategories(response.data);
        } catch (error) {
            console.error("Error loading subcategories", error);
        }
    };

    useEffect(() => {
        if (category) {
            loadSubCategories(category);
        } else {
            setSubCategories([]);
        }
    }, [category]);

    const handleOptionSelect = (type: string, value: any) => {
        switch (type) {
            case "tipoRegistro":
                setTipoRegistro(value);
                break;
            case "tipoTransacao":
                setTipoTransacao(value);
                break;
            case "category":
                setCategory(value);
                break;
            case "subCategory":
                setSubCategory(value);
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
            <View style={stylesExpenseFormModal.modalOverlay}>
                <View style={stylesExpenseFormModal.modalContent}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={stylesExpenseFormModal.modalOption}
                                onPress={() => handleOptionSelect(type, item.value)}
                            >
                                <Text style={stylesExpenseFormModal.modalOptionText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={stylesExpenseFormModal.modalCancelButton}
                        onPress={() => setIosPickerVisible({ ...iosPickerVisible, visible: false })}
                    >
                        <Text style={stylesExpenseFormModal.modalCancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const renderPickerForPlatform = (
        type: "tipoRegistro" | "tipoTransacao" | "category" | "subCategory",
        selectedValue: any,
        options: { label: string; value: any }[]
    ) => {
        if (Platform.OS === "ios") {
            const selectedOption = options.find((option) => option.value === selectedValue)?.label || "Selecione";
            return (
                <>
                    <TouchableOpacity
                        style={stylesExpenseFormModal.pickerButton}
                        onPress={() => setIosPickerVisible({ type, visible: true })}
                    >
                        <Text style={stylesExpenseFormModal.pickerButtonText}>{selectedOption}</Text>
                    </TouchableOpacity>
                    {renderIosPicker(type, options)}
                </>
            );
        } else {
            return (
                <Picker
                    selectedValue={selectedValue}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => handleOptionSelect(type, itemValue)}
                >
                    {options.map((option) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>
            );
        }
    };


    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const currentDate = new Date(dateTimeISO);
            currentDate.setFullYear(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate()
            );
            setDateTimeISO(currentDate.toISOString());
        }
    };

    const handleTimeChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) {
            const currentDate = new Date(dateTimeISO);
            currentDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
            setDateTimeISO(currentDate.toISOString());
        }
    };


    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={stylesExpenseFormModal.scrollView}>
                    <View style={stylesExpenseFormModal.container}>
                        <View style={stylesExpenseFormModal.fieldContainer}>
                            <Text style={stylesExpenseFormModal.label}>Título</Text>
                            <TextInput
                                style={stylesExpenseFormModal.input}
                                value={titulo}
                                onChangeText={setTitulo}
                            />
                        </View>

                        <View style={stylesExpenseFormModal.fieldContainer}>
                            <Text style={stylesExpenseFormModal.label}>Valor</Text>
                            <TextInput
                                style={stylesExpenseFormModal.input}
                                keyboardType="numeric"
                                value={value}
                                onChangeText={(text) => {
                                    const formattedText = text
                                        .replace(/[^0-9.,]/g, "")
                                        .replace(".", ",");
                                    if (/^(\d{1,15})(,\d{0,2})?$/.test(formattedText) || formattedText === "") {
                                        setValue(formattedText);
                                    }
                                }}
                            />
                        </View>

                        {/* Tipo de Registro */}
                        {renderPickerForPlatform("tipoRegistro", tipoRegistro, [
                            { label: "Entrada", value: 0 },
                            { label: "Saída", value: 1 },
                        ])}

                        {/* Tipo de Transação */}
                        {renderPickerForPlatform("tipoTransacao", tipoTransacao, [
                            { label: "Pix", value: 0 },
                            { label: "Cartão de Crédito", value: 1 },
                            { label: "Cartão de Débito", value: 2 },
                            { label: "Dinheiro", value: 3 },
                            { label: "Boleto", value: 4 },
                        ])}

                        {/* Categoria */}
                        {renderPickerForPlatform(
                            "category",
                            category,
                            categories.map((cat) => ({ label: cat.nome, value: cat.id }))
                        )}

                        {/* Subcategoria */}
                        {subCategories.length > 0 &&
                            renderPickerForPlatform(
                                "subCategory",
                                subCategory,
                                subCategories.map((subCat) => ({ label: subCat.nome, value: subCat.id }))
                            )}

                        {/* Data e Hora */}
                        <View style={stylesExpenseFormModal.dateTimeContainer}>
                            <TouchableOpacity
                                style={stylesExpenseFormModal.datePickerButton}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={stylesExpenseFormModal.datePickerText}>
                                    Data: {new Date(dateTimeISO).toLocaleDateString()}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={stylesExpenseFormModal.datePickerButton}
                                onPress={() => setShowTimePicker(true)}
                            >
                                <Text style={stylesExpenseFormModal.datePickerText}>
                                    Hora: {new Date(dateTimeISO).toLocaleTimeString()}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {showDatePicker && (
                            <DateTimePicker
                                value={new Date(dateTimeISO)}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                        {showTimePicker && (
                            <DateTimePicker
                                value={new Date(dateTimeISO)}
                                mode="time"
                                display="default"
                                onChange={handleTimeChange}
                            />
                        )}

                        {/* Botões */}
                        <TouchableOpacity
                            style={stylesExpenseFormModal.saveButton}
                            onPress={() => {
                                if (!category) {
                                    alert("Selecione uma categoria antes de salvar.");
                                    return;
                                }
                                onSave({
                                    titulo,
                                    tipoRegistro,
                                    tipoTransacao,
                                    valor: parseFloat(value.replace(",", ".")),
                                    idCategoria: category,
                                    idSubCategoria: subCategory || null,
                                    dataTransacao: dateTimeISO,
                                });
                            }}
                        >
                            <Text style={stylesExpenseFormModal.buttonText}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={stylesExpenseFormModal.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={stylesExpenseFormModal.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
}
