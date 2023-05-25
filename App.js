import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button,DrawerLayoutAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './colors.json'

import Screens from './components/Screens';

const App = () => {

  useEffect(()=>{
    const clear =  async() =>{
      await AsyncStorage.clear();
    }
    const setColors = async () =>{
      const data = JSON.stringify(Colors);
      await AsyncStorage.setItem('Colors',data)
    }
    const getItem = async() =>{
      const color = await AsyncStorage.getItem('Colors');
      if(!color){
        setColors();
      }else{

      }
    }
    getItem();
    const setSettings = async () =>{
      const settings1 = await AsyncStorage.getItem('SmallIconStatus');
      const settings2 = await AsyncStorage.getItem('AchivementStatus');
      const settings3 = await AsyncStorage.getItem('NoteStatus');
      const settings4 = await AsyncStorage.getItem('BannerPosition');
      if(!settings1){
        await AsyncStorage.setItem('SmallIconStatus',JSON.stringify(false))
      }else if(!settings2){
        await AsyncStorage.setItem('AchivementStatus',JSON.stringify(false))
      }else if(!settings3){
        await AsyncStorage.setItem('NoteStatus',JSON.stringify(false))
      }else if(!settings4){
        await AsyncStorage.setItem('BannerPosition',JSON.stringify(false))
      }else{

      }
    }
    setSettings();
    // clear();
    
  },[])
  
  // return (
    
  //     <Screens />
  //     // <View>

  //     // </View>
  // );
  return  <Screens /> ;
}
// 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


export default App;
