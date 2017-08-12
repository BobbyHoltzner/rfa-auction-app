import * as React from "react";
import {ActivityIndicator, View} from "react-native";
import styles from "./styles";

type Props = {
    show: boolean
};

const LoadingIndicator = (props: Props) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator
              animating={props.show}
              style={styles.indicator}
              size="large"
            />
        </View>
    );
};

export default LoadingIndicator;