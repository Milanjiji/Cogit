import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './colors.json'
import Screens from './components/Screens';
import TrackPlayer,{Capability} from 'react-native-track-player';

const App = () => {

  useEffect(()=>{
    

    const setColors = async () =>{
      const data = JSON.stringify(Colors);
      await AsyncStorage.setItem('Colors',data);
    }
    const setInitialFocusTime = async ()=>{
      await AsyncStorage.setItem('Focus',JSON.stringify({isFoucs:false,min:0,sec:0}))
      console.log("setting Initial Foucs Time");
    }
    setInitialFocusTime();
    const getItem = async() =>{
      const color = await AsyncStorage.getItem('Colors');
      if(!color){
        setColors();
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
    // mobileAds()
    // .initialize()
    // .then(adapterStatuses => {
    //   // console.log("admob Initialization Complete , adapter Status: ", adapterStatuses);
    //   // "react-native-svg": "^13.8.0"
    // });
  },[])
  useEffect(() => {
    return () => {
      TrackPlayer.reset();
    };
  }, []);
  
  return  <Screens /> ;
}
// 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


export default App;
