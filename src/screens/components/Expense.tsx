import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesExpense } from "./styleExpense";

export type ExpenseProps = {
    id: number;
    titulo: string; // Novo campo
    tipoRegistro: number; // Tipo de Registro (0 = Entrada, 1 = Saída)
    tipoTransacao: number; // Tipo de Transação (0 = Pix, 1 = Crédito, etc.)
    idCategoria: number;
    nomeCategoria: string;
    valor: number;
    dataTransacao: string; // Formato: dd/MM/yyyy HH:mm:ss
    onEdit: () => void;
    onRemove: () => void;
};

const tipoRegistroOptions: Record<number, string> = {
    0: "Entrada",
    1: "Saída",
};

const tipoTransacaoOptions: Record<number, string> = {
    0: "Pix",
    1: "Cartão de Crédito",
    2: "Cartão de Débito",
    3: "Dinheiro",
    4: "Boleto",
};

export function Expense({
                            titulo,
                            tipoRegistro,
                            tipoTransacao,
                            nomeCategoria,
                            valor,
                            dataTransacao,
                            onEdit,
                            onRemove,
                        }: ExpenseProps) {
    return (
        <View style={stylesExpense.container}>
            <View style={stylesExpense.info}>
                <Text style={stylesExpense.value}>R$ {valor.toFixed(2)}</Text>
                <Text style={stylesExpense.title}>{titulo}</Text>
                <Text style={stylesExpense.detail}>Registro: {tipoRegistroOptions[tipoRegistro]}</Text>
                <Text style={stylesExpense.detail}>Transação: {tipoTransacaoOptions[tipoTransacao]}</Text>
                <Text style={stylesExpense.detail}>Categoria: {nomeCategoria}</Text>
                <Text style={stylesExpense.dateTime}>{dataTransacao}</Text>
            </View>
            <View style={stylesExpense.actions}>
                <TouchableOpacity style={stylesExpense.editButton} onPress={onEdit}>
                    <Icon name="edit" size={20} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={stylesExpense.deleteButton} onPress={onRemove}>
                    <Icon name="delete" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
