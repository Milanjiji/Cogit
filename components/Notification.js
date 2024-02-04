import React, { useEffect, useState } from 'react';
import notifee, { TimestampTrigger, TriggerType, TimeUnit, EventType } from '@notifee/react-native';
import BackgroundFetch from 'react-native-background-fetch';
import { storage } from '../Storage'; // Import your storage library
import messaging from '@react-native-firebase/messaging';
import Details from '../Screens/Details';


const NotificationComponent = () => {
  
  useEffect(()=>{
    console.log("Notifcation initilization statrted");

    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
    requestUserPermission();
    const fetchTriggeredNotifications = async ()=>{
      const token  = await messaging().getToken()
      console.log(token);

      const channelId = await notifee.createChannel({
        id:'default',
        name:'defaultChannel'
      })

      return notifee.onForegroundEvent(({type,detail})=>{
        switch(type){
          case EventType.DISMISSED:
            console.log("user Dissmissed notifcation",detail.notification);
            break;
          case EventType.PRESS:
            console.log("user Pressed Notifcation ",detail.notification);
            break;
        }
      })
    }
    fetchTriggeredNotifications()
  },[])

  messaging().onMessage(remote => {
    console.log("fcm message => ",remote);
  })

  return null;
};

export default NotificationComponent;
