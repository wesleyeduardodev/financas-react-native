import { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ExpenseProps } from "./Expense";
import { stylesExpenseFormModal } from "./styleExpenseFormModal";
import { api } from "../services/api";

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

    useEffect(() => {
        if (expense) {
            console.log("Log 26: Populating form with expense data", expense); // Log 26
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
        console.log("Log 27: Resetting form fields to default values"); // Log 27
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
        console.log("Log 28: Loading subcategories for category ID", categoryId); // Log 28
        try {
            const response = await api.get(`/subcategorias-registro-financeiros/findByIdCategoria/${categoryId}`);
            console.log("Log 29: Subcategories loaded successfully", response.data); // Log 29
            setSubCategories(response.data);
        } catch (error) {
            console.error("Log 30: Error loading subcategories", error); // Log 30
        }
    };

    useEffect(() => {
        if (category) {
            loadSubCategories(category);
        } else {
            setSubCategories([]);
        }
    }, [category]);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        console.log("Log 31: Date picker changed", selectedDate); // Log 31
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
        console.log("Log 32: Time picker changed", selectedTime); // Log 32
        setShowTimePicker(false);
        if (selectedTime) {
            const currentDate = new Date(dateTimeISO);
            currentDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
            setDateTimeISO(currentDate.toISOString());
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={stylesExpenseFormModal.container}>
                <Text style={stylesExpenseFormModal.title}>
                    {expense ? "Editar Registro" : "Novo Registro"}
                </Text>

                <Text style={stylesExpenseFormModal.label}>Título</Text>
                <TextInput
                    style={stylesExpenseFormModal.input}
                    value={titulo}
                    onChangeText={setTitulo}
                />

                <Text style={stylesExpenseFormModal.label}>Valor</Text>
                <TextInput
                    style={stylesExpenseFormModal.input}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={(text) => {
                        const formattedText = text
                            .replace(/[^0-9.,]/g, "")
                            .replace(".", ",");
                        const regex = /^(\d{1,15})(,\d{0,2})?$/;
                        if (regex.test(formattedText) || formattedText === "") {
                            setValue(formattedText);
                        }
                    }}
                />

                <Picker
                    selectedValue={tipoRegistro}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => setTipoRegistro(itemValue)}
                >
                    <Picker.Item label="Entrada" value={0} />
                    <Picker.Item label="Saída" value={1} />
                </Picker>

                <Picker
                    selectedValue={tipoTransacao}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => setTipoTransacao(itemValue)}
                >
                    <Picker.Item label="Pix" value={0} />
                    <Picker.Item label="Cartão de Crédito" value={1} />
                    <Picker.Item label="Cartão de Débito" value={2} />
                    <Picker.Item label="Dinheiro" value={3} />
                    <Picker.Item label="Boleto" value={4} />
                </Picker>

                <Picker
                    selectedValue={category}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    <Picker.Item label="Selecione uma categoria" value={null} />
                    {categories.map((cat) => (
                        <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
                    ))}
                </Picker>

                {subCategories.length > 0 && (
                    <Picker
                        selectedValue={subCategory}
                        style={stylesExpenseFormModal.picker}
                        onValueChange={(itemValue) => setSubCategory(itemValue)}
                    >
                        <Picker.Item label="Selecione uma subcategoria" value={null} />
                        {subCategories.map((subCat) => (
                            <Picker.Item key={subCat.id} label={subCat.nome} value={subCat.id} />
                        ))}
                    </Picker>
                )}

                <TouchableOpacity
                    style={stylesExpenseFormModal.saveButton}
                    onPress={() => {
                        console.log("Log 33: Saving expense", {
                            titulo,
                            tipoRegistro,
                            tipoTransacao,
                            valor: parseFloat(value.replace(",", ".")),
                            idCategoria: category,
                            idSubCategoria: subCategory,
                            dataTransacao: dateTimeISO,
                        }); // Log 33
                        if (!subCategory) {
                            alert("Selecione uma subcategoria antes de salvar.");
                            return;
                        }
                        onSave({
                            titulo,
                            tipoRegistro,
                            tipoTransacao,
                            valor: parseFloat(value.replace(",", ".")),
                            idSubCategoria: subCategory,
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
        </Modal>
    );
}
