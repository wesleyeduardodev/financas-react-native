import { StyleSheet } from "react-native";

export const stylesExpenseFormModal = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        padding: 20,
        borderRadius: 10,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    fieldContainer: {
        marginBottom: 15,
    },
    label: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#4c4b4b",
        color: "#FFF",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    picker: {
        backgroundColor: "#4c4b4b",
        color: "#FFF",
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    },
    dateTimeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    datePickerButton: {
        flex: 1,
        backgroundColor: "#444",
        padding: 12,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    datePickerText: {
        color: "#FFF",
        textAlign: "center",
        fontWeight: "bold",
    },
    saveButton: {
        backgroundColor: "#317bcf",
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#E23C44",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: "center",
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
});
