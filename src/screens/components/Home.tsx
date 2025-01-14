import { useState, useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SwipeListView } from "react-native-swipe-list-view";
import { Expense, ExpenseProps } from "./Expense";
import { ExpenseFormModal } from "./ExpenseFormModal";
import { FilterModal } from "./FilterModal";
import { stylesHome } from "./styleHome";
import { api } from "../services/api";
import { CategoryProps } from "./Category";

export function Home() {
    const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [filteredExpenses, setFilteredExpenses] = useState<ExpenseProps[]>([]);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState<ExpenseProps | null>(null);
    const [modalKey, setModalKey] = useState<number>(0); // Novo estado para forçar a redefinição do modal

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await api.get("/registros-financeiros");
            setExpenses(response.data);
            setFilteredExpenses(response.data);
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

    const handleAddExpense = async (newExpense: Partial<ExpenseProps>) => {
        try {
            const response = await api.post("/registros-financeiros", {
                ...newExpense,
                idCategoria: undefined,
                idSubCategoria: newExpense.idSubCategoria,
            });
            setExpenses((prev) => [...prev, response.data]);
            setFilteredExpenses((prev) => [...prev, response.data]);
        } catch (error: any) {
            Alert.alert(
                "Erro ao adicionar registro financeiro",
                error.message || "Erro desconhecido."
            );
        }
    };

    const handleEditExpense = async (id: number, updatedExpense: Partial<ExpenseProps>) => {
        try {
            const response = await api.put(`/registros-financeiros/${id}`, updatedExpense);
            setExpenses((prev) =>
                prev.map((expense) => (expense.id === id ? response.data : expense))
            );
            setFilteredExpenses((prev) =>
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
            setFilteredExpenses((prev) => prev.filter((expense) => expense.id !== id));
        } catch (error: any) {
            Alert.alert("Erro ao remover registro financeiro", error.message || "Erro desconhecido.");
        }
    };

    const applyFilters = (filters: {
        tipoRegistro: number | null;
        tipoTransacao: number | null;
        categoria: number | null;
        subCategoria: number | null;
    }) => {
        let filtered = [...expenses];

        if (filters.tipoRegistro !== null) {
            filtered = filtered.filter((expense) => expense.tipoRegistro === filters.tipoRegistro);
        }

        if (filters.tipoTransacao !== null) {
            filtered = filtered.filter((expense) => expense.tipoTransacao === filters.tipoTransacao);
        }

        if (filters.categoria !== null) {
            filtered = filtered.filter((expense) => expense.idCategoria === filters.categoria);
        }

        if (filters.subCategoria !== null) {
            filtered = filtered.filter((expense) => expense.idSubCategoria === filters.subCategoria);
        }

        setFilteredExpenses(filtered);
    };

    return (
        <View style={stylesHome.container}>
            <View style={stylesHome.header}>
                <TouchableOpacity
                    style={stylesHome.addButton}
                    onPress={() => {
                        setExpenseToEdit(null); // Limpa o registro a ser editado
                        setModalKey((prevKey) => prevKey + 1); // Força a recriação do modal
                        setIsExpenseModalVisible(true);
                    }}
                >
                    <Icon name="add" size={28} color="#FFF" />
                    <Text style={stylesHome.addButtonText}>Registro</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesHome.filterButton}
                    onPress={() => setIsFilterModalVisible(true)}
                >
                    <Icon name="filter-list" size={28} color="#FFF" />
                    <Text style={stylesHome.filterButtonText}>Filtros</Text>
                </TouchableOpacity>
            </View>

            <SwipeListView
                data={filteredExpenses.sort(
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
                        <Expense {...item} />
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

            <ExpenseFormModal
                key={modalKey} // Garante que o modal será recriado ao mudar a chave
                visible={isExpenseModalVisible}
                expense={expenseToEdit}
                categories={categories}
                onSave={(expense: Partial<ExpenseProps>) => {
                    setIsExpenseModalVisible(false);
                    if (expenseToEdit) {
                        handleEditExpense(expenseToEdit.id, expense);
                    } else {
                        handleAddExpense(expense as ExpenseProps);
                    }
                }}
                onClose={() => setIsExpenseModalVisible(false)}
            />

            <FilterModal
                visible={isFilterModalVisible}
                categories={categories}
                onClose={() => setIsFilterModalVisible(false)}
                onApplyFilters={(filters) => {
                    applyFilters(filters);
                    setIsFilterModalVisible(false);
                }}
            />
        </View>
    );
}
