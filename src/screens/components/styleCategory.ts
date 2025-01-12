import { StyleSheet } from "react-native";
import {Category} from "./Category";

export const stylesCategory = StyleSheet.create({
    container: {
        backgroundColor: "#1F1E25",
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    name: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
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
