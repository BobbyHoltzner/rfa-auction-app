import {StyleSheet, FlexJustifyType} from "react-native";
import Colors from "../../../util/styles/colors";

export default StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row" as "row",
        alignItems: "center" as "center",
        justifyContent: "space-between" as "space-between",
        paddingVertical: 8
    },
    value: {
        flex: 1
    },
    buttons: {
        flex: 1,
        flexDirection: "row" as "row",
        justifyContent: "flex-end" as FlexJustifyType
    },
    decrement: {
        color: Colors.red
    },
    increment: {
        color: Colors.green
    },
    button: {
        width: 30,
        height: 30
    },
    buttonLast: {
        marginLeft: 16
    }
});