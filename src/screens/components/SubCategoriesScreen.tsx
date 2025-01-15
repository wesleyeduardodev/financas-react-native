import { useState, useEffect } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SubCategory, SubCategoryProps } from "./SubCategory";
import { SubCategoryFormModal } from "./SubCategoryFormModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { stylesSubCategoriesScreen } from "./styleSubCategoriesScreen";
import { api } from "../services/api";

export function SubCategoriesScreen() {
    const [subCategories, setSubCategories] = useState<SubCategoryProps[]>([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategoryProps[]>([]);
    const [categories, setCategories] = useState<{ id: number; nome: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [subCategoryToEdit, setSubCategoryToEdit] = useState<SubCategoryProps | null>(null);

    useEffect(() => {
        console.log("SubCategoriesScreen mounted");
        fetchCategories();
        fetchSubCategories();
    }, []);

    useEffect(() => {
        console.log("Filtering subcategories by category:", selectedCategory);
        filterSubCategoriesByCategory(selectedCategory);
    }, [selectedCategory, subCategories]);

    const fetchCategories = async () => {
        console.log("Fetching categories...");
        try {
            const response = await api.get("/categorias-registro-financeiros");
            console.log("Categories fetched successfully:", response.data);
            setCategories(response.data);
        } catch (error: any) {
            console.error("Error fetching categories:", error);
            Alert.alert("Erro ao carregar categorias.", error.message || "Tente novamente.");
        }
    };

    const fetchSubCategories = async () => {
        console.log("Fetching subcategories...");
        try {
            const response = await api.get("/subcategorias-registro-financeiros");
            console.log("Subcategories fetched successfully:", response.data);
            setSubCategories(response.data);
        } catch (error: any) {
            console.error("Error fetching subcategories:", error);
            Alert.alert("Erro ao carregar subcategorias.", error.message || "Tente novamente.");
        }
    };

    const filterSubCategoriesByCategory = (categoryId: number | null) => {
        if (categoryId === null) {
            console.log("No category selected. Showing all subcategories.");
            setFilteredSubCategories(subCategories);
        } else {
            const filtered = subCategories.filter((subCategory) => subCategory.idCategoria === categoryId);
            console.log("Filtered subcategories:", filtered);
            setFilteredSubCategories(filtered);
        }
    };

    const handleAddSubCategory = async (newSubCategory: Partial<SubCategoryProps>) => {
        console.log("Adding new subcategory:", newSubCategory);
        try {
            const response = await api.post("/subcategorias-registro-financeiros", newSubCategory);
            console.log("Subcategory added successfully:", response.data);
            await fetchSubCategories();
        } catch (error: any) {
            console.error("Error adding subcategory:", error);
            Alert.alert("Erro ao adicionar subcategoria.", error.message || "Tente novamente.");
        }
    };

    const handleEditSubCategory = async (id: number, updatedSubCategory: Partial<SubCategoryProps>) => {
        console.log("Editing subcategory with ID:", id, "Updated data:", updatedSubCategory);
        try {
            const response = await api.put(
                `/subcategorias-registro-financeiros/${id}`,
                updatedSubCategory
            );
            console.log("Subcategory edited successfully:", response.data);
            setSubCategories((prev) =>
                prev.map((subCategory) =>
                    subCategory.id === id ? response.data : subCategory
                )
            );
        } catch (error: any) {
            console.error("Error editing subcategory:", error);
            Alert.alert("Erro ao editar subcategoria.", error.message || "Tente novamente.");
        }
    };

    const handleRemoveSubCategory = async (id: number) => {
        console.log("Removing subcategory with ID:", id);
        try {
            await api.delete(`/subcategorias-registro-financeiros/${id}`);
            console.log("Subcategory removed successfully");
            setSubCategories((prev) => prev.filter((subCategory) => subCategory.id !== id));
        } catch (error: any) {
            console.error("Error removing subcategory:", error);
            Alert.alert("Erro ao remover subcategoria.", error.message || "Tente novamente.");
        }
    };

    const confirmRemoveSubCategory = (id: number) => {
        console.log("Confirming removal for subcategory ID:", id);
        Alert.alert(
            "Confirmar Remoção",
            "Tem certeza que deseja remover esta subcategoria?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: () => handleRemoveSubCategory(id),
                },
            ]
        );
    };

    const renderRightActions = (id: number) => {
        console.log("Rendering right actions for subcategory ID:", id);
        return (
            <View style={stylesSubCategoriesScreen.actionContainer}>
                <TouchableOpacity
                    style={stylesSubCategoriesScreen.deleteButton}
                    onPress={() => confirmRemoveSubCategory(id)}
                >
                    <Icon name="delete" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        );
    };

    const getCategoryName = (idCategoria: number | null) => {
        const category = categories.find((cat) => cat.id === idCategoria);
        const categoryName = category ? category.nome : "Sem Categoria";
        console.log("Category name for ID:", idCategoria, "is:", categoryName);
        return categoryName;
    };

    return (
        <View style={stylesSubCategoriesScreen.container}>
            {/* Seletor de Categoria e Botão de Adicionar */}
            <View style={stylesSubCategoriesScreen.headerContainer}>
                <View style={stylesSubCategoriesScreen.pickerContainer}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => {
                            console.log("Selected category updated:", itemValue);
                            setSelectedCategory(itemValue);
                        }}
                        style={stylesSubCategoriesScreen.picker}
                    >
                        <Picker.Item label="Tudo" value={null} />
                        {categories.map((category) => (
                            <Picker.Item key={category.id} label={category.nome} value={category.id} />
                        ))}
                    </Picker>
                </View>

                <TouchableOpacity
                    style={stylesSubCategoriesScreen.addButton}
                    onPress={() => {
                        console.log("Opening modal to add new subcategory");
                        setSubCategoryToEdit(null);
                        setIsModalVisible(true);
                    }}
                >
                    <Icon name="add" size={28} color="#FFF" />
                    <Text style={stylesSubCategoriesScreen.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredSubCategories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    console.log("Rendering subcategory:", item);
                    return (
                        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                            <TouchableOpacity
                                style={stylesSubCategoriesScreen.subCategoryCard}
                                onPress={() => {
                                    console.log("Opening modal to edit subcategory:", item);
                                    setSubCategoryToEdit(item);
                                    setIsModalVisible(true);
                                }}
                            >
                                <SubCategory {...item} categoryName={getCategoryName(item.idCategoria)} />
                            </TouchableOpacity>
                        </Swipeable>
                    );
                }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => {
                    console.log("No subcategories to display");
                    return (
                        <Text style={stylesSubCategoriesScreen.listEmptyText}>
                            Nenhuma subcategoria registrada.
                        </Text>
                    );
                }}
            />

            {isModalVisible && (
                <SubCategoryFormModal
                    visible={isModalVisible}
                    subCategory={subCategoryToEdit}
                    categories={categories}
                    onSave={(subCategory: Partial<SubCategoryProps>) => {
                        console.log(
                            subCategoryToEdit
                                ? "Saving edited subcategory"
                                : "Saving new subcategory",
                            subCategory
                        );
                        if (subCategoryToEdit) {
                            handleEditSubCategory(subCategoryToEdit.id, subCategory);
                        } else {
                            handleAddSubCategory(subCategory);
                        }
                        setIsModalVisible(false);
                    }}
                    onClose={() => {
                        console.log("Closing modal");
                        setIsModalVisible(false);
                    }}
                />
            )}
        </View>
    );
}
