import {StyleSheet, FlexAlignType, FlexJustifyType} from "react-native";

export default StyleSheet.create({
    container: {
        position: "absolute" as "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        flex: 1,
        alignItems: "center" as FlexAlignType,
        justifyContent: "center" as FlexJustifyType,
        backgroundColor: "rgba(0,0,0,.2)"
    },
    indicator: {
        alignSelf: "center" as FlexAlignType
    }
});