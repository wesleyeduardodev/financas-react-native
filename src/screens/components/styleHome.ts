import {StyleSheet} from "react-native";

export const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F9FC",
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
        backgroundColor: "#28A745",
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
        shadowOffset: {width: 0, height: 1},
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
});
