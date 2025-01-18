import React, {useState} from "react";
import {Alert, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation, NavigationProp} from "@react-navigation/native";
import {StackParamList} from "../../../App";
import {api, setApiAuth} from "../services/api";
import {stylesLogin} from "./stylesLogin";

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

    return (
        <View style={stylesLogin.container}>
            <Text style={stylesLogin.title}>Bem-vindo</Text>
            <TextInput
                style={stylesLogin.input}
                placeholder="Nome"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={stylesLogin.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={stylesLogin.button} onPress={handleLogin}>
                <Text style={stylesLogin.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}
