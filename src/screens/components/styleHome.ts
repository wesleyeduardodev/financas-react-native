import { StyleSheet } from "react-native";

export const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F9FC",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#28A745", // Cor verde para o botão
        padding: 16,
        borderRadius: 8,
        marginVertical: 16, // Espaçamento vertical
        elevation: 4, // Sombra para destacar o botão
    },
    addButtonText: {
        color: "#FFF", // Texto branco
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 8, // Espaço entre o ícone e o texto
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
        backgroundColor: "#92f4ae",
        borderLeftWidth: 4,
        borderLeftColor: "#28A745",
    },
    expenseCardSaida: {
        backgroundColor: "#f18a8a",
        borderLeftWidth: 4,
        borderLeftColor: "#DC3545",
    },
    hiddenItemContainer: {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    editButton: {
        backgroundColor: "#4CAF50",
        justifyContent: "center",
        alignItems: "center",
        width: 75,
        height: "50%",
    },
    deleteButton: {
        backgroundColor: "#E23C44",
        justifyContent: "center",
        alignItems: "center",
        width: 75,
        height: "50%",
    },

    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#007BFF", // Cor azul para o botão de filtros
        padding: 16,
        borderRadius: 8,
        marginLeft: 8, // Espaço entre os botões
        elevation: 4,
    },
    filterButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 8,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        textAlign: "center",
        marginBottom: 20,
    },
    applyButton: {
        backgroundColor: "#28A745",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
    },
    applyButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: "#DC3545",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
