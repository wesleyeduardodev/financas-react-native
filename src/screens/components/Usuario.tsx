import { View, Text } from "react-native";
import { stylesUsuario } from "./usuarioStyle";

export type UsuarioProps = {
    id: number;
    nome: string;
    email: string;
};

export function Usuario({ nome, email }: UsuarioProps) {
    return (
        <View style={stylesUsuario.container}>
            <Text style={stylesUsuario.name}>{nome}</Text>
            <Text style={stylesUsuario.email}>{email}</Text>
        </View>
    );
}
