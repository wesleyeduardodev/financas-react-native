import { View, Text } from "react-native";
import { stylesSubCategory } from "./styleSubCategory";

export type SubCategoryProps = {
    id: number;
    nome: string;
    descricao: string;
    idCategoria: number;
    descricaoCategoria: string;
};

export function SubCategory({
                                nome,
                                descricao,
                                categoryName,
                            }: SubCategoryProps & { categoryName: string }) {
    return (
        <View style={stylesSubCategory.container}>
            <Text style={stylesSubCategory.name}>{nome}</Text>
            <Text style={stylesSubCategory.category}>Categoria: {categoryName}</Text>
        </View>
    );
}
