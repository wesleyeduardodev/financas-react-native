import { StyleSheet } from "react-native";

export const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F9FC", // Fundo claro e neutro
        padding: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    addButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#28A745", // Verde suave
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 4,
        elevation: 2,
    },
    addButtonText: {
        color: "#FFF", // Texto branco nos botões
        fontWeight: "bold",
        marginLeft: 8,
    },
    expenseCard: {
        backgroundColor: "#FFFFFF", // Fundo branco para os cartões
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Sombra leve para elevação
    },
    expenseValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333", // Texto escuro para destaque
    },
    expenseDate: {
        fontSize: 12,
        color: "#666666", // Texto cinza claro para informações secundárias
        marginTop: 4,
    },
    actionButton: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 8,
    },
    editButton: {
        backgroundColor: "#17A2B8", // Azul suave
        padding: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: "#DC3545", // Vermelho suave
        padding: 8,
        borderRadius: 4,
    },
    listEmptyText: {
        color: "#888888", // Cinza para mensagens vazias
        textAlign: "center",
        marginTop: 16,
    },
});
