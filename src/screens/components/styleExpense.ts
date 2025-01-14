import { StyleSheet } from "react-native";

export const stylesExpense = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 3,
        padding: 7,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    info: {
        flex: 1,
    },
    value: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    detail: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000", // Branco para destaque
        marginBottom: 4, // Espaço abaixo do título
    },
    dateTime: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "bold",
        marginTop: 8,
    },
    actions: {
        flexDirection: "row",
    },
    editButton: {
        backgroundColor: "#4CAF50",
        padding: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: "#F44336",
        padding: 8,
        borderRadius: 4,
    },
});
