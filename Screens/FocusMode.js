import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet,Modal} from 'react-native';
import Colors from '../colors.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faAngleRight, faDownload, faMusic, faPause, faPlay, faRefresh, faSquare, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import TrackPlayer,{useTrackPlayerEvents} from 'react-native-track-player';
import SideBar from '../components/SideBar';
import { useTimer } from '../components/TimerContext';

const FocusMode = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [btnColors,setBtnColors] = useState(["white","","#12156c"]);
  const padding = useSharedValue(20);
  const [timer,setTimer] = useState(true);
  const [studyModal,setStudyModel] = useState(false);
  const [studyTime,setStudyTime] = useState(30);
  const [intModal,setIntModel] = useState(false);
  const [intTime,setIntTime] = useState(5);
  const [music,setMusic] = useState(true);
  const { seconds, isRunning, startTimer, stopTimer, resetTimer,minutes,studyTimer,intTimer, leftStudyTime,leftIntTime,State,setTimerStates} = useTimer();


  useEffect(()=>{
    const getColors = async()=>{
        const data = await AsyncStorage.getItem('Colors');
        const colors = JSON.parse(data);
        setColors(colors);
        
        if(colors.Background === "#2b1499"){
          setBtnColors(["#12156c50","#12156c30","#12156c40","#12156c10"])
        }else if(colors.Background === "#1a1a1a"){
          setBtnColors(["#ffffff50","#ffffff30","#1a1a1a40","#1a1a1a10"])
        }
    }
    getColors();

  },[])

  useTrackPlayerEvents(['playback-state'],async (states)=>{
    console.log(states.state,"the playbackstate");
    const queue = await TrackPlayer.getCurrentTrack();
    
    console.log(queue);
    if(states.state == "playing"){
      console.log("state playing so starting timer:",states.state);
      startTimer();
    }else if(states.state == "paused"){
      stopTimer();
      console.log("state not playing so starting timer:",states.state);
    }
  })

  useEffect(()=>{
    const addTrack = async () =>{
      const tracks = [
        {
            url: "https://drive.google.com/uc?id=1akxUUlBRo1gLJScImdgKUef2KnccZkeX", // Load media from the app bundle
            title: 'title 0',
            artist: 'artist 0',
        },
        {
            url: "https://drive.google.com/uc?id=1Xo4I6t2jTFVR6oqU4rcEjZypIAUTDQ86", // Load media from the app bundle
            title: 'title 1',
            artist: 'artis 1',
        },
        {
            url: "https://drive.google.com/uc?id=1hqk2jnDw-sQ2SMFljhw_XynQ5v8MQGVl", // Load media from the app bundle
            title: 'title 0',
            artist: 'artist 0',
        },
        {
            url: "https://drive.google.com/uc?id=1ldB7IV8HrTk09hTOxaiKWGXeJcp9K17p", // Load media from the app bundle
            title: 'title 1',
            artist: 'artis 1',
        }
      ]
      const queue = await TrackPlayer.getQueue();
      if(queue.length == 0){
      await TrackPlayer.add(tracks);
      }else{
        console.log("somthing in the quese");
      }

  }
  addTrack();

  },[])

    console.log('====================================');
      console.log(seconds,isRunning,minutes);
      console.log('====================================');

      useEffect(() => {
        if (seconds === 60) {
          stopTimer();
          resetTimer();
          startTimer();
          if(timer){
           
          }
        }
      }, [seconds]);
    
    if(isRunning){
      padding.value = withTiming(padding.value === 20 ? 40 : 20, {
        duration: 1800,
        easing: Easing.linear,
      });
    }
    
    
  const paddingAnimatedStyle = useAnimatedStyle(()=>{
    return {
      padding: padding.value
    }
  })

  const play = async () =>{
    if(music){
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
    }else{
      if(isRunning){
        stopTimer();
      }else{
        startTimer();
      }
    }
    
  }

  const reset = () =>{
    resetTimer();
  }

  const setTimerState = () =>{
    setTimer(!timer);
    setTimerStates(!timer)
  }

  
  return (
    <View
      style={[styles.background,{backgroundColor:Colors.Background,flexDirection:'row'}]} >
     {
      !isRunning? 
      <SideBar page="Focus" navigation={navigation} />  : ''
     }
      
      <View style={styles.App} >

      <Modal
            animationType="fade"
            transparent={true}
            visible={studyModal}
            onRequestClose={() => setStudyModel(false)}
          >
            <View style={{backgroundColor:'#00000070',flex: 1,justifyContent:'center',alignItems:'center'}} >
              <View style={{backgroundColor:Colors.Background,padding: 20,borderRadius:10,marginLeft:20}} >
                <TouchableOpacity onPress={()=>{setStudyTime(5);setStudyModel(false);studyTimer(5)}} style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10}} >
                  <Text style={{color:Colors.text}} >5 min</Text>
                </TouchableOpacity  >
                <TouchableOpacity onPress={()=>{setStudyTime(15);setStudyModel(false);studyTimer(15)}}   style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10,marginTop:10}} >
                  <Text style={{color:Colors.text}} >15 min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setStudyTime(30);setStudyModel(false);studyTimer(30)}}  style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10,marginTop:10}} >
                  <Text style={{color:Colors.text}} >30 min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setStudyTime(45);setStudyModel(false);studyTimer(45)}}  style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10,marginTop:10}} >
                  <Text style={{color:Colors.text}} >45 min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setStudyTime(50);setStudyModel(false);studyTimer(50)}}  style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10,marginTop:10}} >
                  <Text style={{color:Colors.text}} >50 min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setStudyModel(false)}}  style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10,marginTop:10,alignItems:'center'}} >
                  <Text style={{color:Colors.text}} >Close</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={intModal}
            onRequestClose={() => setIntModel(false)}
          >
            <View style={{backgroundColor:'#00000070',flex: 1,justifyContent:'center',alignItems:'center'}} >
              <View style={{backgroundColor:Colors.Background,padding: 20,borderRadius:10,marginLeft:20}} >
                <TouchableOpacity onPress={()=>{setIntTime(5);setIntModel(false);intTimer(1)}} style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10}} >
                  <Text style={{color:Colors.text}} >1 min</Text>
                </TouchableOpacity  >
                <TouchableOpacity onPress={()=>{setIntTime(5);setIntModel(false);intTimer(3)}}   style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10,marginTop:10}} >
                  <Text style={{color:Colors.text}} >3 min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setIntTime(5);setIntModel(false);intTimer(5)}}  style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10,marginTop:10}} >
                  <Text style={{color:Colors.text}} >5 min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setIntTime(5);setIntModel(false);intTimer(10)}}  style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10,marginTop:10}} >
                  <Text style={{color:Colors.text}} >10 min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setIntTime(5);setIntModel(false);intTimer(15)}}  style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10,marginTop:10}} >
                  <Text style={{color:Colors.text}} >15 min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setIntModel(false)}}  style={{padding: 10,backgroundColor:Colors.primary,borderRadius:10,marginTop:10,alignItems:'center'}} >
                  <Text style={{color:Colors.text}} >Close</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          </Modal>

          <View>

            <View style={{margin:10,backgroundColor:Colors.hashWhite,padding: 10,borderRadius:10,alignItems:'center',display:isRunning ? 'flex' :'none'}} >
                <Text  style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:30 ,display : timer ? 'flex' :'none'}} >{Math.floor( State ?  leftIntTime : leftStudyTime / 60)}:{State ?  leftIntTime : leftStudyTime % 60}</Text>
                <Text  style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:30,display : !timer ? 'flex' :'none'}} >00:00</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >remaining</Text>
            </View>

            <View style={{margin:10,backgroundColor:Colors.hashWhite,padding: 10,borderRadius:10,display:isRunning ? 'none' :'flex'}} >
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Timer</Text>
                <TouchableOpacity onPress={setTimerState} style={{alignItems:'center'}} >
                  <FontAwesomeIcon color={Colors.text} size={25} icon={timer ? faToggleOn : faToggleOff} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:Colors.secondary,padding: 10,marginVertical:10,borderRadius:10,opacity:timer ? 1 : 0.5}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Loop of </Text>
                <View style={{flexDirection:'row',alignItems:'center'}} >
                  <TouchableOpacity onPress={()=>setStudyModel(!studyModal)} style={{backgroundColor:Colors.Background,padding: 5,borderRadius:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >{studyTime}</Text>
                  </TouchableOpacity>
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium}} > min study</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}} >
                  <TouchableOpacity onPress={()=>setIntModel(!intModal)} style={{backgroundColor:Colors.Background,padding: 5,borderRadius:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >{intTime}</Text>
                  </TouchableOpacity>
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium}} > min intreval</Text>
                </View>
              </View>
            </View>
          </View>
          


          <View style={{padding: 20,borderRadius:210,borderWidth:10,borderColor:btnColors[1],backgroundColor:btnColors[1],marginTop:-20,justifyContent:'center',alignItems:'center',margin:10}} >
            <Animated.View style={[paddingAnimatedStyle,{padding: 20,borderRadius:180,borderWidth:10,borderColor:btnColors[0],backgroundColor:btnColors[0],justifyContent:'center',alignItems:'center'}]} >
              <View 
                style={[styles.btn_Container,{backgroundColor:Colors.primary,height: 250,width:250,justifyContent:'center',alignItems:'center'}]} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:55}} >{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
              </View >
           </Animated.View>
          </View>
          <View style={{flexDirection:'row',justifyContent: 'center',alignItems:'center',borderRadius:10,marginHorizontal:10}} >
              
              <TouchableOpacity onPress={reset} style={[{padding: 20,borderColor:Colors.text,width:'33%',alignItems:'center',justifyContent:'center',}]} >
                <FontAwesomeIcon  color={Colors.text} icon={faSquare} />
              </TouchableOpacity> 

              <TouchableOpacity onPress={play} style={[{padding: 20,borderColor:Colors.text,width:'33%',alignItems:'center',justifyContent:'center',backgroundColor:Colors.primary,elevation:10,borderRadius:40,marginRight:2.5}]} >
                <FontAwesomeIcon size={30} color={Colors.text} icon={!isRunning ? faPlay : faPause} />
              </TouchableOpacity> 

              <TouchableOpacity onPress={()=>setMusic(!music)} style={[{padding: 20,width:'33%',alignItems:'center',justifyContent:'center',display:isRunning ? 'none' : 'flex'}]} >
                <FontAwesomeIcon  color={music ? Colors.text : `${Colors.text}50`} icon={faMusic} />
              </TouchableOpacity> 
          </View>
        
      </View>
      
       

      
    </View>
  );
};

const styles = StyleSheet.create({
  background:{
    flex:1,
    backgroundColor:Colors.Background
  },
  App:{
    flex:1,
    justifyContent:'space-around',
  },
  btn:{
    color:Colors.white,
    fontFamily:Colors.ExtraBold,
    fontSize:20,
    alignSelf:'center',
    
  },
  btn_Container:{
    backgroundColor:Colors.primary,
    borderRadius:200,
    justifyContent:'space-around',
    alignItems:'center',
    elevation:50,
  },
  btn_Container_Option:{
    backgroundColor:Colors.primary,
    paddingVertical:10,
    paddingHorizontal:60,
    borderRadius:20,
    flexDirection:'row',
    alignItems:'center',
  },
  icon:{
    marginRight:-40,
    alignSelf:'flex-end'
  },
  ModalBackground:{
    backgroundColor:'#04103a99',
    flex:1,
    justifyContent:'space-around',
    alignItems:'center'
  },
  Modal_Container:{
    backgroundColor:Colors.Background,
    padding:10,
    borderRadius:10
  },
  BGMType:{
    textAlign:'center',
    fontFamily:Colors.Bold,
    color:Colors.white
  },
  soundType_Options:{
    backgroundColor:Colors.primary,
    marginVertical:5,
    borderRadius:10
  },
  soundType_Options_Text:{
    textAlign:'center',
    padding:10,
    color:Colors.white
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FocusMode;
