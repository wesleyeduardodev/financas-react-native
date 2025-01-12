import { StyleSheet } from "react-native";
import {Expense} from "./Expense";

export const stylesExpense = StyleSheet.create({
    container: {
        backgroundColor: "#1F1E25",
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    info: {
        flex: 1,
    },
    value: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    category: {
        color: "#A9A9A9",
        fontSize: 14,
    },
    dateTime: {
        color: "#696969",
        fontSize: 12,
    },
    actions: {
        flexDirection: "row",
        gap: 8,
    },
    editButton: {
        backgroundColor: "#317bcf",
        padding: 8,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: "#E23C44",
        padding: 8,
        borderRadius: 5,
    },
});
