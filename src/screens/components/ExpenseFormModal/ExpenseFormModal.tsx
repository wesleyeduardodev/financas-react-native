import { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import { ExpenseProps } from "../Expense/Expense";
import { Picker } from "@react-native-picker/picker";
import { stylesExpenseFormModal } from "./styleExpenseFormModal";

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
    const [value, setValue] = useState<string>(expense?.valor.toString() || "");
    const [category, setCategory] = useState<number>(categories[0]?.id || 0); // Inicializa com o ID da primeira categoria
    const [dateTime, setDateTime] = useState<string>(expense?.dataHora || new Date().toISOString());

    useEffect(() => {
        if (expense) {
            setValue(expense.valor.toString());
            setCategory(expense.categoriaId ?? (categories[0]?.id || 0)); // Envolve o || em parênteses
            setDateTime(expense.dataHora);
        }
    }, [expense, categories]);


    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={stylesExpenseFormModal.container}>
                <Text style={stylesExpenseFormModal.title}>
                    {expense ? "Editar Gasto" : "Novo Gasto"}
                </Text>

                {/* Campo para Valor */}
                <TextInput
                    style={stylesExpenseFormModal.input}
                    placeholder="Valor"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={setValue}
                />

                {/* Campo para Categoria */}
                <Picker
                    selectedValue={category}
                    style={stylesExpenseFormModal.input}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    {categories.map((cat) => (
                        <Picker.Item key={cat.id} label={cat.nome} value={cat.id} />
                    ))}
                </Picker>

                {/* Botão para Salvar */}
                <TouchableOpacity
                    style={stylesExpenseFormModal.saveButton}
                    onPress={() =>
                        onSave({
                            valor: parseFloat(value),
                            categoriaId: category, // Garante que category é um número válido
                            dataHora: dateTime,
                        })
                    }
                >
                    <Text style={stylesExpenseFormModal.buttonText}>Salvar</Text>
                </TouchableOpacity>

                {/* Botão para Cancelar */}
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
