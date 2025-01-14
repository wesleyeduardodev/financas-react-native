import { StyleSheet } from "react-native";

export const stylesFinancialSummary = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    filterButton: {
        backgroundColor: "#1144bd", // Cor do botão
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    filterButtonText: {
        color: "#FFF", // Cor do texto do botão
        fontWeight: "bold",
        fontSize: 14,
    },
    summaryCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "#FFF",
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        color: "#666",
    },
    valueEntrada: {
        fontSize: 16,
        color: "#28A745",
        fontWeight: "bold",
    },
    valueSaida: {
        fontSize: 16,
        color: "#DC3545",
        fontWeight: "bold",
    },
    valueSaldo: {
        fontSize: 16,
        color: "#007BFF",
        fontWeight: "bold",
    },
});
