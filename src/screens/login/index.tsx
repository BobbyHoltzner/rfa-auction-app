import * as React from "react";
import {View, Alert} from "react-native";
import PropTypes from "prop-types";
import { TextField } from "react-native-material-textfield";
import { RaisedTextButton } from "react-native-material-buttons";
import styles from "./styles";
import Colors from "../../util/styles/colors";
import GlobalStyles from "../../util/styles/styles";


type Props = {

};

type State = {
    email?: string,
    password?: string
};

type Context = {
    firebaseApp: any
};

export default class Login extends React.Component<Props, State> {
    context: Context;
    static contextTypes = {
        firebaseApp: PropTypes.any
    };
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Login",
        headerStyle: GlobalStyles.defaultHeader,
        headerTitleStyle: GlobalStyles.defaultHeaderTitle
    })
    constructor(props: Props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    onChangeEmail = (newValue: string) => {
        this.setState({
        email: newValue
        });
    }
    onChangePassword = (newValue: string) => {
        this.setState({
        password: newValue
        });
    }
    handleSubmit = (e: any) => {
        this.context.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(firebaseUser => {
            // Do Something
        })
        .catch(error => {
            // Error Handling
            Alert.alert("Error Signing In", error.message);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <TextField
                    label="Email Address"
                    value={this.state.email}
                    onChangeText={this.onChangeEmail}
                    autoCapitalize="none"
                    tintColor={Colors.primary}
                />
                <TextField
                    label="Password"
                    value={this.state.password}
                    onChangeText={this.onChangePassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    tintColor={Colors.primary}
                />
                <RaisedTextButton
                    title="Login"
                    color={Colors.primary}
                    titleColor={Colors.white}
                    onPress={this.handleSubmit}
                    style={{marginTop: 16}}
                />
            </View>
        );
    }
}