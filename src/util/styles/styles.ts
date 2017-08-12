import {StyleSheet} from "react-native";
import Colors from "./colors";
import Fonts from "./fonts";

export default StyleSheet.create({
    defaultHeader: {
        backgroundColor: Colors.primary,
        shadowColor: Colors.black,
        shadowRadius: 2,
        shadowOpacity: .3,
        shadowOffset: {
            height: 2,
            width: 0
        },
        paddingHorizontal: 16
    },
    defaultHeaderTitle: {
         color: Colors.white,
         fontFamily: Fonts.Roboto,
         fontWeight: "700" as "700"
    },
    screenContainer: {
        backgroundColor: Colors.white,
        padding: 16,
        flex: 1
    },
    sectionHeader: {
        marginVertical: 16,
        fontSize: 20,
        color: Colors.black,
        fontWeight: "700" as "700"
    },
    headerButton: {
        color: Colors.white
    },
    text: {
        fontFamily: Fonts.Roboto
    },
    bold: {
        fontWeight: "700" as "700"
    }
});

