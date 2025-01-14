import { View, Text } from "react-native";
import { stylesSubCategory } from "./styleSubCategory";

export type SubCategoryProps = {
    id: number;
    nome: string;
    descricao: string;
    idCategoria: number; // Adicionar esta linha
    descricaoCategoria: string;
};

export function SubCategory({ nome, descricao, descricaoCategoria }: SubCategoryProps) {
    return (
        <View style={stylesSubCategory.container}>
            <Text style={stylesSubCategory.name}>{nome}</Text>
            <Text style={stylesSubCategory.category}>Categoria: {descricaoCategoria}</Text>
        </View>
    );
}
