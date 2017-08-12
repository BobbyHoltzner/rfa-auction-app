import * as React from "react";
import {View, StatusBar, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import {TextButton} from "react-native-material-buttons";
import Colors from "../../util/styles/colors";
import GlobalStyles from "../../util/styles/styles";
import AuctionComponent from "../../components/auction";
import Icon from "react-native-vector-icons/MaterialIcons";


type Props = {
    navigation: any
};

type State = {

};

type Context = {
    firebaseApp: any,
    logout: () => void
};

export default class Auction extends React.Component<Props, State> {
    context: Context;
    static contextTypes = {
        firebaseApp: PropTypes.any,
        logout: PropTypes.func
    };
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Auction",
        headerRight: <TextButton title="LOGOUT" titleColor={Colors.white} onPress={() => navigation.state.params.right()} />,
        headerStyle: GlobalStyles.defaultHeader,
        headerTitleStyle: GlobalStyles.defaultHeaderTitle,
        headerLeft: <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}><Icon name="menu" color={Colors.white} size={24}/></TouchableOpacity>
    })
    constructor(props: Props) {
        super(props);
        StatusBar.setBarStyle("light-content");
    }
    componentDidMount() {
        const params = {
            right: this.context.logout
        };
        this.props.navigation.setParams(params);
    }
    render() {
        return (
            <View>
                <AuctionComponent navigation={this.props.navigation}/>
            </View>
        );
    }
}