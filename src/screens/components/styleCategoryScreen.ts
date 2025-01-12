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
    categoryCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    actionContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    editButton: {
        backgroundColor: "#17A2B8",
        padding: 12,
        borderRadius: 4,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: "#DC3545",
        padding: 12,
        borderRadius: 4,
    },
    listEmptyText: {
        color: "#888",
        textAlign: "center",
        marginTop: 16,
    },
});
