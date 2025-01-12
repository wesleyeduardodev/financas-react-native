import { useState, useEffect } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Expense, ExpenseProps } from "./Expense";
import { ExpenseFormModal } from "./ExpenseFormModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesHome } from "./styleHome";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../services/types";
import { api } from "../services/api";
import { CategoryProps } from "./Category";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export function Home() {
    const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState<ExpenseProps | null>(null);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await api.get("/expenses");
            setExpenses(response.data);
        } catch (error: any) {
            Alert.alert(
                "Erro ao carregar gastos",
                error.message || "Não foi possível carregar os gastos."
            );
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories");
            setCategories(response.data);
        } catch (error: any) {
            Alert.alert(
                "Erro ao carregar categorias",
                error.message || "Não foi possível carregar as categorias."
            );
        }
    };

    const handleAddExpense = async (newExpense: ExpenseProps) => {
        try {
            const response = await api.post("/expenses", newExpense);
            setExpenses((prev) => [...prev, response.data]);
        } catch (error: any) {
            Alert.alert("Erro ao adicionar gasto", error.message || "Erro desconhecido.");
        }
    };

    const handleEditExpense = async (id: number, updatedExpense: Partial<ExpenseProps>) => {
        try {
            const response = await api.put(`/expenses/${id}`, updatedExpense);
            setExpenses((prev) =>
                prev.map((expense) => (expense.id === id ? response.data : expense))
            );
        } catch (error: any) {
            Alert.alert("Erro ao editar gasto", error.message || "Erro desconhecido.");
        }
    };

    const handleRemoveExpense = async (id: number) => {
        try {
            await api.delete(`/expenses/${id}`);
            setExpenses((prev) => prev.filter((expense) => expense.id !== id));
        } catch (error: any) {
            Alert.alert("Erro ao remover gasto", error.message || "Erro desconhecido.");
        }
    };

    const confirmRemoveExpense = (id: number) => {
        Alert.alert(
            "Confirmar Remoção",
            "Tem certeza que deseja remover este gasto?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: () => handleRemoveExpense(id),
                },
            ]
        );
    };

    return (
        <View style={stylesHome.container}>
            {/* Botões lado a lado */}
            <View style={stylesHome.buttonContainer}>
                <TouchableOpacity
                    style={stylesHome.addButton}
                    onPress={() => setIsExpenseModalVisible(true)}
                >
                    <Icon name="add" size={28} color="#FFF" />
                    <Text style={stylesHome.addButtonText}>Adicionar Gasto</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesHome.addButton}
                    onPress={() => navigation.navigate("CategoryScreen")}
                >
                    <Icon name="category" size={28} color="#FFF" />
                    <Text style={stylesHome.addButtonText}>Categorias</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de despesas */}
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Expense
                        {...item}
                        onEdit={() => {
                            setExpenseToEdit(item);
                            setIsExpenseModalVisible(true);
                        }}
                        onRemove={() => confirmRemoveExpense(item.id)} // Adicionada a confirmação
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={stylesHome.listEmptyText}>Nenhum gasto registrado.</Text>
                )}
            />

            {/* Modal de edição de gasto */}
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
