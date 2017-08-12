import * as React from "react";
import {View, TouchableOpacity, Text} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../../../util/styles/colors";
import styles from "./styles";
import GlobalStyles from "../../../util/styles/styles";

const INCREMENT = 1;
const MIN_VALUE = 1;
const MAX_VALUE = 4;

type Props = {
    onUpdate: (value: number) => void
};

type State = {
    value?: number,
    disabled?: boolean
};

export default class ContractLengthField extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: 1
        };
    }
    handleIncrement = () => {
        let {value} = this.state;
        value = value + INCREMENT;
        let newValue;
        this.setState({disabled: true}, () => {
            if ((value - INCREMENT) < MIN_VALUE ) {
                newValue = MIN_VALUE;
            }
            else if ((value + INCREMENT) > MAX_VALUE) {
                newValue = MAX_VALUE;
            }
            else {
                newValue = value;
            }
            this.setState({value: newValue}, () => this.setState({disabled: false}));
            this.props.onUpdate(newValue);
        });
    }
    handleDecrement = () => {
        let {value} = this.state;
        value = value - INCREMENT;
        let newValue;
        this.setState({disabled: true}, () => {
            if ((value - INCREMENT) < MIN_VALUE ) {
                newValue = MIN_VALUE;
            }
            else if ((value + INCREMENT) > MAX_VALUE) {
                newValue = MAX_VALUE;
            }
            else {
                newValue = value;
            }
            this.setState({value: newValue}, () => this.setState({disabled: false}));
            this.props.onUpdate(newValue);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.value}>
                    <Text style={GlobalStyles.text}>{this.state.value} {this.state.value > 1 ? "years" : "year"}</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={this.handleDecrement} disabled={this.state.disabled} style={styles.button}>
                        <Icon color={Colors.red} name="remove-circle" size={30}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleIncrement} disabled={this.state.disabled} style={[styles.button, styles.buttonLast]}>
                        <Icon color={Colors.green} name="add-circle" size={30}></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}