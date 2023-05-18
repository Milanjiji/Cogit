import React from "react";
import { Settings, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Homepage from '../Screens/HomePage'
import Model from "../Screens/Notes/Model";
import Classification from "../Screens/Notes/Class10/Maths/Classification";
import Ai from "../Screens/Ai";
import Forum from "../Screens/Forum";
import GetStarted from "../Screens/GetStarted";
import Details from "../Screens/Details";
import NoteCreator from "../Screens/NoteCreator";
import Note_Classification from "../Screens/Note_Classification";
import FocusMode from "../Screens/FocusMode";
import Notes from "../Screens/Notes";
import Community from "../Screens/Community_Note";
import ArticleView from "../Screens/ArticleView";
import Missions from "../Screens/Missions";
import LoadingAnimation from "./LoadingAnimation";
import AllSet from "../Screens/AllSet";
import Setting from "../Screens/Settings";
import Events from "../Screens/Events";
import AddEvents from "../Screens/AddEvent";
import AddArticle from "../Screens/AddArticle";
import User from "../Screens/User";






const Stack = createNativeStackNavigator();


const Screens = () =>{
    return(
    <NavigationContainer>
        <Stack.Navigator  initialRouteName='User' screenOptions={{headerShown:false,animation:'none'}} >
          <Stack.Screen
           name="getStarted" 
           component={GetStarted} />

          <Stack.Screen
           name="Details" 
           component={Details} />

          <Stack.Screen
           name="Home" 
           component={Homepage} />
          

          <Stack.Screen
           name="NoteCreator_Classification" 
           component={Note_Classification} />
          
          <Stack.Screen
           name="NoteCreator" 
           component={NoteCreator} />

          <Stack.Screen
           name="Model" 
           component={Model} />


          <Stack.Screen
           name="MathsClassification" 
           component={Classification} />

          <Stack.Screen
           name="Ai" 
           component={Ai} />

          <Stack.Screen
           name="Forum" 
           component={Forum} />
            
          <Stack.Screen
           name="Focus" 
           component={FocusMode} />  
           <Stack.Screen
           name="Notes" 
           component={Notes} /> 
           <Stack.Screen
           name="Community" 
           component={Community} />
           <Stack.Screen
           name="ViewArticle" 
           component={ArticleView} /> 
           <Stack.Screen
           name="Missions" 
           component={Missions} />
           <Stack.Screen
           name="Animation" 
           component={LoadingAnimation} /> 
           <Stack.Screen
           name="Allset" 
           component={AllSet} /> 
           <Stack.Screen
           name="Settings" 
           component={Setting} /> 
           <Stack.Screen
           name="Events" 
           component={Events} /> 
           <Stack.Screen
           name="AddEvent" 
           component={AddEvents} /> 
           <Stack.Screen
           name="AddArticle" 
           component={AddArticle} /> 
           <Stack.Screen
           name="User" 
           component={User} /> 
  
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default Screens;


