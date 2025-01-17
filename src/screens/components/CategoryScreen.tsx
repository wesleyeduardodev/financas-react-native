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
        fetchCategories();
    }, []);

    // Log 39: Fetching categories from API
    console.log("Log 39: Fetching categories...");

    const fetchCategories = async () => {
        try {
            // Log 40: Making API request to fetch categories
            console.log("Log 40: Making API request to fetch categories from /categorias-registro-financeiros");

            const response = await api.get("/categorias-registro-financeiros");
            setCategories(response.data);

            // Log 41: Categories successfully fetched
            console.log("Log 41: Categories loaded successfully", response.data);
        } catch (error: any) {
            // Log 42: Error during fetching categories
            console.error("Log 42: Error fetching categories:", error);
            Alert.alert(
                "Erro ao carregar categorias",
                error.message || "Não foi possível carregar as categorias."
            );
        }
    };

    const handleAddCategory = async (newCategory: CategoryProps) => {
        try {
            // Log 43: Making API request to add a new category
            console.log("Log 43: Adding new category to /categorias-registro-financeiros", newCategory);

            const response = await api.post("/categorias-registro-financeiros", newCategory);
            setCategories((prev) => [...prev, response.data]);

            // Log 44: New category added successfully
            console.log("Log 44: New category added successfully", response.data);
        } catch (error: any) {
            // Log 45: Error during adding category
            console.error("Log 45: Error adding category:", error);
            Alert.alert("Erro ao adicionar categoria", error.message || "Erro desconhecido.");
        }
    };

    const handleEditCategory = async (id: number, updatedCategory: Partial<CategoryProps>) => {
        try {
            // Log 46: Making API request to update category
            console.log("Log 46: Updating category with id:", id, updatedCategory);

            const response = await api.put(`/categorias-registro-financeiros/${id}`, updatedCategory);
            setCategories((prev) =>
                prev.map((category) => (category.id === id ? response.data : category))
            );

            // Log 47: Category updated successfully
            console.log("Log 47: Category updated successfully", response.data);
        } catch (error: any) {
            // Log 48: Error during editing category
            console.error("Log 48: Error editing category:", error);
            Alert.alert("Erro ao editar categoria", error.message || "Erro desconhecido.");
        }
    };

    const handleRemoveCategory = async (id: number) => {
        try {
            // Log 49: Making API request to remove category
            console.log("Log 49: Removing category with id:", id);

            await api.delete(`/categorias-registro-financeiros/${id}`);
            setCategories((prev) => prev.filter((category) => category.id !== id));

            // Log 50: Category removed successfully
            console.log("Log 50: Category removed successfully");
        } catch (error: any) {
            // Log 51: Error during removing category
            console.error("Log 51: Error removing category:", error);
            Alert.alert("Erro ao remover categoria", error.message || "Erro desconhecido.");
        }
    };

    const confirmRemoveCategory = (id: number) => {
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

    const renderRightActions = (id: number) => (
        <View style={stylesCategoryScreen.actionContainer}>
            <TouchableOpacity
                style={stylesCategoryScreen.deleteButton}
                onPress={() => confirmRemoveCategory(id)}
            >
                <Icon name="delete" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={stylesCategoryScreen.container}>
            <TouchableOpacity
                style={stylesCategoryScreen.addButton}
                onPress={() => {
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
                renderItem={({ item }) => (
                    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                        <TouchableOpacity
                            style={stylesCategoryScreen.categoryCard}
                            onPress={() => {
                                setCategoryToEdit(item);
                                setIsCategoryModalVisible(true);
                            }}
                        >
                            <Category {...item} />
                        </TouchableOpacity>
                    </Swipeable>
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={stylesCategoryScreen.listEmptyText}>
                        Nenhuma categoria registrada.
                    </Text>
                )}
            />

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
