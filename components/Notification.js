import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

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
    }
    fetchTriggeredNotifications()
  },[])

  messaging().onMessage(remote => {
    console.log("fcm message => ",remote);
  })

  return null;
};

export default NotificationComponent;
