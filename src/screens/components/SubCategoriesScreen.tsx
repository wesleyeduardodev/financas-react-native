import React, { useState, useEffect } from "react";
import {
    Alert,
    FlatList,
    Platform,
    Text,
    TouchableOpacity,
    View,
    Modal,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SubCategory, SubCategoryProps } from "./SubCategory";
import { SubCategoryFormModal } from "./SubCategoryFormModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesSubCategoriesScreen } from "./styleSubCategoriesScreen";
import { api } from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

export function SubCategoriesScreen() {
    const [subCategories, setSubCategories] = useState<SubCategoryProps[]>([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategoryProps[]>([]);
    const [categories, setCategories] = useState<{ id: number; nome: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [subCategoryToEdit, setSubCategoryToEdit] = useState<SubCategoryProps | null>(null);
    const [iosPickerVisible, setIosPickerVisible] = useState(false);

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
            const response = await api.get("/categorias-registro-financeiros");
            setCategories([{ id: -1, nome: "Todas" }, ...response.data]); // Adiciona "Tudo" como opção padrão
        } catch (error: any) {
            Alert.alert("Erro ao carregar categorias.", error.message || "Tente novamente.");
        }
    };

    const fetchSubCategories = async () => {
        try {
            const response = await api.get("/subcategorias-registro-financeiros");
            setSubCategories(response.data);
        } catch (error: any) {
            Alert.alert("Erro ao carregar subcategorias.", error.message || "Tente novamente.");
        }
    };

    const filterSubCategoriesByCategory = (categoryId: number | null) => {
        if (categoryId === null || categoryId === -1) {
            setFilteredSubCategories(subCategories);
        } else {
            setFilteredSubCategories(
                subCategories.filter((subCategory) => subCategory.idCategoria === categoryId)
            );
        }
    };

    const handleAddSubCategory = async (newSubCategory: Partial<SubCategoryProps>) => {
        try {
            const response = await api.post("/subcategorias-registro-financeiros", newSubCategory);
            await fetchSubCategories();
        } catch (error: any) {
            Alert.alert("Erro ao adicionar subcategoria.", error.message || "Tente novamente.");
        }
    };

    const handleEditSubCategory = async (
        id: number,
        updatedSubCategory: Partial<SubCategoryProps>
    ) => {
        try {
            const response = await api.put(`/subcategorias-registro-financeiros/${id}`, updatedSubCategory);
            setSubCategories((prev) =>
                prev.map((subCategory) =>
                    subCategory.id === id ? response.data : subCategory
                )
            );
        } catch (error: any) {
            Alert.alert("Erro ao editar subcategoria.", error.message || "Tente novamente.");
        }
    };

    const handleRemoveSubCategory = async (id: number) => {
        try {
            await api.delete(`/subcategorias-registro-financeiros/${id}`);
            setSubCategories((prev) => prev.filter((subCategory) => subCategory.id !== id));
        } catch (error: any) {
            Alert.alert("Erro ao remover subcategoria.", error.message || "Tente novamente.");
        }
    };

    const confirmRemoveSubCategory = (id: number) => {
        Alert.alert(
            "Confirmar Remoção",
            "Tem certeza que deseja remover esta subcategoria?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Remover", style: "destructive", onPress: () => handleRemoveSubCategory(id) },
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

    const renderIosPicker = () => (
        <Modal visible={iosPickerVisible} animationType="slide" transparent={true}>
            <View style={stylesSubCategoriesScreen.modalOverlay}>
                <View style={stylesSubCategoriesScreen.modalContent}>
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={stylesSubCategoriesScreen.modalOption}
                                onPress={() => {
                                    setSelectedCategory(item.id === -1 ? null : item.id);
                                    setIosPickerVisible(false);
                                }}
                            >
                                <Text style={stylesSubCategoriesScreen.modalOptionText}>
                                    {item.nome}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={stylesSubCategoriesScreen.modalCancelButton}
                        onPress={() => setIosPickerVisible(false)}
                    >
                        <Text style={stylesSubCategoriesScreen.modalCancelButtonText}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={stylesSubCategoriesScreen.container}>
            {/* Seletor de Categoria e Botão de Adicionar */}
            <View style={stylesSubCategoriesScreen.headerContainer}>
                <View style={stylesSubCategoriesScreen.pickerContainer}>
                    {Platform.OS === "ios" ? (
                        <>
                            <TouchableOpacity
                                style={stylesSubCategoriesScreen.pickerButton}
                                onPress={() => setIosPickerVisible(true)}
                            >
                                <Text style={stylesSubCategoriesScreen.pickerButtonText}>
                                    {categories.find((cat) => cat.id === selectedCategory)?.nome ||
                                        "Todas"}
                                </Text>
                            </TouchableOpacity>
                            {renderIosPicker()}
                        </>
                    ) : (
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                            style={stylesSubCategoriesScreen.picker}
                        >
                            {categories.map((category) => (
                                <Picker.Item key={category.id} label={category.nome} value={category.id === -1 ? null : category.id} />
                            ))}
                        </Picker>
                    )}
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
                                categoryName={
                                    categories.find((cat) => cat.id === item.idCategoria)?.nome || "Sem Categoria"
                                }
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
                    categories={categories.filter((cat) => cat.id !== -1)} // Exclui "Tudo" no modal de edição
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
