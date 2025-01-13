import { StyleSheet } from "react-native";

export const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F9FC", // Fundo claro
        padding: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
        marginTop: 20,
    },
    addButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#28A745", // Verde para adicionar
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 4,
        elevation: 2,
    },
    addButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        marginLeft: 8,
    },
    expenseCard: {
        borderRadius: 8,
        padding: 6,
        marginBottom: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    expenseCardEntrada: {
        backgroundColor: "#92f4ae", // Verde claro para Entrada
        borderLeftWidth: 4,
        borderLeftColor: "#28A745", // Verde escuro para destaque
    },
    expenseCardSaida: {
        backgroundColor: "#f18a8a", // Vermelho claro para Saída
        borderLeftWidth: 4,
        borderLeftColor: "#DC3545", // Vermelho escuro para destaque
    },
    expenseValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333", // Valor destacado em preto suave
    },
    expenseDate: {
        fontSize: 12,
        color: "#666666", // Cinza para datas
        marginTop: 4,
    },
    actionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#F8F9FA", // Fundo neutro para os botões de ação
        borderRadius: 8,
        marginBottom: 12,
        padding: 16,
    },
    editButton: {
        backgroundColor: "#17A2B8", // Azul suave
        padding: 12,
        borderRadius: 4,
        marginRight: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    deleteButton: {
        backgroundColor: "#DC3545", // Vermelho para remover
        padding: 12,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    listEmptyText: {
        color: "#888888", // Texto em cinza suave para lista vazia
        textAlign: "center",
        marginTop: 16,
    },
    summaryContainer: {
        backgroundColor: "#64b554", // Verde para o resumo
        padding: 8,
        borderRadius: 8,
        marginTop: 16,
        elevation: 2,
    },
    summaryText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF", // Texto branco no resumo
        marginBottom: 8,
    },
});
