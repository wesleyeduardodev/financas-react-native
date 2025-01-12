import { StyleSheet } from "react-native";
import {ExpenseFormModal} from "./ExpenseFormModal";

export const stylesExpenseFormModal = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 20,
    },
    title: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        backgroundColor: "#333333",
        color: "#FFF",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: "#317bcf",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#E23C44",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
});
