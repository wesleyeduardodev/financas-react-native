import { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ExpenseProps } from "./Expense";
import { stylesExpenseFormModal } from "./styleExpenseFormModal";

type ExpenseFormModalProps = {
    visible: boolean;
    expense: ExpenseProps | null;
    categories: { id: number; nome: string }[];
    onSave: (expense: Partial<ExpenseProps>) => void;
    onClose: () => void;
};

const tipoRegistroOptions = [
    { codigo: 0, descricao: "Entrada" },
    { codigo: 1, descricao: "Saída" },
];

const tipoTransacaoOptions = [
    { codigo: 0, descricao: "Pix" },
    { codigo: 1, descricao: "Cartão de Crédito" },
    { codigo: 2, descricao: "Cartão de Débito" },
    { codigo: 3, descricao: "Dinheiro" },
    { codigo: 4, descricao: "Boleto" },
];

export function ExpenseFormModal({
                                     visible,
                                     expense,
                                     categories,
                                     onSave,
                                     onClose,
                                 }: ExpenseFormModalProps) {
    const [tipoRegistro, setTipoRegistro] = useState(expense?.tipoRegistro || 0);
    const [tipoTransacao, setTipoTransacao] = useState(expense?.tipoTransacao || 0);
    const [value, setValue] = useState<string>(expense?.valor.toString() || "");
    const [category, setCategory] = useState<number>(expense?.idCategoria || categories[0]?.id || 0);
    const [titulo, setTitulo] = useState<string>(expense?.titulo || "");
    const [dateTimeISO, setDateTimeISO] = useState<string>(
        expense?.dataTransacao || new Date().toISOString()
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        setDateTimeISO(expense?.dataTransacao || new Date().toISOString());
    }, [expense]);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const currentDate = new Date(dateTimeISO);
            currentDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
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
            <View style={stylesExpenseFormModal.container}>
                <Text style={stylesExpenseFormModal.title}>
                    {expense ? "Editar Registro" : "Novo Registro"}
                </Text>

                <TextInput
                    style={stylesExpenseFormModal.input}
                    placeholder="Título"
                    value={titulo}
                    onChangeText={setTitulo}
                />

                <TextInput
                    style={stylesExpenseFormModal.input}
                    placeholder="Valor"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={setValue}
                />

                <Picker
                    selectedValue={tipoRegistro}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => setTipoRegistro(itemValue)}
                >
                    {tipoRegistroOptions.map((option) => (
                        <Picker.Item key={option.codigo} label={option.descricao} value={option.codigo} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={tipoTransacao}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => setTipoTransacao(itemValue)}
                >
                    {tipoTransacaoOptions.map((option) => (
                        <Picker.Item key={option.codigo} label={option.descricao} value={option.codigo} />
                    ))}
                </Picker>



                <Picker
                    selectedValue={category}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    {categories.map((cat) => (
                        <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
                    ))}
                </Picker>

                {/* Seleção de Data e Hora Lado a Lado */}
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

                <TouchableOpacity
                    style={stylesExpenseFormModal.saveButton}
                    onPress={() =>
                        onSave({
                            titulo,
                            tipoRegistro,
                            tipoTransacao,
                            valor: parseFloat(value),
                            idCategoria: category,
                            dataTransacao: dateTimeISO, // Enviado no formato ISO 8601
                        })
                    }
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
