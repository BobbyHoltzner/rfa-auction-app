import {StyleSheet} from "react-native";
import Colors from "../../../util/styles/colors";

export default StyleSheet.create({
    totalDeal: {
        paddingBottom: 16,
        paddingTop: 16
    },
    placeBidButton: {
        backgroundColor: Colors.green
    },
    revokeBidButton: {
        marginLeft: 16
    },
    buttonContainer: {
        flexDirection: "row" as "row"
    },
    auctionInfo: {
        paddingVertical: 16
    },
    leadBid: {
        marginTop: 8
    },
    bold: {
        fontWeight: "700" as "700"
    }
});