import * as React from "react";
import {View, Text} from "react-native";
import GlobalStyles from "../../../util/styles/styles";

type Props = {
    end: any,
    onComplete: () => void
};

type State = {
    timerDisplay?: string
};

export default class TimeCountdown extends React.Component<Props, State> {
    _timer: any;
    constructor(props: Props) {
        super(props);
        this.state = {
            timerDisplay: null
        };
    }
    componentDidMount() {
        this._timer = setInterval(() => {
            const now = new Date().getTime();
            // Find the distance between now an the count down date
            const distance = this.props.end - now;
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.setState({timerDisplay: days + "d " + hours + "h " + minutes + "m " + seconds + "s"});
            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(this._timer);
                this.setState({timerDisplay: "Auction Expired!"});
                this.props.onComplete();
            }
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this._timer);
    }
    render() {
        return (
            <View>
                <Text style={GlobalStyles.text}>Time Remaining: <Text style={GlobalStyles.bold}>{this.state.timerDisplay}</Text></Text>
            </View>
        );
    }
}