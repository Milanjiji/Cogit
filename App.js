import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button,DrawerLayoutAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './colors.json'

import Screens from './components/Screens';

const App = () => {

  useEffect(()=>{
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
    
    
    
  },[])
  
  return (
      <Screens />
      // <View>

      // </View>
  );
}
// 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


export default App;
