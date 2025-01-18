import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { api } from "../services/api";
import { stylesUsuarioScreen } from "./styleUsuarioScreen";

type UsuarioScreenParams = {
    UsuarioScreen: {
        usuario?: { id: number; nome: string; email: string };
    };
};

export function UsuarioScreen() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<UsuarioScreenParams, "UsuarioScreen">>();
    const usuario = route.params?.usuario;

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome || "");
            setEmail(usuario.email || "");
            setSenha(""); // Senha deve ser redefinida ao editar
        } else {
            setNome("");
            setEmail("");
            setSenha("");
        }
    }, [usuario]);

    const handleSaveUsuario = async () => {
        try {
            const newUsuario = { nome, email, senha };
            console.log("Log 17: Adding a new newUsuario", newUsuario);
            const response = await api.post("/usuarios/v1/criarUsuarioLivre", newUsuario);
            Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
            console.log("Log 18: Usuario Cadastrado com sucesso", response.data);
            navigation.goBack(); // Volta para a tela anterior
        } catch (error: any) {
            console.error("Erro ao cadastrar usuário:", error);
            Alert.alert(
                "Erro",
                error.response?.data?.message ||
                "Não foi possível cadastrar o usuário. Tente novamente mais tarde."
            );
        }
    };

    const handleEditUsuario = async () => {
        try {
            if (!usuario) return;
            const updatedUsuario = { id: usuario.id, nome, email, senha };
            const response = await api.put(`/usuarios/${usuario.id}`, updatedUsuario);
            Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
            navigation.goBack(); // Volta para a tela anterior
        } catch (error: any) {
            console.error("Erro ao editar usuário:", error);
            Alert.alert(
                "Erro",
                error.response?.data?.message ||
                "Não foi possível editar o usuário. Tente novamente mais tarde."
            );
        }
    };

    return (
        <View style={stylesUsuarioScreen.container}>
            <Text style={stylesUsuarioScreen.title}>
                {usuario ? "Editar Usuário" : "Novo Usuário"}
            </Text>
            <TextInput
                style={stylesUsuarioScreen.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={stylesUsuarioScreen.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={stylesUsuarioScreen.input}
                placeholder="Senha"
                value={senha}
                secureTextEntry
                onChangeText={setSenha}
            />
            <TouchableOpacity
                style={stylesUsuarioScreen.saveButton}
                onPress={() => {
                    if (!nome.trim() || !email.trim() || !senha.trim()) {
                        Alert.alert("Erro", "Todos os campos são obrigatórios.");
                        return;
                    }
                    usuario ? handleEditUsuario() : handleSaveUsuario();
                }}
            >
                <Text style={stylesUsuarioScreen.buttonText}>
                    {usuario ? "Salvar Alterações" : "Cadastrar"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={stylesUsuarioScreen.cancelButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={stylesUsuarioScreen.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}
