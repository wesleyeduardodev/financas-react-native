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
            setName(category.nome || "");
            setDescricao(category.descricao || "");
        } else {
            resetForm();
        }
    }, [category]);

    const resetForm = () => {
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
                        if (!name.trim()) {
                            alert("O nome da categoria é obrigatório.");
                            return;
                        }
                        onSave({ nome: name, descricao });
                        resetForm();
                    }}
                >
                    <Text style={stylesCategoryFormModal.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesCategoryFormModal.cancelButton}
                    onPress={() => {
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
