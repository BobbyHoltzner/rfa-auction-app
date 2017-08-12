import {Platform} from "react-native";

const Fonts = {
    Roboto: Platform.OS === "ios" ? "Roboto-Regular" : "Roboto"
};

export default Fonts;