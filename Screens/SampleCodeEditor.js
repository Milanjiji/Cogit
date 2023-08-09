import React from 'react';
import { View,Text } from 'react-native';
import { WebView } from 'react-native-webview';

const CodeEditor = () => {
    
return (
    <View style={{borderRadius:10,overflow: 'hidden',}}>
     <WebView
        source={{ uri: 'https://www.online-cpp.com/' }}
        style={{height:600,marginVertical:5}}
      />
    </View>
  );
};


export default CodeEditor;
