import { StyleSheet } from "react-native";
import {Home} from "./Home";

export const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131016",
        padding: 20,
    },
    addButton: {
        backgroundColor: "#317bcf",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    addButtonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
    },
    listEmptyText: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 16,
        marginTop: 32,
    },
});
