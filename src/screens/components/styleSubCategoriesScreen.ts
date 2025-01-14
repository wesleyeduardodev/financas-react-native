import { StyleSheet } from "react-native";

export const stylesSubCategoriesScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
    },
    subCategoryCard: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    actionContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    deleteButton: {
        backgroundColor: "#DC3545",
        padding: 10,
        borderRadius: 8,
    },
    listEmptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#666",
        marginTop: 20,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    pickerContainer: {
        flex: 1,
        backgroundColor: "#4CAF50",
        borderRadius: 8,
        marginRight: 10, // Espaçamento entre o seletor e o botão
    },
    picker: {
        color: "#FFF",
        paddingHorizontal: 10,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 8,
    },
    addButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 5,
    },
});
