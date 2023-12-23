/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';
    // PushNotification.configure({
    //     onNotification: function (notification) {
    //         console.log("NOTIFICATION:", notification); 
    //       },
    //       requestPermissions: Platform.OS === 'ios'
    // });


AppRegistry.registerComponent(appName, () => App);


