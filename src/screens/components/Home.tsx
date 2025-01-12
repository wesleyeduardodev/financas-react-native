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
        console.log("Iniciando a requisição para buscar registros financeiros...");
        try {
            const response = await api.get("/registros-financeiros");
            console.log("Resposta recebida com sucesso. Dados retornados:");
            console.table(response.data);
            setExpenses(response.data);
        } catch (error: any) {
            console.error("Erro ao carregar registros financeiros:", error.response?.data || error);
            Alert.alert(
                "Erro ao carregar registros financeiros",
                error.response?.data?.message || error.message || "Não foi possível carregar os registros financeiros."
            );
        }
    };

    const fetchCategories = async () => {
        console.log("Iniciando a requisição para buscar categorias...");
        try {
            const response = await api.get("/categorias-registro-financeiros");
            console.log("Resposta recebida com sucesso. Categorias retornadas:");
            console.table(response.data);
            setCategories(response.data);
        } catch (error: any) {
            console.error("Erro ao carregar categorias:", error.response?.data || error);
            Alert.alert(
                "Erro ao carregar categorias",
                error.response?.data?.message || error.message || "Não foi possível carregar as categorias."
            );
        }
    };

    const handleAddExpense = async (newExpense: ExpenseProps) => {
        console.log("Iniciando a adição de um novo registro financeiro:", newExpense);
        try {
            const response = await api.post("/registros-financeiros", newExpense);
            console.log("Registro financeiro adicionado com sucesso. Resposta:", response.data);
            setExpenses((prev) => [...prev, response.data]);
        } catch (error: any) {
            console.error("Erro ao adicionar registro financeiro:", error.response?.data || error);
            Alert.alert("Erro ao adicionar registro financeiro", error.message || "Erro desconhecido.");
        }
    };

    const handleEditExpense = async (id: number, updatedExpense: Partial<ExpenseProps>) => {
        console.log(`Iniciando a edição do registro financeiro com ID ${id}. Dados atualizados:`, updatedExpense);
        try {
            const response = await api.put(`/registros-financeiros/${id}`, updatedExpense);
            console.log("Registro financeiro atualizado com sucesso. Resposta:", response.data);
            setExpenses((prev) =>
                prev.map((expense) => (expense.id === id ? response.data : expense))
            );
        } catch (error: any) {
            console.error("Erro ao editar registro financeiro:", error.response?.data || error);
            Alert.alert("Erro ao editar registro financeiro", error.message || "Erro desconhecido.");
        }
    };

    const handleRemoveExpense = async (id: number) => {
        console.log(`Iniciando a remoção do registro financeiro com ID ${id}...`);
        try {
            await api.delete(`/registros-financeiros/${id}`);
            console.log(`Registro financeiro com ID ${id} removido com sucesso.`);
            setExpenses((prev) => prev.filter((expense) => expense.id !== id));
        } catch (error: any) {
            console.error("Erro ao remover registro financeiro:", error.response?.data || error);
            Alert.alert("Erro ao remover registro financeiro", error.message || "Erro desconhecido.");
        }
    };

    const confirmRemoveExpense = (id: number) => {
        console.log(`Confirmação de remoção solicitada para o registro financeiro com ID ${id}.`);
        Alert.alert(
            "Confirmar Remoção",
            "Tem certeza que deseja remover este registro financeiro?",
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

    const openNewExpenseModal = () => {
        console.log("Abrindo modal para criação de um novo registro financeiro.");
        setExpenseToEdit(null); // Limpa o estado para garantir que será um novo registro
        setIsExpenseModalVisible(true);
    };

    return (
        <View style={stylesHome.container}>
            <View style={stylesHome.buttonContainer}>
                <TouchableOpacity
                    style={stylesHome.addButton}
                    onPress={openNewExpenseModal}
                >
                    <Icon name="add" size={28} color="#FFF" />
                    <Text style={stylesHome.addButtonText}>Registro Financeiro</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesHome.addButton}
                    onPress={() => {
                        console.log("Navegando para a tela de categorias.");
                        navigation.navigate("CategoryScreen");
                    }}
                >
                    <Icon name="category" size={28} color="#FFF" />
                    <Text style={stylesHome.addButtonText}>Categorias</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Expense
                        id={item.id}
                        titulo={item.titulo}
                        tipoRegistro={item.tipoRegistro}
                        tipoTransacao={item.tipoTransacao}
                        idCategoria={item.idCategoria}
                        nomeCategoria={item.nomeCategoria}
                        valor={item.valor}
                        dataTransacao={item.dataTransacao}
                        onEdit={() => {
                            console.log("Abrindo modal para edição do registro financeiro:", item);
                            setExpenseToEdit(item);
                            setIsExpenseModalVisible(true);
                        }}
                        onRemove={() => confirmRemoveExpense(item.id)}
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={stylesHome.listEmptyText}>Nenhum registro financeiro encontrado.</Text>
                )}
            />

            {isExpenseModalVisible && (
                <ExpenseFormModal
                    visible={isExpenseModalVisible}
                    expense={expenseToEdit}
                    categories={categories}
                    onSave={(expense: Partial<ExpenseProps>) => {
                        if (expenseToEdit) {
                            console.log("Salvando edição do registro financeiro:", expense);
                            handleEditExpense(expenseToEdit.id, expense);
                        } else {
                            console.log("Criando novo registro financeiro:", expense);
                            handleAddExpense(expense as ExpenseProps);
                        }
                        setIsExpenseModalVisible(false);
                    }}
                    onClose={() => {
                        console.log("Fechando modal de registro financeiro.");
                        setIsExpenseModalVisible(false);
                    }}
                />
            )}
        </View>
    );
}
