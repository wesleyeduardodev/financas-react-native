import { StyleSheet } from "react-native";

export const stylesExpenseFormModal = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
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
    picker: {
        backgroundColor: "#2D2D2D",
        color: "#FFF",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    input: {
        backgroundColor: "#2D2D2D",
        color: "#FFF",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    datePickerButton: {
        backgroundColor: "#444",
        padding: 12,
        borderRadius: 5,
        marginBottom: 15,
    },
    datePickerText: {
        color: "#FFF",
        textAlign: "center",
        fontWeight: "bold",
    },
    saveButton: {
        backgroundColor: "#317bcf",
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#E23C44",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
});
