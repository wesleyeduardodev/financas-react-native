import { StyleSheet } from "react-native";

export const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    addButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6200EE",
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 4,
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
