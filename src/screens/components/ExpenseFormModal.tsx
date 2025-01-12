import { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
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
    const [dateTime, setDateTime] = useState<string>(
        expense?.dataTransacao || format(new Date(), "dd/MM/yyyy HH:mm:ss", { locale: ptBR })
    );
    const [idUsuario, setIdUsuario] = useState<number>(expense?.idUsuario || 1); // ID fictício para simulação

    useEffect(() => {
        if (expense) {
            setTipoRegistro(expense.tipoRegistro);
            setTipoTransacao(expense.tipoTransacao);
            setValue(expense.valor.toString());
            setCategory(expense.idCategoria);
            setDateTime(expense.dataTransacao);
            setIdUsuario(expense.idUsuario);
        }
    }, [expense]);

    const formatDateTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return format(date, "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
        } catch (error) {
            console.error("Erro ao formatar data:", error);
            return dateString;
        }
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
                    style={stylesExpenseFormModal.input}
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
                    style={stylesExpenseFormModal.input}
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
                    keyboardType="numeric"
                    value={value}
                    onChangeText={setValue}
                />

                {/* Categoria */}
                <Picker
                    selectedValue={category}
                    style={stylesExpenseFormModal.input}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    {categories.map((cat) => (
                        <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
                    ))}
                </Picker>

                {/* Data da Transação */}
                <TextInput
                    style={stylesExpenseFormModal.input}
                    placeholder="Data da Transação (dd/MM/yyyy HH:mm:ss)"
                    value={dateTime}
                    onChangeText={(text) => setDateTime(formatDateTime(text))}
                />

                {/* Botão de Salvar */}
                <TouchableOpacity
                    style={stylesExpenseFormModal.saveButton}
                    onPress={() =>
                        onSave({
                            tipoRegistro,
                            tipoTransacao,
                            valor: parseFloat(value),
                            idCategoria: category,
                            dataTransacao: formatDateTime(dateTime),
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
