import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, Linking, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../../../App";
import { api, setApiAuth } from "../services/api";
import { stylesLogin } from "./stylesLogin";

export function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true); // Estado para validar email
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar email
        setIsValidEmail(emailRegex.test(email));
    };

    const handleLogin = async () => {
        if (!isValidEmail) {
            Alert.alert("Erro", "Por favor, insira um email válido.");
            return;
        }
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

    const handleNavigateToCreateAccount = () => {
        navigation.navigate("CadastroUsuarioScreen");
    };

    return (
        <View style={stylesLogin.container}>
            <Image
                source={require("../../../assets/logo.png")}
                style={stylesLogin.logo}
            />
            <Text style={stylesLogin.title}>Controle Financeiro</Text>
            <TextInput
                style={[
                    stylesLogin.input,
                    !isValidEmail && { borderColor: "red" }, // Borda vermelha se inválido
                ]}
                placeholder="Email"
                value={username}
                onChangeText={(text) => {
                    setUsername(text);
                    validateEmail(text); // Valida o email enquanto o usuário digita
                }}
                placeholderTextColor="#A3A3A3"
            />
            {!isValidEmail && (
                <Text style={{ color: "red", marginTop: 4 }}>
                    Por favor, insira um email válido.
                </Text>
            )}
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
            <TouchableOpacity onPress={handleNavigateToCreateAccount}>
                <Text style={stylesLogin.createAccountText}>Criar Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenInstagram}>
                <Text style={stylesLogin.footerText}>Desenvolvido por @wesleyeduardo.dev</Text>
            </TouchableOpacity>
        </View>
    );
}
