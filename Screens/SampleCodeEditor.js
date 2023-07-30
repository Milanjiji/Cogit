import React, { useEffect, useRef,useState } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { WebView } from 'react-native-webview';

const CodeEditor = (props) => {
    
return (
    <View style={{borderRadius:10,overflow: 'hidden',}}>
      <Text style={{color:'white',textAlign:'center',marginBottom:5}} >Note: editing the code only can be done after the first run.</Text>
      <WebView
        source={{ uri: 'https://www.online-cpp.com/' }}
        style={{height:600,marginVertical:5}}
      />
      <Text style={{color:'white',textAlign:'center',marginBottom:5}} >Editor powered by W3school</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default CodeEditor;
