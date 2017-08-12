import * as React from "react";
import { AppRegistry, AppState } from 'react-native';
import App from "./dist/App";
import codePush from "react-native-code-push";


let codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.IMMEDIATE,
    updateDialog: true
};

export default class RFAAuctionApp extends React.Component {
    codePushStatusDidChange(status) {
        switch (status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Code Push: Checking for updates.");
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Code Push: Downloading package.");
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Code Push: Installing update.");
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                console.log("Code Push: Up to date.");
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                console.log("Code Push: Update installed.");
                break;
        }
    }
    codePushDownloadDidProgress(progress) {
        console.log("Code Push: ", progress.receivedBytes + " of " + progress.totalBytes + " received.");
    }
    render() {
        return ( <App />
        );
    }
}
const CodePushWrapper = codePush(codePushOptions)(RFAAuctionApp);
AppRegistry.registerComponent('rfaAuctionApp', () => CodePushWrapper);