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
    const [titulo, setTitulo] = useState<string>(expense?.titulo || "");
    const [descricao, setDescricao] = useState<string>(expense?.descricao || "");
    const [date, setDate] = useState<Date>(expense?.dataTransacao ? new Date(expense.dataTransacao) : new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const formatDateTimeForAPI = (date: Date) => format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
        setShowDatePicker(false);
    };

    const handleTimeChange = (event: any, selectedTime?: Date) => {
        if (selectedTime) {
            const updatedTime = new Date(date);
            updatedTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
            setDate(updatedTime);
        }
        setShowTimePicker(false);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={stylesExpenseFormModal.container}>
                <Text style={stylesExpenseFormModal.title}>
                    {expense ? "Editar Registro" : "Novo Registro"}
                </Text>

                {/* Título */}
                <TextInput
                    style={stylesExpenseFormModal.input}
                    placeholder="Título"
                    value={titulo}
                    onChangeText={setTitulo}
                />

                {/* Descrição */}
                <TextInput
                    style={stylesExpenseFormModal.input}
                    placeholder="Descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                />

                {/* Tipo de Registro */}
                <Picker
                    selectedValue={tipoRegistro}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => setTipoRegistro(itemValue)}
                >
                    {tipoRegistroOptions.map((option) => (
                        <Picker.Item key={option.codigo} label={option.descricao} value={option.codigo} />
                    ))}
                </Picker>

                {/* Tipo de Transação */}
                <Picker
                    selectedValue={tipoTransacao}
                    style={stylesExpenseFormModal.picker}
                    onValueChange={(itemValue) => setTipoTransacao(itemValue)}
                >
                    {tipoTransacaoOptions.map((option) => (
                        <Picker.Item key={option.codigo} label={option.descricao} value={option.codigo} />
                    ))}
                </Picker>

                {/* Valor */}
                <TextInput
                    style={stylesExpenseFormModal.input}
                    placeholder="Valor"
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

                {/* Data da Transação */}
                <TouchableOpacity
                    style={stylesExpenseFormModal.datePickerButton}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={stylesExpenseFormModal.datePickerText}>
                        Selecionar Data: {format(date, "dd/MM/yyyy", { locale: ptBR })}
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

                <TouchableOpacity
                    style={stylesExpenseFormModal.datePickerButton}
                    onPress={() => setShowTimePicker(true)}
                >
                    <Text style={stylesExpenseFormModal.datePickerText}>
                        Selecionar Hora: {format(date, "HH:mm", { locale: ptBR })}
                    </Text>
                </TouchableOpacity>

                {showTimePicker && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        display="default"
                        onChange={handleTimeChange}
                    />
                )}

                {/* Botão Salvar */}
                <TouchableOpacity
                    style={stylesExpenseFormModal.saveButton}
                    onPress={() =>
                        onSave({
                            titulo,
                            descricao,
                            tipoRegistro,
                            tipoTransacao,
                            valor: parseFloat(value),
                            idCategoria: category,
                            dataTransacao: formatDateTimeForAPI(date),
                        })
                    }
                >
                    <Text style={stylesExpenseFormModal.buttonText}>Salvar</Text>
                </TouchableOpacity>

                {/* Botão Cancelar */}
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
