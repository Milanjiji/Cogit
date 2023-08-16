import React, {useEffect, useState,useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet,TouchableWithoutFeedback} from 'react-native';
import Colors from '../colors.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SoundContext } from '../components/SoundContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDownload, faPause, faPlay, faRefresh } from '@fortawesome/free-solid-svg-icons';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

import SideBar from '../components/SideBar';


const FocusMode = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [btnColors,setBtnColors] = useState(["white","","#12156c"]);
  const [min,setMin] = useState(0);
  const [sec,setSec] = useState(0);
  const [running, setRunning] = useState(false);
  const padding = useSharedValue(20);
  const rotation = useSharedValue(0);
  const [audioPaused, setAudioPaused] = useState(false); 
  const [start,setStart] = useState(true);
  const [rotateDeg,setRotateDeg] = useState(720);
  const [refresh,setRefresh] = useState(false);
  
  const rotateStyle = useAnimatedStyle(() => {
    const rotate = interpolate(rotation.value, [0, 720], [0, 2 * Math.PI]);
    return {
      transform: [{ rotate: `${rotate}rad` }],
    };
  });

  const RotoateAnimation = () =>{
    setRefresh(true)
    setRotateDeg(rotateDeg + 720)
    rotation.value = withTiming(rotateDeg, {
      duration: 1000,
      easing: Easing.linear,
    });
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }

    useEffect(() => {
      let intervalId;
      if (running) {
        intervalId = setInterval(() => {
          setSec(prevTime => prevTime + 1);
          
        }, 1000);
      }
      return () => clearInterval(intervalId);
    }, [running]);

    if(sec == 60){
      setSec(0);
      setMin(min+1)
    }
    if(running){
      padding.value = withTiming(padding.value === 20 ? 40 : 20, {
        duration: 1800,
        easing: Easing.linear,
      });
    }
    
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
  
  const sound = useContext(SoundContext);

  const playMusic = () => {
    console.log("playing mustc");
    if(start){
      console.log("playing from tp");
      sound.play();
      setRunning(true);
      setStart(false);
      setAudioPaused(false);
    }else{
        if (audioPaused) {
          sound.play();
          setRunning(true);
          setAudioPaused(false); 
          console.log("after paused forst play");
        } else {
          sound.pause();
          setRunning(false);
          setAudioPaused(true); 
          console.log("paused");
        }
      }
    
  };
  
  const Refresh = () =>{
      RotoateAnimation();
  }

  const paddingAnimatedStyle = useAnimatedStyle(()=>{
    return {
      padding: padding.value
    }
  })
  
  return (
    <View
      style={[styles.background,{backgroundColor:Colors.Background,flexDirection:'row'}]} >
     {
      !running ? 
      <SideBar page="Focus" navigation={navigation} />  : ''
     }
      
      <View style={styles.App} >
          <View style={{padding: 20,borderRadius:210,borderWidth:10,borderColor:btnColors[1],backgroundColor:btnColors[1]}} >
            <Animated.View style={[paddingAnimatedStyle,{padding: 20,borderRadius:180,borderWidth:10,borderColor:btnColors[0],backgroundColor:btnColors[0]}]} >
              <View 
                style={[styles.btn_Container,{backgroundColor:Colors.primary,height: 250,width:250}]} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:55}} >{min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}</Text>
              </View >
           </Animated.View>
          </View>
          <View style={{flexDirection:'row',justifyContent: 'center',alignItems:'center'}} >
              <TouchableOpacity style={{justifyContent: 'center',alignItems:'center',width:'33%'}} >
                <FontAwesomeIcon icon={faDownload} color={`${Colors.text}50`} />
                <Text>Downloading</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={playMusic} style={[{padding: 20,borderRadius:40,borderColor:Colors.text,width:'33%',alignItems:'center',justifyContent:'center'}]} >
                <FontAwesomeIcon size={30} color={Colors.text} icon={!running ? faPlay : faPause} />
              </TouchableOpacity>  

              <TouchableWithoutFeedback onPress={Refresh}  >
                <Animated.View style={[styles.iconContainer, rotateStyle,{width:'33%',justifyContent: 'center',alignItems:'center'}]}>
                  <FontAwesomeIcon icon={faRefresh} color={refresh ? `${Colors.text}` : `${Colors.text}50`}   />
                </Animated.View>
              </TouchableWithoutFeedback>
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
    alignItems:'center'
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
