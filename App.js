import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Homepage from './components/HomePage'
import MathsNote10 from './components/Notes/Class10/MathsNote'
import FileSys from './components/FileSystem';
import Download from './components/Download';
import Model from './components/Notes/Model';

const Stack = createNativeStackNavigator();

const App = () => {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MathsNote10' >
        <Stack.Screen
          name="Home" 
          component={Homepage} 
          options={{ headerShown: false }}/>
          
          <Stack.Screen
          name="MathsNote10" 
          component={MathsNote10} 
          options={{ headerShown: false }}/>

          <Stack.Screen
          name="File" 
          component={FileSys} 
          options={{ headerShown: true }}/>

          <Stack.Screen
          name="Download" 
          component={Download} 
          options={{ headerShown: true }}/>

          <Stack.Screen
          name="Model" 
          component={Model} 
          options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
