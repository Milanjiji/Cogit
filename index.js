/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './App.js';
import {name as appName} from './app.json';
import { playBackService } from './service.js';
    // PushNotification.configure({
    //     onNotification: function (notification) {
    //         console.log("NOTIFICATION:", notification); 
    //       },
    //       requestPermissions: Platform.OS === 'ios'
    // });


AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playBackService);
let isSetUp = false;
if(!isSetUp){
    TrackPlayer.setupPlayer().then(()=>{
        isSetUp = true
        console.log("trackplayer initiliazed from app registery");
    })
}else{
    console.log("trackplayer already been initilaized form app registary");
}

