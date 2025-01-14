import { StyleSheet } from "react-native";

export const stylesFilterModal = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.9)", // Fundo escuro semi-transparente
        padding: 20,
        borderRadius: 10,
    },
    title: {
        color: "#FFFFFF", // Texto branco
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    pickerContainer: {
        backgroundColor: "#4c4b4b", // Fundo cinza escuro
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    picker: {
        color: "#FFFFFF", // Texto branco
    },
    applyButton: {
        backgroundColor: "#28A745", // Verde para o botão de aplicar filtros
        padding: 12,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    applyButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: "#DC3545", // Vermelho para o botão de cancelar
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    datePickerContainer: {
        marginBottom: 15,
    },
    label: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    dateButton: {
        backgroundColor: "#4c4b4b",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    dateButtonText: {
        color: "#FFF",
        fontSize: 16,
    },
});
