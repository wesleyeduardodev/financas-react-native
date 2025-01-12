import { useState, useEffect } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Expense, ExpenseProps } from "../components/Expense/Expense";
import { Category, CategoryProps } from "../components/Category/Category";
import { ExpenseFormModal } from "../components/ExpenseFormModal/ExpenseFormModal";
import { CategoryFormModal } from "../components/CategoryFormModal/CategoryFormModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesHome } from "./styleHome";
import { api } from "../services/api";

export function Home() {
    const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState<ExpenseProps | null>(null);
    const [categoryToEdit, setCategoryToEdit] = useState<CategoryProps | null>(null);

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    const fetchExpenses = async () => {
        try {
            console.log("Carregando gastos...");
            const response = await api.get("/expenses");
            setExpenses(response.data);
            console.log("Gastos carregados com sucesso:", response.data);
        } catch (error: any) {
            console.error("Erro ao carregar gastos:", error.message);
            console.error("Detalhes do erro:", error);
            Alert.alert(
                "Erro ao carregar gastos",
                `Detalhes: ${error.message}\n${error.response?.data?.message || "Sem detalhes adicionais"}`
            );
        }
    };

    const fetchCategories = async () => {
        try {
            console.log("Carregando categorias...");
            const response = await api.get("/categories");
            setCategories(response.data);
            console.log("Categorias carregadas com sucesso:", response.data);
        } catch (error: any) {
            console.error("Erro ao carregar categorias:", error.message);
            console.error("Detalhes do erro:", error);
            Alert.alert(
                "Erro ao carregar categorias",
                `Detalhes: ${error.message}\n${error.response?.data?.message || "Sem detalhes adicionais"}`
            );
        }
    };

    const handleAddExpense = async (newExpense: ExpenseProps) => {
        try {
            console.log("Adicionando gasto:", newExpense);
            const response = await api.post("/expenses", {
                valor: newExpense.valor,
                categoriaId: newExpense.categoriaId,
                dataHora: newExpense.dataHora,
            });
            setExpenses((prev) => [...prev, response.data]);
            console.log("Gasto adicionado com sucesso:", response.data);
        } catch (error: any) {
            console.error("Erro ao adicionar gasto:", error.message);
            console.error("Detalhes do erro:", error);
            Alert.alert(
                "Erro ao adicionar gasto",
                `Detalhes: ${error.message}\n${error.response?.data?.message || "Sem detalhes adicionais"}`
            );
        }
    };

    const handleEditExpense = async (id: number, updatedExpense: Partial<ExpenseProps>) => {
        try {
            console.log("Editando gasto:", id, updatedExpense);
            const response = await api.put(`/expenses/${id}`, {
                valor: updatedExpense.valor,
                categoriaId: updatedExpense.categoriaId,
                dataHora: updatedExpense.dataHora,
            });
            setExpenses((prev) =>
                prev.map((expense) =>
                    expense.id === id ? response.data : expense
                )
            );
            console.log("Gasto editado com sucesso:", response.data);
        } catch (error: any) {
            console.error("Erro ao editar gasto:", error.message);
            console.error("Detalhes do erro:", error);
            Alert.alert(
                "Erro ao editar gasto",
                `Detalhes: ${error.message}\n${error.response?.data?.message || "Sem detalhes adicionais"}`
            );
        }
    };

    const handleRemoveExpense = async (id: number) => {
        try {
            console.log("Removendo gasto:", id);
            await api.delete(`/expenses/${id}`);
            setExpenses((prev) => prev.filter((expense) => expense.id !== id));
            console.log("Gasto removido com sucesso.");
        } catch (error: any) {
            console.error("Erro ao remover gasto:", error.message);
            console.error("Detalhes do erro:", error);
            Alert.alert(
                "Erro ao remover gasto",
                `Detalhes: ${error.message}\n${error.response?.data?.message || "Sem detalhes adicionais"}`
            );
        }
    };

    const handleAddCategory = async (newCategory: CategoryProps) => {
        try {
            console.log("Adicionando categoria:", newCategory);
            const response = await api.post("/categories", newCategory);
            setCategories((prev) => [...prev, response.data]);
            console.log("Categoria adicionada com sucesso:", response.data);
        } catch (error: any) {
            console.error("Erro ao adicionar categoria:", error.message);
            console.error("Detalhes do erro:", error);
            Alert.alert(
                "Erro ao adicionar categoria",
                `Detalhes: ${error.message}\n${error.response?.data?.message || "Sem detalhes adicionais"}`
            );
        }
    };

    const handleEditCategory = async (id: number, updatedCategory: Partial<CategoryProps>) => {
        try {
            console.log("Editando categoria:", id, updatedCategory);
            const existingCategory = categories.find((category) => category.id === id);
            if (!existingCategory) {
                console.warn("Categoria não encontrada:", id);
                return;
            }
            const mergedCategory = { ...existingCategory, ...updatedCategory };
            const response = await api.put(`/categories/${id}`, mergedCategory);
            setCategories((prev) =>
                prev.map((category) => (category.id === id ? mergedCategory : category))
            );
            console.log("Categoria editada com sucesso:", response.data);
        } catch (error: any) {
            console.error("Erro ao editar categoria:", error.message);
            console.error("Detalhes do erro:", error);
            Alert.alert(
                "Erro ao editar categoria",
                `Detalhes: ${error.message}\n${error.response?.data?.message || "Sem detalhes adicionais"}`
            );
        }
    };

    const handleRemoveCategory = async (id: number) => {
        try {
            console.log("Removendo categoria:", id);
            await api.delete(`/categories/${id}`);
            setCategories((prev) => prev.filter((category) => category.id !== id));
            console.log("Categoria removida com sucesso.");
        } catch (error: any) {
            console.error("Erro ao remover categoria:", error.message);
            console.error("Detalhes do erro:", error);
            Alert.alert(
                "Erro ao remover categoria",
                `Detalhes: ${error.message}\n${error.response?.data?.message || "Sem detalhes adicionais"}`
            );
        }
    };

    return (
        <View style={stylesHome.container}>
            <TouchableOpacity
                style={stylesHome.addButton}
                onPress={() => setIsExpenseModalVisible(true)}
            >
                <Icon name="add" size={28} color="#FFF" />
                <Text style={stylesHome.addButtonText}>Adicionar Gasto</Text>
            </TouchableOpacity>

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
                        onRemove={() => handleRemoveExpense(item.id)}
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={stylesHome.listEmptyText}>Nenhum gasto registrado.</Text>
                )}
            />

            <TouchableOpacity
                style={stylesHome.addButton}
                onPress={() => setIsCategoryModalVisible(true)}
            >
                <Icon name="category" size={28} color="#FFF" />
                <Text style={stylesHome.addButtonText}>Adicionar Categoria</Text>
            </TouchableOpacity>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Category
                        {...item}
                        onEdit={() => {
                            setCategoryToEdit(item);
                            setIsCategoryModalVisible(true);
                        }}
                        onRemove={() => handleRemoveCategory(item.id)}
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={stylesHome.listEmptyText}>Nenhuma categoria registrada.</Text>
                )}
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

            {isCategoryModalVisible && (
                <CategoryFormModal
                    visible={isCategoryModalVisible}
                    category={categoryToEdit}
                    onSave={(category: Partial<CategoryProps>) => {
                        if (categoryToEdit) {
                            handleEditCategory(categoryToEdit.id, category);
                        } else {
                            handleAddCategory(category as CategoryProps);
                        }
                        setIsCategoryModalVisible(false);
                    }}
                    onClose={() => setIsCategoryModalVisible(false)}
                />
            )}
        </View>
    );
}
