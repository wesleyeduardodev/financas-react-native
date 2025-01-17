import { View, Text } from "react-native";
import { stylesCategory } from "./styleCategory";

export type CategoryProps = {
    id: number;
    nome: string;
    descricao: string; // Novo campo
};

export function Category({ nome, descricao }: CategoryProps) {
    // Log 58: Component Category rendered with name and description
    console.log("Log 58: Category component rendered with nome:", nome, "and descricao:", descricao);

    return (
        <View style={stylesCategory.container}>
            <Text style={stylesCategory.name}>{nome}</Text>
            {descricao ? (
                // Log 59: Description exists, showing the description text
                console.log("Log 59: Description exists, displaying:", descricao),
                    <Text style={stylesCategory.description}>{descricao}</Text>
            ) : (
                // Log 60: No description available, showing placeholder text
                console.log("Log 60: No description available, displaying placeholder text"),
                    <Text style={stylesCategory.descriptionEmpty}>
                        Nenhuma descrição fornecida.
                    </Text>
            )}
        </View>
    );
}
