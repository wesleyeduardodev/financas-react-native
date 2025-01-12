import { useState, useEffect } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
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

    const handleAddCategory = async (newCategory: CategoryProps) => {
        try {
            const response = await api.post("/categories", newCategory);
            setCategories((prev) => [...prev, response.data]);
        } catch (error: any) {
            Alert.alert("Erro ao adicionar categoria", error.message || "Erro desconhecido.");
        }
    };

    const handleEditCategory = async (id: number, updatedCategory: Partial<CategoryProps>) => {
        try {
            const response = await api.put(`/categories/${id}`, updatedCategory);
            setCategories((prev) =>
                prev.map((category) => (category.id === id ? response.data : category))
            );
        } catch (error: any) {
            Alert.alert("Erro ao editar categoria", error.message || "Erro desconhecido.");
        }
    };

    const handleRemoveCategory = async (id: number) => {
        try {
            await api.delete(`/categories/${id}`);
            setCategories((prev) => prev.filter((category) => category.id !== id));
        } catch (error: any) {
            Alert.alert("Erro ao remover categoria", error.message || "Erro desconhecido.");
        }
    };

    return (
        <View style={stylesCategoryScreen.container}>
            {/* Botão para adicionar nova categoria */}
            <TouchableOpacity
                style={stylesCategoryScreen.addButton}
                onPress={() => {
                    setCategoryToEdit(null); // Garante que é uma nova categoria
                    setIsCategoryModalVisible(true);
                }}
            >
                <Icon name="add" size={28} color="#FFF" />
                <Text style={stylesCategoryScreen.addButtonText}>Adicionar Categoria</Text>
            </TouchableOpacity>

            {/* Lista de categorias */}
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
                    <Text style={stylesCategoryScreen.listEmptyText}>
                        Nenhuma categoria registrada.
                    </Text>
                )}
            />

            {/* Modal para adicionar ou editar categoria */}
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
