import { StyleSheet } from "react-native";

export const stylesCategoryScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 16,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6200EE",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
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
