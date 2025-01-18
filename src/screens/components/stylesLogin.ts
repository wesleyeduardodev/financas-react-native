import { StyleSheet } from "react-native";

export const stylesLogin = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9F9F9", // Fundo mais leve e moderno
        padding: 16,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16, // Logo no topo para personalizar
    },
    title: {
        fontSize: 28, // Fonte maior para título
        fontWeight: "bold",
        marginBottom: 32,
        color: "#4CAF50", // Cor temática para finanças
    },
    input: {
        width: "90%",
        padding: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 10,
        backgroundColor: "#FFF",
        fontSize: 16, // Fonte maior para legibilidade
        color: "#333",
    },
    button: {
        width: "90%",
        padding: 14,
        backgroundColor: "#4CAF50", // Verde, remetendo a finanças
        borderRadius: 10,
        alignItems: "center",
        marginTop: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // Adiciona sombra para destaque
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    footerText: {
        marginTop: 24,
        fontSize: 14,
        color: "#4CAF50",
        textDecorationLine: "underline",
        fontWeight: "500",
    },
});
