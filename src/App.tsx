import * as React from "react";
import PropTypes from "prop-types";
import {Alert, StatusBar} from "react-native";
import {StackNavigator, DrawerNavigator} from "react-navigation";
import LoadingIndicator from "./components/loading-indicator";
import Login from "./screens/login";
import TeamInfo from "./components/team-info";
import Auction from "./screens/auction";
const firebase = require("firebase");
const Rebase = require("re-base");
import Colors from "./util/styles/colors";
require("firebase/auth");
const config = {
    apiKey: "AIzaSyA_xdNNhRUQAPS4sB2kzIriiFSWP6sWO_Q",
    authDomain: "draft-app.firebaseapp.com",
    databaseURL: "https://draft-app.firebaseio.com",
    storageBucket: "draft-app.appspot.com",
    messagingSenderId: "194883286899"
};
const app = firebase.initializeApp(config);
const DB = Rebase.createClass(app.database());


const AuthenticatedStack = StackNavigator({
  Auction: {screen: Auction}
});

const AuthenticatedWrapper = DrawerNavigator({
    App: {
      screen: AuthenticatedStack
    }
  }, {
    contentComponent: props => {
        return (<TeamInfo {...props}/>);
    }
  });

const UnAuthenticatedWrapper = StackNavigator({
  Login: {screen: Login}
});


type Props = {
    navigation?: any
};

type State = {
  loading?: boolean,
  authenticated?: boolean,
  user?: any
};

type Context = {
    showError: (message: string) => void
};

export default class App extends React.Component<Props, State> {
    context: Context;
    static childContextTypes = {
        firebaseApp: PropTypes.any,
        firebaseDB: PropTypes.any,
        logout: PropTypes.func,
        user: PropTypes.any,
        showError: PropTypes.func
    };
    state = {
        loading: true,
        authenticated: false,
        user: undefined
    };
    getChildContext() {
        return {
            firebaseApp: app,
            firebaseDB: DB,
            logout: this.logout,
            user: this.state.user,
            showError: this.showError
        };
    }
    componentDidMount() {
        StatusBar.setBackgroundColor(Colors.primary);
        StatusBar.setBarStyle("light-content");
        app.auth().onAuthStateChanged(this.authListener);
    }
    showError = (message: string) => {
        Alert.alert("Error", message);
    }
    authListener = (authData: any) => {
        this.setState({
            user: authData,
            loading: false
        });
    }
    logout = () => {
        app.auth().signOut();
    }
    render() {
        if (!this.state.loading) {
            if (this.state.user !== null) {
                return (<AuthenticatedWrapper navigation={this.props.navigation}/>);
            }
            else {
                return (<UnAuthenticatedWrapper />);
            }
        }
        else {
            return (
                <LoadingIndicator show={this.state.loading}/>
            );
        }
    }
}