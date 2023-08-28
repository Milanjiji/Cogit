import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet,TextInput, ScrollView,KeyboardAvoidingView, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer,{playbackState} from 'react-native-track-player';
import SplashScreen from "react-native-splash-screen";
import { setUpPlayer } from "../service";


const TrackPlayerDemo = ({navigation,route}) =>{
    const [Colors,setColors] = useState([])
    useEffect(()=>{
        
        const getColors = async()=>{
            SplashScreen.hide();
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
            
            

        }
        getColors();
        const addTrack = async () =>{
            const track2 = {
                url: "https://drive.google.com/uc?id=10YyAB7jvmbGAOvyhBGo7YKuFLkkjV_sF", // Load media from the app bundle
                title: 'Coelacanth I',
                artist: 'deadmau5',
            };

            const queue = await TrackPlayer.getQueue();

            if(queue.length == 0){
            await TrackPlayer.add(track2);
            }else{
              console.log("somthing in the quese",queue);
            }

        }
        addTrack();
        async function checkQueueForTracks() {
            const queue = await TrackPlayer.getQueue();
          
            if (queue.length > 0) {
              console.log('Tracks are in the queue:', queue);
            } else {
              console.log('No tracks in the queue.');
            }
            // await TrackPlayer.reset(); // Clears the entire queue
            // console.log('Queue cleared.');
          }
          checkQueueForTracks()

    },[])
    const playMusic = async() =>{
        if (playbackState === TrackPlayer.STATE_PLAYING) {
            try {
              await TrackPlayer.play();
              console.log("Playing track.");
            } catch (error) {
              console.log("Error playing track:", error);
            }
          } else {
            console.log("Audio focus not granted.");
          }
    }
    

    return(
        <View>
            <Button onPress={playMusic} title="Press to play" />
        </View>
    )
}

export default TrackPlayerDemo;