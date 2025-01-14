import { StyleSheet } from "react-native";

export const stylesSubCategory = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#FFF",
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    category: {
        fontSize: 12,
        color: "#999",
        marginTop: 10,
    },
});
