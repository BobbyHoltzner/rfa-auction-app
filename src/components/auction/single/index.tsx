import * as React from "react";
import {View, Text} from "react-native";
import { Card, CardTitle, CardContent} from "react-native-material-cards";
import Colors from "../../../util/styles/colors";
import {RaisedTextButton } from "react-native-material-buttons";
import SalaryField from "../salary-field";
import ContractLengthField from "../contract-length-field";
import TimeCountdown from "../time-countdown";
import {getExpireDateForGroup} from "../../../util/Dates";
import PropTypes from "prop-types";
const accounting = require("accounting");
import styles from "./styles";
import GlobalStyles from "../../../util/styles/styles";

type Props = {
    name: string,
    current_bid: string,
    position: string,
    team: string,
    group: number,
    bids: {length: number, salary: number, user: string}[]
    onRevokeBid: (props: any) => void,
    onPlaceBid: (auction: any, bid: {length: number, salary: number}) => void,
    id: string
};

type State = {
    years?: any,
    salary?: any,
    salaryError?: string,
    expired?: boolean
};

type Context = {
    user: any
};

export default class SingleAuction extends React.Component<Props, State> {
    context: Context;
    static contextTypes = {
        user: PropTypes.any
    };
    constructor(props: Props) {
        super(props);
        this.state = {
            salary: 500000,
            years: 1,
            salaryError: "",
            expired: false
        };
    }
    handleUpdateContractLength = (value: number) => {
        this.setState({years: value});
    }
    handleUpdateSalary = (value: number) => {
        this.setState({salary: value});
    }
    onPlaceBid = () => {
        this.props.onPlaceBid(this.props, {length: this.state.years, salary: this.state.salary});
    }
    onRevokeBid = () => {
        this.props.onRevokeBid(this.props);
    }
    getCurrentBid = () => {
        let {bids} = this.props;
        if (bids && bids.length > 0) {
            return accounting.formatMoney((bids[bids.length - 1].length * bids[bids.length - 1].salary));
        }
        else {
            return "No Bids";
        }
    }
    handleTimerComplete = () => {
        this.setState({expired: true});
    }
    isRevokeBidDisabled = () => {
        if ((!this.props.bids || this.props.bids.length === 0) && !this.state.expired) {
            return true;
        }
        else if (this.props.bids[this.props.bids.length - 1].user === this.context.user.uid) {
            return false;
        }
        else {
            return true;
        }
    }
    render() {
        const bid = this.getCurrentBid();
        return(
                <Card>
                    <CardTitle
                        title={this.props.name.trim()}
                        subtitle={`${this.props.position}, ${this.props.team}`}
                    />
                    <CardContent>
                        <View style={styles.auctionInfo}>
                            <TimeCountdown
                                end={getExpireDateForGroup(this.props.group)}
                                onComplete={this.handleTimerComplete}
                            />
                            <View style={styles.leadBid}>
                                <Text style={GlobalStyles.text}>{this.state.expired ? "Winning" : "Current"} Bid: <Text style={styles.bold}>{bid}</Text></Text>
                            </View>
                        </View>
                        {!this.state.expired &&
                            <View>
                                <ContractLengthField
                                    onUpdate={this.handleUpdateContractLength}
                                />
                                <SalaryField
                                    onUpdate={this.handleUpdateSalary}
                                />
                                <View style={styles.totalDeal}>
                                    <Text style={GlobalStyles.text}>Total Deal Value: <Text style={GlobalStyles.bold}>{accounting.formatMoney(this.state.years * this.state.salary)}</Text></Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <RaisedTextButton
                                        title="Place Bid"
                                        onPress={this.onPlaceBid}
                                        color={Colors.green}
                                    />
                                    <RaisedTextButton
                                        title="Revoke Bid"
                                        disabled={this.isRevokeBidDisabled()}
                                        color={Colors.red}
                                        style={styles.revokeBidButton}
                                        onPress={this.onRevokeBid}
                                    />
                                </View>
                            </View>
                        }
                    </CardContent>
                </Card>
        );
    }
}
