import { View, Text } from "react-native";
import { stylesCategory } from "./styleCategory";

export type CategoryProps = {
    id: number;
    nome: string;
    descricao: string; // Novo campo
};

export function Category({ nome, descricao }: CategoryProps) {
    // Log para acompanhar quando o componente é renderizado
    console.log("Category component rendered", { nome, descricao });

    return (
        <View style={stylesCategory.container}>
            <Text style={stylesCategory.name}>{nome}</Text>
            {descricao ? (
                <>
                    <Text style={stylesCategory.description}>{descricao}</Text>
                    {console.log("Category has description:", descricao)}
                </>
            ) : (
                <>
                    <Text style={stylesCategory.descriptionEmpty}>
                        Nenhuma descrição fornecida.
                    </Text>
                    {console.log("Category has no description")}
                </>
            )}
        </View>
    );
}
