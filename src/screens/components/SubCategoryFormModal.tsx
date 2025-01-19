import { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Platform,
} from "react-native";
import { SubCategoryProps } from "./SubCategory";
import { stylesSubCategoryFormModal } from "./styleSubCategoryFormModal";
import {Picker} from "@react-native-picker/picker";

type SubCategoryFormModalProps = {
    visible: boolean;
    subCategory: SubCategoryProps | null;
    categories: { id: number; nome: string }[];
    onSave: (subCategory: Partial<SubCategoryProps>) => void;
    onClose: () => void;
};

export function SubCategoryFormModal({
                                         visible,
                                         subCategory,
                                         categories,
                                         onSave,
                                         onClose,
                                     }: SubCategoryFormModalProps) {
    const [name, setName] = useState(subCategory?.nome || "");
    const [descricao, setDescricao] = useState(subCategory?.descricao || "");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        subCategory?.idCategoria || null
    );
    const [iosPickerVisible, setIosPickerVisible] = useState(false);

    useEffect(() => {
        if (subCategory) {
            setName(subCategory.nome);
            setDescricao(subCategory.descricao);
            setSelectedCategory(subCategory.idCategoria || null);
        } else {
            resetForm();
        }
    }, [subCategory]);

    const resetForm = () => {
        setName("");
        setDescricao("");
        setSelectedCategory(null);
    };

    const renderIosPicker = () => (
        <Modal visible={iosPickerVisible} animationType="slide" transparent={true}>
            <View style={stylesSubCategoryFormModal.modalOverlay}>
                <View style={stylesSubCategoryFormModal.modalContent}>
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={stylesSubCategoryFormModal.modalOption}
                                onPress={() => {
                                    setSelectedCategory(item.id);
                                    setIosPickerVisible(false);
                                }}
                            >
                                <Text style={stylesSubCategoryFormModal.modalOptionText}>
                                    {item.nome}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={stylesSubCategoryFormModal.modalCancelButton}
                        onPress={() => setIosPickerVisible(false)}
                    >
                        <Text style={stylesSubCategoryFormModal.modalCancelButtonText}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={stylesSubCategoryFormModal.container}>
                <Text style={stylesSubCategoryFormModal.title}>
                    {subCategory ? "Editar Subcategoria" : "Nova Subcategoria"}
                </Text>

                <View style={stylesSubCategoryFormModal.fieldContainer}>
                    <Text style={stylesSubCategoryFormModal.label}>Nome</Text>
                    <TextInput
                        style={stylesSubCategoryFormModal.input}
                        placeholder="Nome da Subcategoria"
                        placeholderTextColor="#A9A9A9"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={stylesSubCategoryFormModal.fieldContainer}>
                    <Text style={stylesSubCategoryFormModal.label}>Descrição</Text>
                    <TextInput
                        style={[
                            stylesSubCategoryFormModal.input,
                            stylesSubCategoryFormModal.textarea,
                        ]}
                        placeholder="(até 250 caracteres)"
                        placeholderTextColor="#A9A9A9"
                        value={descricao}
                        multiline={true}
                        maxLength={250}
                        onChangeText={setDescricao}
                    />
                    <Text style={stylesSubCategoryFormModal.charCounter}>
                        {descricao.length}/250
                    </Text>
                </View>

                <View style={stylesSubCategoryFormModal.fieldContainer}>
                    <Text style={stylesSubCategoryFormModal.label}>Categoria</Text>
                    {Platform.OS === "ios" ? (
                        <>
                            <TouchableOpacity
                                style={stylesSubCategoryFormModal.pickerButton}
                                onPress={() => setIosPickerVisible(true)}
                            >
                                <Text style={stylesSubCategoryFormModal.pickerButtonText}>
                                    {categories.find((cat) => cat.id === selectedCategory)?.nome ||
                                        "Selecione uma categoria"}
                                </Text>
                            </TouchableOpacity>
                            {renderIosPicker()}
                        </>
                    ) : (
                        <View style={stylesSubCategoryFormModal.pickerContainer}>
                            <Picker
                                selectedValue={selectedCategory}
                                onValueChange={(itemValue) =>
                                    setSelectedCategory(itemValue as number)
                                }
                                style={stylesSubCategoryFormModal.picker}
                            >
                                <Picker.Item label="Selecione uma categoria" value={null} />
                                {categories.map((category) => (
                                    <Picker.Item
                                        key={category.id}
                                        label={category.nome}
                                        value={category.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={stylesSubCategoryFormModal.saveButton}
                    onPress={() => {
                        if (!name.trim() || !selectedCategory) {
                            alert("Todos os campos são obrigatórios.");
                            return;
                        }
                        onSave({ nome: name, descricao, idCategoria: selectedCategory });
                    }}
                >
                    <Text style={stylesSubCategoryFormModal.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesSubCategoryFormModal.cancelButton}
                    onPress={() => {
                        resetForm();
                        onClose();
                    }}
                >
                    <Text style={stylesSubCategoryFormModal.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
