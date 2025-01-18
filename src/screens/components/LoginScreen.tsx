import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, Linking, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../../../App";
import { api, setApiAuth } from "../services/api";
import { stylesLogin } from "./stylesLogin";

export function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    const handleLogin = async () => {
        try {
            setApiAuth(username, password);
            const response = await api.get("/registros-financeiros");
            if (response.status === 200) {
                navigation.navigate("MainApp");
            }
        } catch (error: any) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                Alert.alert("Erro", "Usuário ou senha inválidos.");
            } else {
                Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login.");
            }
        }
    };

    const handleOpenInstagram = () => {
        const instagramUrl = "https://www.instagram.com/wesleyeduardo.dev";
        Linking.openURL(instagramUrl).catch(() =>
            Alert.alert("Erro", "Não foi possível abrir o Instagram.")
        );
    };

    return (
        <View style={stylesLogin.container}>
            <Image
                source={require("../../../assets/logo.png")} // Ajustado o caminho relativo
                style={stylesLogin.logo}
            />
            <Text style={stylesLogin.title}>Controle Financeiro</Text>
            <TextInput
                style={stylesLogin.input}
                placeholder="Nome"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#A3A3A3"
            />
            <TextInput
                style={stylesLogin.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#A3A3A3"
            />
            <TouchableOpacity style={stylesLogin.button} onPress={handleLogin}>
                <Text style={stylesLogin.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenInstagram}>
                <Text style={stylesLogin.footerText}>Desenvolvido por @wesleyeduardo.dev</Text>
            </TouchableOpacity>
        </View>
    );
}
