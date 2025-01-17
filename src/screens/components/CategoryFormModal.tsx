import { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { CategoryProps } from "./Category";
import { stylesCategoryFormModal } from "./styleCategoryFormModal";

type CategoryFormModalProps = {
    visible: boolean;
    category: CategoryProps | null;
    onSave: (category: Partial<CategoryProps>) => void;
    onClose: () => void;
};

export function CategoryFormModal({
                                      visible,
                                      category,
                                      onSave,
                                      onClose,
                                  }: CategoryFormModalProps) {
    const [name, setName] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect(() => {
        if (category) {
            // Log 52: Category received, setting fields for editing
            console.log("Log 52: Category received for editing", category);
            setName(category.nome || "");
            setDescricao(category.descricao || "");
        } else {
            // Log 53: No category received, resetting form for new category
            console.log("Log 53: No category received, resetting form.");
            resetForm();
        }
    }, [category]);

    const resetForm = () => {
        // Log 54: Resetting form fields
        console.log("Log 54: Resetting form fields.");
        setName("");
        setDescricao("");
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={stylesCategoryFormModal.container}>
                <Text style={stylesCategoryFormModal.title}>
                    {category ? "Editar Categoria" : "Nova Categoria"}
                </Text>

                <View style={stylesCategoryFormModal.fieldContainer}>
                    <Text style={stylesCategoryFormModal.label}>Nome</Text>
                    <TextInput
                        style={stylesCategoryFormModal.input}
                        placeholderTextColor="#A9A9A9"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={stylesCategoryFormModal.fieldContainer}>
                    <Text style={stylesCategoryFormModal.label}>Descrição</Text>
                    <TextInput
                        style={[stylesCategoryFormModal.input, stylesCategoryFormModal.textarea]}
                        placeholder="(até 250 caracteres)"
                        placeholderTextColor="#A9A9A9"
                        value={descricao}
                        multiline={true}
                        maxLength={250}
                        onChangeText={setDescricao}
                    />
                    <Text style={stylesCategoryFormModal.charCounter}>
                        {descricao.length}/250
                    </Text>
                </View>

                <TouchableOpacity
                    style={stylesCategoryFormModal.saveButton}
                    onPress={() => {
                        // Log 55: Saving the category, checking for name validity
                        console.log("Log 55: Saving the category with name:", name, "and description:", descricao);

                        if (!name.trim()) {
                            alert("O nome da categoria é obrigatório.");
                            return;
                        }

                        // Log 56: Invoking onSave with the category data
                        console.log("Log 56: Invoking onSave with category data", { nome: name, descricao });
                        onSave({ nome: name, descricao });
                        resetForm();
                    }}
                >
                    <Text style={stylesCategoryFormModal.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesCategoryFormModal.cancelButton}
                    onPress={() => {
                        // Log 57: Cancelling the form, resetting fields
                        console.log("Log 57: Cancelling the form and resetting fields.");
                        resetForm();
                        onClose();
                    }}
                >
                    <Text style={stylesCategoryFormModal.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
