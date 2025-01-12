import { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ExpenseProps } from "./Expense";
import { stylesExpenseFormModal } from "./styleExpenseFormModal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
    const [date, setDate] = useState<Date>(expense?.dataTransacao ? new Date(expense.dataTransacao) : new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [idUsuario, setIdUsuario] = useState<number>(expense?.idUsuario || 1);

    useEffect(() => {
        if (expense) {
            setTipoRegistro(expense.tipoRegistro);
            setTipoTransacao(expense.tipoTransacao);
            setValue(expense.valor.toString());
            setCategory(expense.idCategoria);
            setDate(new Date(expense.dataTransacao));
            setIdUsuario(expense.idUsuario);
        }
    }, [expense]);

    const formatDateTimeForAPI = (date: Date) => format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            const currentDate = selectedDate || date;
            setDate((prevDate) => {
                const updatedDate = new Date(prevDate);
                updatedDate.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                return updatedDate;
            });
        }
        setShowDatePicker(false);
    };

    const handleTimeChange = (event: any, selectedTime?: Date) => {
        if (selectedTime) {
            const currentTime = selectedTime || date;
            setDate((prevDate) => {
                const updatedTime = new Date(prevDate);
                updatedTime.setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0);
                return updatedTime;
            });
        }
        setShowTimePicker(false);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={stylesExpenseFormModal.container}>
                <Text style={stylesExpenseFormModal.title}>
                    {expense ? "Editar Registro" : "Novo Registro"}
                </Text>

                {/* Tipo de Registro */}
                <Picker
                    selectedValue={tipoRegistro}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => setTipoRegistro(itemValue)}
                >
                    {tipoRegistroOptions.map((option) => (
                        <Picker.Item
                            key={option.codigo}
                            label={option.descricao}
                            value={option.codigo}
                        />
                    ))}
                </Picker>

                {/* Tipo de Transação */}
                <Picker
                    selectedValue={tipoTransacao}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => setTipoTransacao(itemValue)}
                >
                    {tipoTransacaoOptions.map((option) => (
                        <Picker.Item
                            key={option.codigo}
                            label={option.descricao}
                            value={option.codigo}
                        />
                    ))}
                </Picker>

                {/* Valor */}
                <TextInput
                    style={stylesExpenseFormModal.input}
                    placeholder="Valor"
                    placeholderTextColor="#A9A9A9"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={setValue}
                />

                {/* Categoria */}
                <Picker
                    selectedValue={category}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    {categories.map((cat) => (
                        <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
                    ))}
                </Picker>

                {/* Data e Hora */}
                <TouchableOpacity
                    style={stylesExpenseFormModal.datePickerButton}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={stylesExpenseFormModal.datePickerText}>
                        Selecionar Data: {format(date, "dd/MM/yyyy", { locale: ptBR })}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesExpenseFormModal.datePickerButton}
                    onPress={() => setShowTimePicker(true)}
                >
                    <Text style={stylesExpenseFormModal.datePickerText}>
                        Selecionar Hora: {format(date, "HH:mm", { locale: ptBR })}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                {showTimePicker && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleTimeChange}
                    />
                )}

                {/* Botão de Salvar */}
                <TouchableOpacity
                    style={stylesExpenseFormModal.saveButton}
                    onPress={() =>
                        onSave({
                            tipoRegistro,
                            tipoTransacao,
                            valor: parseFloat(value),
                            idCategoria: category,
                            dataTransacao: formatDateTimeForAPI(date),
                            idUsuario,
                        })
                    }
                >
                    <Text style={stylesExpenseFormModal.buttonText}>Salvar</Text>
                </TouchableOpacity>

                {/* Botão de Cancelar */}
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
