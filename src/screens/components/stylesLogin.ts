import { StyleSheet } from "react-native";

export const stylesLogin = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F4F4",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#6200EE",
    },
    input: {
        width: "100%",
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 8,
        backgroundColor: "#FFF",
    },
    button: {
        width: "100%",
        padding: 12,
        backgroundColor: "#6200EE",
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    footerText: {
        marginTop: 24,
        fontSize: 14,
        color: "#6200EE",
        textDecorationLine: "underline",
    },
});
