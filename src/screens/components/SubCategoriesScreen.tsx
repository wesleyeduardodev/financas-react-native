import React, { useState, useEffect } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SubCategory, SubCategoryProps } from "./SubCategory";
import { SubCategoryFormModal } from "./SubCategoryFormModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker"; // Para o seletor de categoria
import { stylesSubCategoriesScreen } from "./styleSubCategoriesScreen";
import { api } from "../services/api";
import {useFocusEffect} from "@react-navigation/native";

export function SubCategoriesScreen() {
    const [subCategories, setSubCategories] = useState<SubCategoryProps[]>([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategoryProps[]>([]); // Para filtragem
    const [categories, setCategories] = useState<{ id: number; nome: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // Categoria selecionada
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [subCategoryToEdit, setSubCategoryToEdit] = useState<SubCategoryProps | null>(null);

    // Log 66: Fetching categories and subcategories on component mount
    console.log("Log 66: Fetching categories and subcategories...");
    useFocusEffect(
        React.useCallback(() => {
            fetchCategories();
            fetchSubCategories();
        }, [])
    );

    useEffect(() => {
        filterSubCategoriesByCategory(selectedCategory);
    }, [selectedCategory, subCategories]);

    const fetchCategories = async () => {
        try {
            // Log 67: Making API call to fetch categories
            console.log("Log 67: Making API call to fetch categories...");
            const response = await api.get("/categorias-registro-financeiros");
            console.log("Log 68: Categories loaded successfully", response.data);
            setCategories(response.data);
        } catch (error: any) {
            console.error("Log 69: Error loading categories", error);
            Alert.alert("Erro ao carregar categorias.", error.message || "Tente novamente.");
        }
    };

    const fetchSubCategories = async () => {
        try {
            // Log 70: Making API call to fetch subcategories
            console.log("Log 70: Making API call to fetch subcategories...");
            const response = await api.get("/subcategorias-registro-financeiros");
            console.log("Log 71: Subcategories loaded successfully", response.data);
            setSubCategories(response.data);
        } catch (error: any) {
            console.error("Log 72: Error loading subcategories", error);
            Alert.alert("Erro ao carregar subcategorias.", error.message || "Tente novamente.");
        }
    };

    const filterSubCategoriesByCategory = (categoryId: number | null) => {
        if (categoryId === null) {
            setFilteredSubCategories(subCategories);
        } else {
            // Log 73: Filtering subcategories by category
            console.log("Log 73: Filtering subcategories by category", categoryId);
            setFilteredSubCategories(
                subCategories.filter((subCategory) => subCategory.idCategoria === categoryId)
            );
        }
    };

    const handleAddSubCategory = async (newSubCategory: Partial<SubCategoryProps>) => {
        try {
            // Log 74: Adding new subcategory
            console.log("Log 74: Adding new subcategory", newSubCategory);
            const response = await api.post("/subcategorias-registro-financeiros", newSubCategory);
            await fetchSubCategories(); // Atualiza a lista completa após a adição
            console.log("Log 75: Subcategory added successfully", response.data);
        } catch (error: any) {
            console.error("Log 76: Error adding subcategory", error);
            Alert.alert("Erro ao adicionar subcategoria.", error.message || "Tente novamente.");
        }
    };

    const handleEditSubCategory = async (
        id: number,
        updatedSubCategory: Partial<SubCategoryProps>
    ) => {
        try {
            // Log 77: Editing subcategory
            console.log("Log 77: Editing subcategory", id, updatedSubCategory);
            const response = await api.put(`/subcategorias-registro-financeiros/${id}`, updatedSubCategory);
            setSubCategories((prev) =>
                prev.map((subCategory) =>
                    subCategory.id === id ? response.data : subCategory
                )
            );
            console.log("Log 78: Subcategory edited successfully", response.data);
        } catch (error: any) {
            console.error("Log 79: Error editing subcategory", error);
            Alert.alert("Erro ao editar subcategoria.", error.message || "Tente novamente.");
        }
    };

    const handleRemoveSubCategory = async (id: number) => {
        try {
            // Log 80: Removing subcategory
            console.log("Log 80: Removing subcategory", id);
            await api.delete(`/subcategorias-registro-financeiros/${id}`);
            setSubCategories((prev) => prev.filter((subCategory) => subCategory.id !== id));
            console.log("Log 81: Subcategory removed successfully");
        } catch (error: any) {
            console.error("Log 82: Error removing subcategory", error);
            Alert.alert("Erro ao remover subcategoria.", error.message || "Tente novamente.");
        }
    };

    const confirmRemoveSubCategory = (id: number) => {
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

    const renderRightActions = (id: number) => (
        <View style={stylesSubCategoriesScreen.actionContainer}>
            <TouchableOpacity
                style={stylesSubCategoriesScreen.deleteButton}
                onPress={() => confirmRemoveSubCategory(id)}
            >
                <Icon name="delete" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    const getCategoryName = (idCategoria: number | null) => {
        const category = categories.find((cat) => cat.id === idCategoria);
        return category ? category.nome : "Sem Categoria";
    };

    return (
        <View style={stylesSubCategoriesScreen.container}>
            {/* Seletor de Categoria e Botão de Adicionar */}
            <View style={stylesSubCategoriesScreen.headerContainer}>
                <View style={stylesSubCategoriesScreen.pickerContainer}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
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
                renderItem={({ item }) => (
                    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                        <TouchableOpacity
                            style={stylesSubCategoriesScreen.subCategoryCard}
                            onPress={() => {
                                setSubCategoryToEdit(item);
                                setIsModalVisible(true);
                            }}
                        >
                            <SubCategory
                                {...item}
                                categoryName={getCategoryName(item.idCategoria)}
                            />
                        </TouchableOpacity>
                    </Swipeable>
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={stylesSubCategoriesScreen.listEmptyText}>
                        Nenhuma subcategoria registrada.
                    </Text>
                )}
            />

            {isModalVisible && (
                <SubCategoryFormModal
                    visible={isModalVisible}
                    subCategory={subCategoryToEdit}
                    categories={categories}
                    onSave={(subCategory: Partial<SubCategoryProps>) => {
                        if (subCategoryToEdit) {
                            handleEditSubCategory(subCategoryToEdit.id, subCategory);
                        } else {
                            handleAddSubCategory(subCategory);
                        }
                        setIsModalVisible(false);
                    }}
                    onClose={() => setIsModalVisible(false)}
                />
            )}
        </View>
    );
}
