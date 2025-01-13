import {useState, useEffect, useCallback} from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import {SwipeListView} from "react-native-swipe-list-view";
import {Expense, ExpenseProps} from "./Expense";
import {ExpenseFormModal} from "./ExpenseFormModal";
import {stylesHome} from "./styleHome";
import {RootStackParamList} from "../services/types";
import {api} from "../services/api";
import {CategoryProps} from "./Category";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export function Home() {
    const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState<ExpenseProps | null>(null);
    const navigation = useNavigation<HomeScreenNavigationProp>();

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

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categorias-registro-financeiros");
            setCategories(response.data);
        } catch (error: any) {
            Alert.alert(
                "Erro ao carregar categorias",
                error.response?.data?.message || error.message || "Não foi possível carregar as categorias."
            );
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchCategories();
        }, [])
    );

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

    const confirmRemoveExpense = (id: number) => {
        Alert.alert(
            "Confirmar Remoção",
            "Tem certeza que deseja remover este registro financeiro?",
            [
                {text: "Cancelar", style: "cancel"},
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: () => handleRemoveExpense(id),
                },
            ]
        );
    };

    const openNewExpenseModal = () => {
        setExpenseToEdit(null);
        setIsExpenseModalVisible(true);
    };

    return (
        <View style={stylesHome.container}>
            <View style={stylesHome.buttonContainer}>
                <TouchableOpacity
                    style={stylesHome.addButton}
                    onPress={openNewExpenseModal}
                >
                    <Icon name="add" size={28} color="#FFF"/>
                    <Text style={stylesHome.addButtonText}>Registro Financeiro</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesHome.addButton}
                    onPress={() => {
                        navigation.navigate("CategoryScreen");
                    }}
                >
                    <Icon name="category" size={28} color="#FFF"/>
                    <Text style={stylesHome.addButtonText}>Categorias</Text>
                </TouchableOpacity>
            </View>

            <SwipeListView
                data={expenses.sort(
                    (a, b) =>
                        new Date(b.dataTransacao).getTime() - new Date(a.dataTransacao).getTime()
                )}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
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
                            onEdit={() => {
                            }}
                            onRemove={() => {
                            }}
                        />
                    </View>
                )}
                renderHiddenItem={({item}) => (
                    <View style={stylesHome.hiddenItemContainer}>
                        <TouchableOpacity
                            style={stylesHome.editButton}
                            onPress={() => {
                                setExpenseToEdit(item); // Define o item para edição
                                setIsExpenseModalVisible(true); // Abre o modal de edição
                            }}
                        >
                            <Icon name="edit" size={24} color="#FFF"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={stylesHome.deleteButton}
                            onPress={() => confirmRemoveExpense(item.id)}
                        >
                            <Icon name="delete" size={24} color="#FFF"/>
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-75} // Ajuste conforme necessário
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
