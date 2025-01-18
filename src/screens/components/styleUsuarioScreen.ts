import { StyleSheet } from "react-native";

export const stylesUsuarioScreen = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 32,
        color: "#4CAF50",
    },
    input: {
        width: "90%",
        padding: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 10,
        backgroundColor: "#FFF",
        fontSize: 16,
        color: "#333",
    },
    saveButton: {
        width: "90%",
        padding: 14,
        backgroundColor: "#4CAF50",
        borderRadius: 10,
        alignItems: "center",
        marginTop: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    cancelButton: {
        width: "90%",
        padding: 14,
        backgroundColor: "#F44336",
        borderRadius: 10,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});
