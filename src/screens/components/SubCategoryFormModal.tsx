import { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { SubCategoryProps } from "./SubCategory";
import { Picker } from "@react-native-picker/picker";
import { stylesSubCategoryFormModal } from "./styleSubCategoryFormModal";

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

    // Log para acompanhar a inicialização ou atualização do modal
    useEffect(() => {
        console.log(visible ? "SubCategoryFormModal opened" : "SubCategoryFormModal closed");
        if (subCategory) {
            console.log("Editing subcategory:", subCategory);
            setName(subCategory.nome);
            setDescricao(subCategory.descricao);
            setSelectedCategory(subCategory.idCategoria || null);
        } else {
            console.log("Creating new subcategory");
            resetForm();
        }
    }, [subCategory, visible]);

    const resetForm = () => {
        console.log("Resetting form fields");
        setName("");
        setDescricao("");
        setSelectedCategory(null);
    };

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
                        onChangeText={(text) => {
                            console.log("Nome updated:", text);
                            setName(text);
                        }}
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
                        onChangeText={(text) => {
                            console.log("Descrição updated:", text);
                            setDescricao(text);
                        }}
                    />
                    <Text style={stylesSubCategoryFormModal.charCounter}>
                        {descricao.length}/250
                    </Text>
                </View>

                <View style={stylesSubCategoryFormModal.fieldContainer}>
                    <Text style={stylesSubCategoryFormModal.label}>Categoria</Text>
                    <View style={stylesSubCategoryFormModal.pickerContainer}>
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue) => {
                                console.log("Categoria selected:", itemValue);
                                setSelectedCategory(itemValue as number);
                            }}
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
                </View>

                <TouchableOpacity
                    style={stylesSubCategoryFormModal.saveButton}
                    onPress={() => {
                        if (!name.trim() || !selectedCategory) {
                            console.log("Save failed: Missing required fields");
                            alert("Todos os campos são obrigatórios.");
                            return;
                        }
                        console.log("Saving subcategory:", {
                            nome: name,
                            descricao,
                            idCategoria: selectedCategory,
                        });
                        onSave({ nome: name, descricao, idCategoria: selectedCategory });
                    }}
                >
                    <Text style={stylesSubCategoryFormModal.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesSubCategoryFormModal.cancelButton}
                    onPress={() => {
                        console.log("Closing modal without saving");
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
