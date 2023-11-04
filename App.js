import React, { useEffect } from 'react';

import Colors from './colors.json'
import Screens from './components/Screens';
import TrackPlayer from 'react-native-track-player';
import { TimerProvider } from './components/TimerContext'
import { storage } from './Storage';




const App = () => {


  useEffect(()=>{


    const setColors = async () =>{
      const data = JSON.stringify(Colors);
      // await AsyncStorage.setItem('Colors',data);
      storage.set('Colors',JSON.stringify(data))
    }
    const setInitialFocusTime = async ()=>{
      // await AsyncStorage.setItem('Focus',JSON.stringify({isFoucs:false,min:0,sec:0}))
      // console.log("setting Initial Foucs Time");
      storage.set('Focus',JSON.stringify({isFoucs:false,min:0,sec:0}))
    } 
    setInitialFocusTime();
    const getItem = async() =>{
      // const color = await AsyncStorage.getItem('Colors');
      const color = storage.getString('Colors')
      if(!color){
        setColors();
      }
    }
    getItem();
    
    return () => {
      TrackPlayer.reset();
    };
  },[])

  return (
    <TimerProvider>
      <Screens />
    </TimerProvider>
  );

}
// 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


export default App;
