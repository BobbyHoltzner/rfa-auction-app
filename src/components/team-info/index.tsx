import * as React from "react";
import PropTypes from "prop-types";
import {View, Text} from "react-native";
import Divider from "../divider";
const accounting = require("accounting");
const SALARY_CAP = 100000000;
import styles from "./styles";
import GlobalStyles from "../../util/styles/styles";

type Props = {
   navigation?: any
};

type State = {
    team?: {
        name: string,
        id: string,
        uid: string,
        salary: number,
        auctionSalary: number
    }
};

type Context = {
    user: any,
    firebaseDB: any
};


export default class Sidebar extends React.Component<Props, State> {
    context: Context;
    static contextTypes = {
        user: PropTypes.any,
        firebaseDB: PropTypes.any
    };
    constructor(props: Props) {
        super(props);
        this.state = {
            team: {
                name: "",
                id: "",
                uid: "",
                salary: null,
                auctionSalary: null
            }
        };
    }
    componentDidMount() {
        this.context.firebaseDB.bindToState(`teams/${this.context.user.uid}`, {
            context: this,
            state: "team",
            asArray: false
          });
    }
    render() {
        const {team} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.heading}>Team Information</Text>
                    <Text style={GlobalStyles.text}>Name: <Text style={GlobalStyles.bold}>{team.name ? team.name : "Loading..."}</Text></Text>
                    <Divider />
                    <Text style={GlobalStyles.text}>Salary Cap: <Text style={GlobalStyles.bold}>{accounting.formatMoney(SALARY_CAP)}</Text></Text>
                    <Divider />
                    <Text style={GlobalStyles.text}>Pre-Auction Salary: <Text style={GlobalStyles.bold}>{team.salary ? accounting.formatMoney(team.salary) : "Loading..."}</Text></Text>
                    <Divider />
                    <Text style={GlobalStyles.text}>Outstanding Salary: <Text style={GlobalStyles.bold}>{team.auctionSalary !== null ? accounting.formatMoney(team.auctionSalary) : "Loading..."}</Text></Text>
                    <Divider />
                    <Text style={GlobalStyles.text}>Salary Available: <Text style={GlobalStyles.bold}>{team.salary ? accounting.formatMoney(SALARY_CAP - (team.salary + team.auctionSalary)) : "Loading..."}</Text></Text>
                </View>
            </View>
        );
    }
}