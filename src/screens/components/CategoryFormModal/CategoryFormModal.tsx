import { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { CategoryProps } from "../Category/Category";
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
    const [name, setName] = useState(category?.nome || "");

    useEffect(() => {
        if (category) {
            setName(category.nome);
        }
    }, [category]);

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={stylesCategoryFormModal.container}>
                <Text style={stylesCategoryFormModal.title}>
                    {category ? "Editar Categoria" : "Nova Categoria"}
                </Text>

                <TextInput
                    style={stylesCategoryFormModal.input}
                    placeholder="Nome da Categoria"
                    value={name}
                    onChangeText={setName}
                />

                <TouchableOpacity
                    style={stylesCategoryFormModal.saveButton}
                    onPress={() => {
                        if (!name.trim()) {
                            alert("O nome da categoria é obrigatório.");
                            return;
                        }
                        onSave({ nome: name });
                    }}
                >
                    <Text style={stylesCategoryFormModal.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={stylesCategoryFormModal.cancelButton}
                    onPress={onClose}
                >
                    <Text style={stylesCategoryFormModal.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
