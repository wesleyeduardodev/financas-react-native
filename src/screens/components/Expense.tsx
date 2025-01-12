import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesExpense } from "./styleExpense";

export type ExpenseProps = {
    id: number;
    valor: number;
    categoriaId: number ;
    dataHora: string;
    onEdit: () => void;
    onRemove: () => void;
};

export function Expense({ id, valor, categoriaId, dataHora, onEdit, onRemove }: ExpenseProps) {
    return (
        <View style={stylesExpense.container}>
            <View style={stylesExpense.info}>
                <Text style={stylesExpense.value}>R$ {valor.toFixed(2)}</Text>
                <Text style={stylesExpense.category}>{categoriaId}</Text>
                <Text style={stylesExpense.dateTime}>{new Date(dataHora).toLocaleString()}</Text>
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
