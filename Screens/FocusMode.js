import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';


const FocusMode = () => {
  
  const [isMuted, setIsMuted] = useState(false);

  const handleMutePress = () => {
    setIsMuted(!isMuted);

    PushNotification.configure({
      sound: !isMuted,
      // other configuration options...
    });

    PushNotification.cancelAllLocalNotifications();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title={isMuted ? 'Unmute' : 'Mute'} onPress={handleMutePress} />
    </View>
  );
};

export default FocusMode;