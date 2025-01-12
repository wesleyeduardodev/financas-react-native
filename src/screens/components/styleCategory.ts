import { StyleSheet } from "react-native";

export const stylesCategory = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2D2D2D",
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFF",
    },
    description: {
        fontSize: 14,
        color: "#A9A9A9", // Cor de destaque para a descrição
        marginTop: 4, // Espaço abaixo do título
        fontStyle: "italic", // Opcional: estilo itálico para diferenciar
    },
    actions: {
        flexDirection: "row",
    },
    editButton: {
        backgroundColor: "#317bcf",
        padding: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: "#E23C44",
        padding: 8,
        borderRadius: 4,
    },
});
