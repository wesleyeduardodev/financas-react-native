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
    // Log para acompanhar a renderização do componente e os dados recebidos
    console.log("Rendering SubCategory component", {
        nome,
        descricao,
        categoryName,
    });

    return (
        <View style={stylesSubCategory.container}>
            <Text style={stylesSubCategory.name}>{nome}</Text>
            <Text style={stylesSubCategory.descricaoCategoria}>Descrição: {descricao}</Text>
            <Text style={stylesSubCategory.category}>Categoria: {categoryName}</Text>
        </View>
    );
}
