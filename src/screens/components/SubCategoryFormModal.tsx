import { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity
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
        subCategory?.id || null
    );

    useEffect(() => {
        if (subCategory) {
            setName(subCategory.nome);
            setDescricao(subCategory.descricao);
            setSelectedCategory(subCategory.id || null);
        }
    }, [subCategory]);

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
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={stylesSubCategoryFormModal.fieldContainer}>
                    <Text style={stylesSubCategoryFormModal.label}>Descrição</Text>
                    <TextInput
                        style={stylesSubCategoryFormModal.input}
                        value={descricao}
                        onChangeText={setDescricao}
                        multiline
                    />
                </View>

                <View style={stylesSubCategoryFormModal.fieldContainer}>
                    <Text style={stylesSubCategoryFormModal.label}>Categoria</Text>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue as number)}
                    >
                        {categories.map((category) => (
                            <Picker.Item
                                key={category.id}
                                label={category.nome}
                                value={category.id}
                            />
                        ))}
                    </Picker>
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
                    onPress={onClose}
                >
                    <Text style={stylesSubCategoryFormModal.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
