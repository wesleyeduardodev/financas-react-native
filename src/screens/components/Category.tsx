import { View, Text } from "react-native";
import { stylesCategory } from "./styleCategory";

export type CategoryProps = {
    id: number;
    nome: string;
    descricao: string; // Novo campo
};

export function Category({ nome, descricao }: CategoryProps) {
    return (
        <View style={stylesCategory.container}>
            <Text style={stylesCategory.name}>{nome}</Text>
            {descricao ? (
                <Text style={stylesCategory.description}>{descricao}</Text>
            ) : (
                <Text style={stylesCategory.descriptionEmpty}>
                    Nenhuma descrição fornecida.
                </Text>
            )}
        </View>
    );
}
