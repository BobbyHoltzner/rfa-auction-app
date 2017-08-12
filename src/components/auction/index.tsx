import * as React from "react";
import {FlatList} from "react-native";
import Auction from "./single";
import PropTypes from "prop-types";
import {getExpireDateForGroup} from "../../util/Dates";
const accounting = require("accounting");
const SALARY_CAP = 100000000;
import styles from "./styles";

type Props = {
    navigation?: any
};

type State = {
    auctions: any[],
    uid: string,
    team: {
        name: string,
        id: string,
        uid: string,
        salary: number,
        auctionSalary: number
    }
};

type Context = {
    firebaseDB: any,
    showError: (message: string) => void,
    user: any
};

export default class Auctions extends React.Component<Props, State> {
    context: Context;
    static contextTypes = {
        firebaseDB: PropTypes.any,
        showError: PropTypes.func,
        user: PropTypes.any
    };
    constructor(props: Props) {
        super(props);
        this.state = {
            auctions: [],
            uid: null,
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
        this.context.firebaseDB.syncState(`rfas`, {
            context: this,
            state: "auctions",
            asArray: true
        });
        this.context.firebaseDB.syncState(`teams/${this.context.user.uid}`, {
            context: this,
            state: "team",
            asArray: false
        });
        this.setState({uid: this.context.user.uid});
        this.props.navigation.setParams({team: this.state.team});
    }
    componentWillReceiveProps(nextProps: Props, nextContext: Context) {
        if (nextContext.user !== this.context.user && nextContext.user) {
            if (this.state.uid === null) {
                this.context.firebaseDB.syncState(`teams/${nextContext.user.uid}`, {
                    context: this,
                    state: "team",
                    asArray: false
                });
            }
            this.setState({uid: nextContext.user.uid});
        }
    }
    sortByGroup = (players: any[]) => {
        let groups = Object.create(null);
        let result = [];
        let expired = [];
        let active = [];
        let sorted = [];
        players.forEach((player, index) => {
            groups[player.group] = groups[player.group] || [];
            groups[player.group].push(player);
        });
        result = Object.keys(groups).reduce(function (r, k) {
            return r.concat(groups[k]);
        }, []);
        result.forEach((item, index) => {
            if (getExpireDateForGroup(item.group) < new Date().getTime()) {
                expired.push(item);
            }
            else {
                active.push(item);
                sorted.push(item);
            }
        });
        sorted = sorted.concat(expired);
        return sorted;
    }
    handleSubmitBid = (auction: any, bid: {length: number, salary: number}) => {
        this.validateBid(auction, bid);
    }
    handleRevokeBid = (auction: any) => {
        let {auctions} = this.state;
        let player =  auctions.filter((item) => item.name === auction.name)[0];
        let lead_bid = player.bids[player.bids.length - 1];
        if (lead_bid.user === this.context.user.uid) {
            player.bids.pop();
            this.setState({auctions}, () => this.getOutstandingSalary());
        }
    }
    validateBid = (auction: any, bid: {length: number, salary: number}) => {
        let {auctions} = this.state;
        const player = auctions.filter((single, index) => single.name === auction.name)[0];
        if (player.bids && player.bids.length > 0) {
            let lead_bid = player.bids[player.bids.length - 1];
            let lead_bid_total = lead_bid.length * lead_bid.salary;
            if (lead_bid_total < (bid.length * bid.salary)) {
                player.bids.push({...bid, user: this.context.user.uid});
                this.setState({auctions}, () => this.getOutstandingSalary());
            }
            else {
                this.context.showError(`Your bid is less than the previous bid, please enter a total bid higher than ${accounting.formatMoney(lead_bid_total)}`);
            }
        }
        else if ((this.state.team.auctionSalary + bid.salary + this.state.team.salary) > SALARY_CAP) {
            this.context.showError(`You don"t have enough available salary to make this bid.`);
        }
        else {
            player.bids = [];
            player.bids.push({...bid, user: this.context.user.uid});
            this.setState({auctions}, () => this.getOutstandingSalary());
        }
    }
    getOutstandingSalary = () => {
        let {auctions} = this.state;
        let outstandingMoney = 0;
        auctions.forEach((auction) => {
            if (auction.bids && auction.bids.length > 0) {
                let leading_bid = auction.bids[auction.bids.length - 1];
                if (leading_bid.user === this.context.user.uid) {
                    outstandingMoney += leading_bid.salary;
                }
            }
        });
        this.context.firebaseDB.update(`teams/${this.context.user.uid}`, {
            data: {auctionSalary: (outstandingMoney)},
            then (err) {
                if (err) {
                    console.log("Error:  ", err);
                }
            }
        });
    }
    _renderItem = ({item, index}) => {
        return (
            <Auction
                {...item}
                id={index}
                onPlaceBid={this.handleSubmitBid}
                onRevokeBid={this.handleRevokeBid}
            />
        );
    }
    render() {
        let groups = this.sortByGroup(this.state.auctions);
        return (
            <FlatList style={styles.container} data={groups} renderItem={this._renderItem} />
        );
    }
}
