import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';


import Homepage from '../Screens/HomePage'
import Classification from "../Screens/Notes/Classification";
import Forum from "../Screens/Forum";
import GetStarted from "../Screens/GetStarted";
import Details from "../Screens/Details";
import NoteCreator from "../Screens/NoteCreator";
import Note_Classification from "../Screens/Note_Classification";
import FocusMode from "../Screens/FocusMode";
import Notes from "../Screens/Notes";
import Community from "../Screens/Community_Note";
import ArticleView from "../Screens/ArticleView";
import LoadingAnimation from "./LoadingAnimation";
import AllSet from "../Screens/AllSet";
import Setting from "../Screens/Settings";
import AddArticle from "../Screens/AddArticle";
import AboutUs from "../Screens/AboutUs";
import PrivacyPolicy from "./PrivacyAndPolicy";
import TermsCondition from "./TermsAndCondition";
import Brief from "../Screens/Notes/Briefly";
import BriefClassification from "../Screens/Notes/BrieflyClassification";
import DeepClassification from "../Screens/Notes/ChapterDeepClassification";
import DeepExplanation from "../Screens/Notes/ChapterDeep";
import Skills from "../Screens/Skills";
import PostSkill from "../Screens/PostSkills";
import ReCycle from "../Screens/ReCycle";
import VideoClass from "../Screens/Notes/VideoClass";
import VideoClassification from "../Screens/Notes/VideoClassification";
import LoadScreen from "../Screens/SplashScreen";
import TedEd from "../Screens/TedEd";
import OwnPosts from "../Screens/OwnPosts";
import LearnC from "../Screens/LearnC";
import CClass from "../Screens/LearnC/ChapterClassification";
import HelloWorld from "../Screens/LearnC/HelloWorld";
import Basics from "../Screens/LearnC/C++Basics";
import Variales from "../Screens/LearnC/Variables";
import UserInput from "../Screens/LearnC/UserInput";
import Operators from "../Screens/LearnC/Operators";
import Code from "../Screens/Code";
import Instruction from "../Screens/LearnC/Instruction";
import Strings from "../Screens/LearnC/Strings";
import Math from "../Screens/LearnC/Math";
import Booleans from "../Screens/LearnC/Booleans";
import Conditions from "../Screens/LearnC/Condition";
import Switch from "../Screens/LearnC/Switch";
import WhileLoop from "../Screens/LearnC/WhileLoop";
import ForLoop from "../Screens/LearnC/ForLoop";
import Array from "../Screens/LearnC/Array";
import Struct from "../Screens/LearnC/Structures";
import Pointers from "../Screens/LearnC/Pointers";
import Function from "../Screens/LearnC/Functions";
import Classes from "../Screens/LearnC/Class";
import VeryShortClassification from "../Screens/Notes/VeryShortClassification";
import VeryShort from "../Screens/Notes/VeryShort";
import Report from "../Screens/Report";
import TaskManager from "../Screens/TaskManager";






const Stack = createNativeStackNavigator();

enableScreens();
const Screens = () =>{
    return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash"  screenOptions={{headerShown:false,...TransitionPresets.FadeFromBottomAndroid}} >
        <Stack.Screen
            name="Splash" 
            component={LoadScreen} /> 
        
        <Stack.Screen
            name="Home" 
            component={Homepage} /> 
        <Stack.Screen
           name="getStarted" 
           component={GetStarted} />
            
          <Stack.Screen
           name="Details" 
           component={Details} />
          <Stack.Screen
           name="NoteCreator_Classification" 
           component={Note_Classification} />
          <Stack.Screen
           name="NoteCreator" 
           component={NoteCreator} />
          <Stack.Screen
           name="MathsClassification" 
           component={Classification} />
          
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
           name="Animation" 
           component={LoadingAnimation} /> 
           <Stack.Screen
           name="Allset" 
           component={AllSet} /> 
           <Stack.Screen
           name="Settings" 
           component={Setting} /> 
           
           <Stack.Screen
           name="AddArticle" 
           component={AddArticle} /> 
           
           <Stack.Screen
           name="AboutUs" 
           component={AboutUs} />
            <Stack.Screen
           name="Privacy" 
           component={PrivacyPolicy} /> 
          <Stack.Screen
           name="Terms" 
           component={TermsCondition} />
           <Stack.Screen
           name="Classification" 
           component={Classification} /> 
           <Stack.Screen
           name="BriefClassfication" 
           component={BriefClassification} />
           <Stack.Screen
           name="Brief" 
           component={Brief} />
           <Stack.Screen
           name="DeepClassfication" 
           component={DeepClassification} />
          <Stack.Screen
           name="Deep" 
           component={DeepExplanation} />
           <Stack.Screen
           name="Skills" 
           component={Skills} />
           <Stack.Screen
           name="PostSkills" 
           component={PostSkill} />
           <Stack.Screen
           name="ReCycle" 
           component={ReCycle} />
           
           <Stack.Screen
           name="VideoClassification" 
           component={VideoClassification} />
            <Stack.Screen
           name="VideoClass" 
           component={VideoClass} />
           <Stack.Screen
           name="TedEd" 
           component={TedEd} />
           <Stack.Screen
           name="OwnPosts" 
           component={OwnPosts} />
           <Stack.Screen
           name="LearnC" 
           component={LearnC} />

           <Stack.Screen
           name="ClassificationC" 
           component={CClass} />
           
           <Stack.Screen
           name="HelloWorld" 
           component={HelloWorld} />
           <Stack.Screen
           name="Basics" 
           component={Basics} />
           
           <Stack.Screen
           name="Variables" 
           component={Variales} />
           <Stack.Screen
           name="UserInput" 
           component={UserInput} />
           <Stack.Screen
           name="Operators" 
           component={Operators} />
           <Stack.Screen
           name="Code" 
           component={Code} />
           <Stack.Screen
           name="Instruction" 
           component={Instruction} />
           <Stack.Screen
           name="Strings" 
           component={Strings} />
           <Stack.Screen
           name="Math" 
           component={Math} />
           <Stack.Screen
           name="Booleans" 
           component={Booleans} />
           <Stack.Screen
           name="Conditions" 
           component={Conditions} />
           <Stack.Screen
           name="Switch" 
           component={Switch} />
           <Stack.Screen
           name="WhileLoop" 
           component={WhileLoop} />
           <Stack.Screen
           name="ForLoop" 
           component={ForLoop} />
           <Stack.Screen
           name="Array" 
           component={Array} />
           <Stack.Screen
           name="Struct" 
           component={Struct} />
           <Stack.Screen
           name="Pointer" 
           component={Pointers} />
           <Stack.Screen
           name="Function" 
           component={Function} />
           <Stack.Screen
           name="Class" 
           component={Classes} />
           <Stack.Screen
           name="VeryShortNoteClassification" 
           component={VeryShortClassification} />
           <Stack.Screen
           name="VeryShort" 
           component={VeryShort} />
           <Stack.Screen
           name="Report" 
           component={Report} />
           <Stack.Screen
           name="TaskManager" 
           component={TaskManager} />

  
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default Screens;


