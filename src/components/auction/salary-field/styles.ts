import {StyleSheet, FlexJustifyType} from "react-native";

export default StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row" as "row",
        alignItems: "center" as "center",
        justifyContent: "space-between" as "space-between"
    },
    value: {
        flex: 1
    },
    buttons: {
        flex: 1,
        flexDirection: "row" as "row",
        justifyContent: "flex-end" as FlexJustifyType
    },
    button: {
        width: 30,
        height: 30
    },
    buttonLast: {
        marginLeft: 16
    }
});