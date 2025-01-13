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


    actionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: "#e4d8d8",
        borderRadius: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
    },




    hiddenItemContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginVertical: 5,
        borderRadius: 5,
        overflow: "hidden",
    },
    editButton: {
        backgroundColor: "#4CAF50", // Verde para edição
        justifyContent: "center",
        alignItems: "center",
        width: 75,
        height: "100%",
    },
    deleteButton: {
        backgroundColor: "#E23C44", // Vermelho para exclusão
        justifyContent: "center",
        alignItems: "center",
        width: 75,
        height: "100%",
    },
});
