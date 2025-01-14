import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesExpense } from "./styleExpense";

export type ExpenseProps = {
    id: number;
    titulo: string;
    tipoRegistro: number;
    tipoTransacao: number;
    idSubCategoria: number; // Novo campo
    nomeCategoria: string;
    valor: number;
    dataTransacao: string;
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
                <Text style={stylesExpense.value}>
                    R$ {valor
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
                <Text style={stylesExpense.title}>{titulo}</Text>
                <Text style={stylesExpense.detail}>Registro: {tipoRegistroOptions[tipoRegistro]}</Text>
                <Text style={stylesExpense.detail}>Transação: {tipoTransacaoOptions[tipoTransacao]}</Text>
                <Text style={stylesExpense.detail}>Categoria: {nomeCategoria}</Text>
                <Text style={stylesExpense.dateTime}>{new Date(dataTransacao).toLocaleString()}</Text>
            </View>
        </View>
    );
}
