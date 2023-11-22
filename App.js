import React, { useEffect } from 'react';
import Colors from './colors.json'
import Screens from './components/Screens';
import { TimerProvider } from './components/TimerContext'
import { storage } from './Storage';
import TrackPlayer from 'react-native-track-player';
import { playBackService } from './service.js';


const App = () => {
  useEffect(()=>{
    const setColors = async () =>{
      const data = JSON.stringify(Colors);
      storage.set('Colors',data)
    }
    const setInitialFocusTime = async ()=>{
      storage.set('Focus',JSON.stringify({isFoucs:false,min:0,sec:0}))
    } 
    setInitialFocusTime();
    const getItem = async() =>{
      const color = storage.getString('Colors')
      if(color == undefined){
        setColors();
      }
    }
    getItem();
    const initlizeTrackPlayer = () =>{
      const name = storage.getString('userName')
      if(name !== undefined){
        if(name !== "undefined")
        {
          TrackPlayer.registerPlaybackService(() => playBackService);
          let isSetUp = false;
          if(!isSetUp){
              TrackPlayer.setupPlayer().then(()=>{
                  isSetUp = true
                  console.log("trackplayer initiliazed from app registery");
              })
          }else{
              console.log("trackplayer already been initilaized form app registary");
          }
        }
        
      }else{
        console.log("trackplayer in the getting started");
      }
    }
    initlizeTrackPlayer();
    // return () => {
    //   TrackPlayer.restart();
    // };
  },[])

  return (
      <TimerProvider>
        <Screens />
      </TimerProvider>
  );

}
// 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


export default App;
