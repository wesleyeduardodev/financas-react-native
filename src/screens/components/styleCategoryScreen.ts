import { StyleSheet } from "react-native";

export const stylesCategoryScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8",
        padding: 16,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
    },
    addButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        marginLeft: 8,
    },
    listEmptyText: {
        color: "#888",
        textAlign: "center",
        marginTop: 16,
    },
});
