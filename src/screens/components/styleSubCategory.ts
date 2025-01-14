import { StyleSheet } from "react-native";

export const stylesSubCategory = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: "#317bcf", // Linha de destaque na esquerda
    },
    name: {
        fontSize: 20, // Tamanho maior para destaque
        fontWeight: "bold",
        color: "#000000", // Cor de destaque
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginTop: 10,
        lineHeight: 20,
    },
    descriptionEmpty: {
        fontSize: 14,
        color: "#999",
        fontStyle: "italic",
        marginTop: 10,
    },
    category: {
        fontSize: 14,
        color: "#317bcf",
        marginTop: 5,
        fontWeight: "500",
    },
});
