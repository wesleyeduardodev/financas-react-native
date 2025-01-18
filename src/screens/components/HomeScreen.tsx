import React, { useState, useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SwipeListView } from "react-native-swipe-list-view";
import { Expense, ExpenseProps } from "./Expense";
import { ExpenseFormModal } from "./ExpenseFormModal";
import { FilterModal } from "./FilterModal";
import { stylesHome } from "./styleHome";
import { api } from "../services/api";
import { CategoryProps } from "./Category";
import { useFocusEffect } from "@react-navigation/native";

export function HomeScreen() {
    const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [filteredExpenses, setFilteredExpenses] = useState<ExpenseProps[]>([]);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState<ExpenseProps | null>(null);
    const [modalKey, setModalKey] = useState<number>(0);

    // Carregar despesas e categorias ao entrar na tela
    useFocusEffect(
        React.useCallback(() => {
            console.log("Log 10: Fetching expenses and categories on screen focus");
            fetchExpenses();
            fetchCategories();
        }, [])
    );

    const fetchExpenses = async () => {
        try {
            console.log("Log 11: Fetching expenses from API");
            const response = await api.get("/registros-financeiros");
            console.log("Log 12: Expenses loaded successfully", response.data);
            setExpenses(response.data);
            setFilteredExpenses(response.data);
        } catch (error: any) {
            console.error("Log 13: Error loading expenses", error);
            Alert.alert(
                "Erro ao carregar registros financeiros",
                error.response?.data?.message || error.message || "Não foi possível carregar os registros financeiros."
            );
        }
    };

    const fetchCategories = async () => {
        try {
            console.log("Log 14: Fetching categories from API");
            const response = await api.get("/categorias-registro-financeiros");
            console.log("Log 15: Categories loaded successfully", response.data);
            setCategories(response.data);
        } catch (error: any) {
            console.error("Log 16: Error loading categories", error);
            Alert.alert(
                "Erro ao carregar categorias",
                error.response?.data?.message || error.message || "Não foi possível carregar as categorias."
            );
        }
    };

    const handleAddExpense = async (newExpense: Partial<ExpenseProps>) => {
        try {
            console.log("Log 17: Adding a new expense", newExpense);
            const response = await api.post("/registros-financeiros", {
                ...newExpense,
                idCategoria: undefined,
                idSubCategoria: newExpense.idSubCategoria,
            });
            console.log("Log 18: Expense added successfully", response.data);
            setExpenses((prev) => [...prev, response.data]);
            setFilteredExpenses((prev) => [...prev, response.data]);
        } catch (error: any) {
            console.error("Log 19: Error adding expense", error);
            Alert.alert(
                "Erro ao adicionar registro financeiro",
                error.message || "Erro desconhecido."
            );
        }
    };

    const handleEditExpense = async (id: number, updatedExpense: Partial<ExpenseProps>) => {
        try {
            console.log("Log 20: Editing expense with ID", id, updatedExpense);
            const response = await api.put(`/registros-financeiros/${id}`, updatedExpense);
            console.log("Log 21: Expense edited successfully", response.data);
            setExpenses((prev) =>
                prev.map((expense) => (expense.id === id ? response.data : expense))
            );
            setFilteredExpenses((prev) =>
                prev.map((expense) => (expense.id === id ? response.data : expense))
            );
        } catch (error: any) {
            console.error("Log 22: Error editing expense", error);
            Alert.alert("Erro ao editar registro financeiro", error.message || "Erro desconhecido.");
        }
    };

    const confirmRemoveExpense = (id: number) => {
        Alert.alert(
            "Confirmar Remoção",
            "Tem certeza que deseja remover este registro financeiro?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: () => handleRemoveExpense(id),
                },
            ]
        );
    };

    const handleRemoveExpense = async (id: number) => {
        try {
            console.log("Log 23: Removing expense with ID", id);
            await api.delete(`/registros-financeiros/${id}`);
            console.log("Log 24: Expense removed successfully");
            setExpenses((prev) => prev.filter((expense) => expense.id !== id));
            setFilteredExpenses((prev) => prev.filter((expense) => expense.id !== id));
        } catch (error: any) {
            console.error("Log 25: Error removing expense", error);
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
                        setExpenseToEdit(null);
                        setModalKey((prevKey) => prevKey + 1);
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
                            onPress={() => confirmRemoveExpense(item.id)}
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
                key={modalKey}
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
