import { useState, useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SwipeListView } from "react-native-swipe-list-view";
import { Expense, ExpenseProps } from "./Expense";
import { ExpenseFormModal } from "./ExpenseFormModal";
import { stylesHome } from "./styleHome";
import { api } from "../services/api";
import { CategoryProps } from "./Category";

export function Home() {
    const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState<ExpenseProps | null>(null);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await api.get("/registros-financeiros");
            setExpenses(response.data);
        } catch (error: any) {
            Alert.alert(
                "Erro ao carregar registros financeiros",
                error.response?.data?.message || error.message || "Não foi possível carregar os registros financeiros."
            );
        }
    };

    const handleAddExpense = async (newExpense: ExpenseProps) => {
        try {
            const response = await api.post("/registros-financeiros", newExpense);
            setExpenses((prev) => [...prev, response.data]);
        } catch (error: any) {
            Alert.alert("Erro ao adicionar registro financeiro", error.message || "Erro desconhecido.");
        }
    };

    const handleEditExpense = async (id: number, updatedExpense: Partial<ExpenseProps>) => {
        try {
            const response = await api.put(`/registros-financeiros/${id}`, updatedExpense);
            setExpenses((prev) =>
                prev.map((expense) => (expense.id === id ? response.data : expense))
            );
        } catch (error: any) {
            Alert.alert("Erro ao editar registro financeiro", error.message || "Erro desconhecido.");
        }
    };

    const handleRemoveExpense = async (id: number) => {
        try {
            await api.delete(`/registros-financeiros/${id}`);
            setExpenses((prev) => prev.filter((expense) => expense.id !== id));
        } catch (error: any) {
            Alert.alert("Erro ao remover registro financeiro", error.message || "Erro desconhecido.");
        }
    };

    const openNewExpenseModal = () => {
        setExpenseToEdit(null);
        setIsExpenseModalVisible(true);
    };

    return (
        <View style={stylesHome.container}>
            <TouchableOpacity
                style={stylesHome.addButton}
                onPress={openNewExpenseModal}
            >
                <Icon name="add" size={28} color="#FFF" />
                <Text style={stylesHome.addButtonText}>Registro Financeiro</Text>
            </TouchableOpacity>

            <SwipeListView
                data={expenses.sort(
                    (a, b) =>
                        new Date(b.dataTransacao).getTime() - new Date(a.dataTransacao).getTime()
                )}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View
                        style={[
                            stylesHome.expenseCard,
                            item.tipoRegistro === 0
                                ? stylesHome.expenseCardEntrada
                                : stylesHome.expenseCardSaida,
                        ]}
                    >
                        <Expense
                            id={item.id}
                            titulo={item.titulo}
                            tipoRegistro={item.tipoRegistro}
                            tipoTransacao={item.tipoTransacao}
                            idCategoria={item.idCategoria}
                            nomeCategoria={item.nomeCategoria}
                            valor={item.valor}
                            dataTransacao={item.dataTransacao}
                            onEdit={() => {}}
                            onRemove={() => {}}
                        />
                    </View>
                )}
                renderHiddenItem={({ item }) => (
                    <View style={stylesHome.hiddenItemContainer}>
                        <TouchableOpacity
                            style={stylesHome.editButton}
                            onPress={() => {
                                setExpenseToEdit(item);
                                setIsExpenseModalVisible(true);
                            }}
                        >
                            <Icon name="edit" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={stylesHome.deleteButton}
                            onPress={() => handleRemoveExpense(item.id)}
                        >
                            <Icon name="delete" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-75}
                disableRightSwipe={true}
                stopLeftSwipe={0}
                closeOnRowPress={true}
            />

            {isExpenseModalVisible && (
                <ExpenseFormModal
                    visible={isExpenseModalVisible}
                    expense={expenseToEdit}
                    categories={categories}
                    onSave={(expense: Partial<ExpenseProps>) => {
                        if (expenseToEdit) {
                            handleEditExpense(expenseToEdit.id, expense);
                        } else {
                            handleAddExpense(expense as ExpenseProps);
                        }
                        setIsExpenseModalVisible(false);
                    }}
                    onClose={() => setIsExpenseModalVisible(false)}
                />
            )}
        </View>
    );
}
