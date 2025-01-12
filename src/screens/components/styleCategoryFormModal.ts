import { StyleSheet } from "react-native";

export const stylesCategoryFormModal = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)", // Fundo com opacidade para foco no modal
        padding: 20,
        borderRadius: 10,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        backgroundColor: "#2D2D2D",
        color: "#FFF",
        borderRadius: 5,
        padding: 15,
        marginBottom: 20,
        width: "100%",
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#317bcf",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        width: "100%",
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#E23C44",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});
