import { StyleSheet } from "react-native";

export const stylesSubCategoryFormModal = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 20,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#FFF",
        textAlign: "center",
    },
    label: {
        fontSize: 14,
        color: "#FFF",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        color: "#333",
    },
    saveButton: {
        backgroundColor: "#28A745",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: "#DC3545",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        color: "#FFF",
        fontWeight: "bold",
    },
});
