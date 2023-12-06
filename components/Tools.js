import { faCake, faMessage, faPauseCircle,  faPlayCircle, faQuestion, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react'
import { View,Text, TouchableOpacity } from 'react-native'
import { storage } from '../Storage';
import TrackPlayer,{useTrackPlayerEvents} from 'react-native-track-player';
import randomMusic from '../assets/MusicLinks.json'
import { useTimer } from '../components/TimerContext';

const shuffleArray = (array)=> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


const Tools = ({navigation,colors}) =>{

    const [playback,setPlayBack] = useState(false);
    const [music,setMusic] = useState(false);
    const { seconds, isRunning, startTimer, stopTimer, resetTimer,minutes,studyTimer,intTimer, leftStudyTime,leftIntTime,State,setTimerStates,setMinutes,startTimerWithDelay} = useTimer();

    useEffect(()=>{
        const getMusicMode = async () =>{
            // console.log(randomMusic);
            const data = storage.getNumber('FocusModeMusic');
            // console.log(data);

            if(data == undefined){
                storage.set('FocusModeMusic',1)
                const queue = await TrackPlayer.getQueue();
                if(queue.length == 0){
                    console.log("music mode initial");
                    await TrackPlayer.add(shuffleArray(randomMusic));
                }else{
                    console.log(queue,"something in the queue... from initial mode");
                }

            }else{
                const queue = await TrackPlayer.getQueue();
                if(queue.length == 0){
                    if(data == 1){
                        console.log("music mode initial from not initial setup...");
                        await TrackPlayer.add(shuffleArray(randomMusic));
                    }else if(data == 2){
                        const track2 = [{
                              url: "https://cdn.pixabay.com/audio/2021/08/29/audio_4b2c695936.mp3", // Load media from the app bundle
                              title: 'rain music',
                              artist: 'artist 1',
                          }]
                        await TrackPlayer.add(track2);
                        console.log("music mode 2 rain music");
                    }else if(data == 3){
                        const track3 = [{
                              url: "https://drive.google.com/uc?id=13qJ3N68YpZKadSIs3o0JUBk4u1jLDUmI", // Load media from the app bundle
                              title: 'title 0',
                              artist: 'artist 0',
                          }]
                        await TrackPlayer.add(track3);
                        console.log("music mode 3 fire music");
                    }else if(data == 4){
                        const track4 = [{
                              url: "https://cdn.pixabay.com/audio/2022/10/14/audio_9939f792cb.mp3", // Load media from the app bundle
                              title: 'title 0',
                              artist: 'artist 0',
                          }]
                        await TrackPlayer.add(track4);
                        console.log("music mode 4 fire music");
                    }else if(data == 5){
                        const track5 = [{
                              url: "https://drive.google.com/uc?id=1aCZz0jyvlCtccP_OKWtStAzdJml7yAw-", // Load media from the app bundle
                              title: 'title 0',
                              artist: 'artist 0',
                          }]
                        await TrackPlayer.add(track5);
                        console.log("music mode 4 waves music");
                    }
                }else{
                    console.log(queue,"something in the queue from user mode ....");
                    setPlayBack(true)
                }
            }
        }
        getMusicMode();
    },[])

    useTrackPlayerEvents(['playback-state'],async (states)=>{
        console.log(states.state,"the playbackstate from homepage");
        const queue = await TrackPlayer.getCurrentTrack();
        
        console.log(queue);
        if(states.state == "playing"){
          console.log("state playing so starting timer:",states.state);
          startTimer();
          setMusic(true);
        }else if(states.state == "paused"){
          stopTimer();
          setMusic(false);
          console.log("state not playing so starting timer:",states.state);
        }else if(states.state == "connecting"){
          console.log("playback state is actually conecting ");
          setPlayBack(false);
        }else if(states.state == "ready"){
          console.log("playback state is ready");
          setPlayBack(true);
        }
      }) 

      const play = async () =>{
          if(!isRunning){
            try {
              await TrackPlayer.play();
            } catch (error) {
              console.log("Error playing track:", error);
            }
          }else{
            try {
              await TrackPlayer.pause();
            } catch (error) {
              console.log("Error playing track:", error);
            }
          }
        }
      
    
      


    

    return (
        <View style={{flexDirection:'row',marginHorizontal:20,marginVertical:5,justifyContent:'space-between'}} >
            <TouchableOpacity onPress={()=>navigation.navigate('Focus')} style={{justifyContent:'center',borderTopRightRadius:-20,borderTopLeftRadius:10,borderBottomRightRadius:-10,borderBottomLeftRadius:10,backgroundColor:'#7300e6',alignItems:'center'}} >
                <Text style={{transform: [{ rotate: '-90deg' }],color:colors.text,fontFamily:colors.Medium, alignItems:'center',justifyContent:'center',marginTop:-20}} >Focus Mode</Text>
                <TouchableOpacity onPress={play} style={{position:'absolute',bottom:10,flexDirection:'row',justifyContent:'space-around',alignItems:'center',backgroundColor:`${colors.primary}80`,padding: 5,borderRadius:5,elevation:10,opacity : playback ? 1 : 0.5}} >
                    <FontAwesomeIcon  icon={music ? faPauseCircle : faPlayCircle} size={20} color={colors.text} />
                    <Text style={{marginLeft:5,color:colors.text}} >{ music ? 'Pause' : 'Play' }</Text>
                </TouchableOpacity>
            </TouchableOpacity >
            <View style={{flex: 1,marginLeft:10}} >
                <TouchableOpacity onPress={()=>navigation.navigate('ClassificationC')} style={{backgroundColor:colors.primary,borderRadius:5,paddingLeft:10,paddingVertical:7,marginBottom:5}} >
                    <Text style={{color:colors.text,fontFamily:colors.Medium}} >Learn C++ <Text style={{fontFamily:'monospace'}} >// Hello world</Text></Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',flex: 1}} >
                    <TouchableOpacity onPress={()=>navigation.navigate('Forum')} style={{backgroundColor:colors.primary,paddingHorizontal: 10,paddingVertical:3,borderRadius:5,flex: 1,margin:5,paddingVertical:9,flexDirection:'row',alignItems:'center'}} >
                        <Text style={{color:colors.text,fontFamily:colors.Medium,fontSize:11,marginRight:20}} >Forum</Text>
                        <FontAwesomeIcon icon={faMessage} color={colors.text}   />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',flex: 1,justifyContent: 'space-around',}} >
                    <TouchableOpacity onPress={()=>navigation.navigate('ReCycle')} style={{backgroundColor:colors.primary,paddingHorizontal: 10,paddingVertical:3,borderRadius:5,flex: 1,margin:5,paddingVertical:9,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                        <Text style={{color:colors.text,fontFamily:colors.Medium,fontSize:11}} >Recycle</Text>
                        <FontAwesomeIcon icon={faTrash} color={colors.text}   />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('TedEd')} style={{backgroundColor:colors.primary,paddingHorizontal: 10,paddingVertical:3,borderRadius:5,flex: 1,margin:5,paddingVertical:9,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                        <Text style={{color:colors.text,fontFamily:colors.Medium,fontSize:11}} >Ted ED</Text>
                        <FontAwesomeIcon icon={faQuestion} color={colors.text}   />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Community')} style={{backgroundColor:colors.primary,borderRadius:5,paddingLeft:10,paddingVertical:7,marginTop:5}}  >
                    <Text style={{color:colors.text,fontFamily:colors.Medium}} >Community</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Tools