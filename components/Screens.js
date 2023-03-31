import React from "react";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Homepage from './HomePage'
import MathsNote10 from './Notes/Class10/Maths/MathsNote'
import FileSys from './FileSystem';
import Download from './Download';
import Model from './Notes/Model';
import SampleFetch from './SampleFetch';
import Classification from "./Notes/Class10/Maths/Classification";
import Ai from "./Ai";
import ChatScreen from "./ChatScreen";
import Chat from "./Chat/Chat";
import Login from "./Chat/Login";
import SignUp from "./Chat/SignUp";

import { firebase } from './Chat/Firebase';



const Stack = createNativeStackNavigator();


const Screens = () =>{
    return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName='SignUp' screenOptions={{headerShown:false}} >
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
  
            <Stack.Screen
            name="Fetch" 
            component={SampleFetch} 
            options={{ headerShown: false }}/>

            <Stack.Screen
            name="MathsClassification" 
            component={Classification} 
            options={{ headerShown: false }}/>

            <Stack.Screen
            name="Ai" 
            component={Ai} 
            options={{ headerShown: false }}/> 
            <Stack.Screen
            name="chatScreen" 
            component={ChatScreen} 
            options={{ headerShown: false }}/>  
            <Stack.Screen
            name="chat" 
            component={Chat} 
            options={{ headerShown: false }}/>  
             <Stack.Screen
            name="Login" 
            component={Login} 
            options={{ headerShown: false }}/> 
            <Stack.Screen
            name="SignUp" 
            component={SignUp} 
            options={{ headerShown: false }}/>  
  
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default Screens;