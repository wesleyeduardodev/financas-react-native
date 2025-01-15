import { useState, useEffect } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Category, CategoryProps } from "./Category";
import { CategoryFormModal } from "./CategoryFormModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesCategoryScreen } from "./styleCategoryScreen";
import { api } from "../services/api";

export function CategoryScreen() {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<CategoryProps | null>(null);

    useEffect(() => {
        console.log("CategoryScreen mounted");
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        console.log("Fetching categories...");
        try {
            const response = await api.get("/categorias-registro-financeiros");
            console.log("Categories fetched successfully:", response.data);
            setCategories(response.data);
        } catch (error: any) {
            console.error("Error fetching categories:", error);
            Alert.alert(
                "Erro ao carregar categorias",
                error.message || "Não foi possível carregar as categorias."
            );
        }
    };

    const handleAddCategory = async (newCategory: CategoryProps) => {
        console.log("Adding new category:", newCategory);
        try {
            const response = await api.post("/categorias-registro-financeiros", newCategory);
            console.log("Category added successfully:", response.data);
            setCategories((prev) => [...prev, response.data]);
        } catch (error: any) {
            console.error("Error adding category:", error);
            Alert.alert("Erro ao adicionar categoria", error.message || "Erro desconhecido.");
        }
    };

    const handleEditCategory = async (id: number, updatedCategory: Partial<CategoryProps>) => {
        console.log("Editing category:", { id, updatedCategory });
        try {
            const response = await api.put(
                `/categorias-registro-financeiros/${id}`,
                updatedCategory
            );
            console.log("Category edited successfully:", response.data);
            setCategories((prev) =>
                prev.map((category) => (category.id === id ? response.data : category))
            );
        } catch (error: any) {
            console.error("Error editing category:", error);
            Alert.alert("Erro ao editar categoria", error.message || "Erro desconhecido.");
        }
    };

    const handleRemoveCategory = async (id: number) => {
        console.log("Removing category with ID:", id);
        try {
            await api.delete(`/categorias-registro-financeiros/${id}`);
            console.log("Category removed successfully");
            setCategories((prev) => prev.filter((category) => category.id !== id));
        } catch (error: any) {
            console.error("Error removing category:", error);
            Alert.alert("Erro ao remover categoria", error.message || "Erro desconhecido.");
        }
    };

    const confirmRemoveCategory = (id: number) => {
        console.log("Confirming removal for category ID:", id);
        Alert.alert(
            "Confirmar Remoção",
            "Tem certeza que deseja remover esta categoria?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: () => handleRemoveCategory(id),
                },
            ]
        );
    };

    const renderRightActions = (id: number) => {
        console.log("Rendering right actions for category ID:", id);
        return (
            <View style={stylesCategoryScreen.actionContainer}>
                <TouchableOpacity
                    style={stylesCategoryScreen.deleteButton}
                    onPress={() => confirmRemoveCategory(id)}
                >
                    <Icon name="delete" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={stylesCategoryScreen.container}>
            <TouchableOpacity
                style={stylesCategoryScreen.addButton}
                onPress={() => {
                    console.log("Opening modal to add new category");
                    setCategoryToEdit(null);
                    setIsCategoryModalVisible(true);
                }}
            >
                <Icon name="add" size={28} color="#FFF" />
                <Text style={stylesCategoryScreen.addButtonText}>Adicionar Categoria</Text>
            </TouchableOpacity>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    console.log("Rendering category:", item);
                    return (
                        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                            <TouchableOpacity
                                style={stylesCategoryScreen.categoryCard}
                                onPress={() => {
                                    console.log("Opening modal to edit category:", item);
                                    setCategoryToEdit(item);
                                    setIsCategoryModalVisible(true);
                                }}
                            >
                                <Category {...item} />
                            </TouchableOpacity>
                        </Swipeable>
                    );
                }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => {
                    console.log("No categories to display");
                    return (
                        <Text style={stylesCategoryScreen.listEmptyText}>
                            Nenhuma categoria registrada.
                        </Text>
                    );
                }}
            />

            {isCategoryModalVisible && (
                <CategoryFormModal
                    visible={isCategoryModalVisible}
                    category={categoryToEdit}
                    onSave={(category: Partial<CategoryProps>) => {
                        console.log(
                            categoryToEdit
                                ? "Saving edited category"
                                : "Saving new category",
                            category
                        );
                        if (categoryToEdit) {
                            handleEditCategory(categoryToEdit.id, category);
                        } else {
                            handleAddCategory(category as CategoryProps);
                        }
                        setIsCategoryModalVisible(false);
                    }}
                    onClose={() => {
                        console.log("Closing category modal");
                        setIsCategoryModalVisible(false);
                    }}
                />
            )}
        </View>
    );
}
