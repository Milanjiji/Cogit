import React, {useEffect, useState,useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet,TouchableWithoutFeedback} from 'react-native';
import Colors from '../colors.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faAngleRight, faDownload, faPause, faPlay, faRefresh, faSquare } from '@fortawesome/free-solid-svg-icons';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import TrackPlayer,{useTrackPlayerEvents} from 'react-native-track-player';
import SideBar from '../components/SideBar';


const FocusMode = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [btnColors,setBtnColors] = useState(["white","","#12156c"]);
  const [min,setMin] = useState(0);
  const [sec,setSec] = useState(0);
  const [running, setRunning] = useState(false);
  const padding = useSharedValue(20);
  const rotation = useSharedValue(0);
  const [rotateDeg,setRotateDeg] = useState(720);
  const [refresh,setRefresh] = useState(false);
  const [playing,setPlaying] = useState(false);
  const [currentTrack,setCurrentTrack] = useState('')

  const [songs,setSongs] = useState([
    {id:1,song:'1akxUUlBRo1gLJScImdgKUef2KnccZkeX'},
    {id:2,song:'1Xo4I6t2jTFVR6oqU4rcEjZypIAUTDQ86'},
    {id:3,song:'1hqk2jnDw-sQ2SMFljhw_XynQ5v8MQGVl'},
    {id:4,song:'1ldB7IV8HrTk09hTOxaiKWGXeJcp9K17p'}
  ])

  useTrackPlayerEvents(['playback-state'],async (states)=>{
    console.log(states.state,"te playbackstate");
    const queue = await TrackPlayer.getCurrentTrack();
    
    console.log(queue);
    if(states.state == "playing"){
      setRunning(true);
    }else if(states.state == "paused"){
      setRunning(false);
    }
  })

  const UpdateTrackInfo = async () =>{
    const trackNo = await TrackPlayer.getCurrentTrack();
    const allTracks = await TrackPlayer.getQueue();
    setCurrentTrack(allTracks[trackNo]);
    console.log(allTracks[trackNo]);
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      UpdateTrackInfo();
    }, 1000); 
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  

  const rotateStyle = useAnimatedStyle(() => {
    const rotate = interpolate(rotation.value, [0, 720], [0, 2 * Math.PI]);
    return {
      transform: [{ rotate: `${rotate}rad` }],
    };
  });
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
  // async function checkQueueForTracks() {
  //     const queue = await TrackPlayer.getQueue();
    
  //     if (queue.length > 0) {
  //       console.log('Tracks are in the queue:', queue);
  //     } else {
  //       console.log('No tracks in the queue.');
  //     }
  //   }
  //   checkQueueForTracks()
  },[])

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

  const Refresh = () =>{
      RotoateAnimation();
  }

  const paddingAnimatedStyle = useAnimatedStyle(()=>{
    return {
      padding: padding.value
    }
  })

  const play = async () =>{
    if(!playing){
      try {
        await TrackPlayer.play();
        setPlaying(true);
      } catch (error) {
        console.log("Error playing track:", error);
      }
    }else{
      try {
        await TrackPlayer.pause();
        setPlaying(false);
      } catch (error) {
        console.log("Error playing track:", error);
      }
    }
  }
  
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
          <View style={{flexDirection:'row',justifyContent: 'center',alignItems:'center',backgroundColor:Colors.hashWhite,borderRadius:10,marginHorizontal:10}} >
              <TouchableOpacity style={{justifyContent: 'center',alignItems:'center',width:'33%'}} >
                <FontAwesomeIcon icon={faAngleLeft} color={Colors.text} />
              </TouchableOpacity>

              <TouchableOpacity onPress={play} style={[{padding: 20,borderRadius:40,borderColor:Colors.text,width:'33%',alignItems:'center',justifyContent:'center'}]} >
                <FontAwesomeIcon size={30} color={Colors.text} icon={!running ? faPlay : faPause} />
              </TouchableOpacity>  

              <TouchableWithoutFeedback onPress={Refresh}  >
                <Animated.View style={[styles.iconContainer, rotateStyle,{width:'33%',justifyContent: 'center',alignItems:'center'}]}>
                  <FontAwesomeIcon icon={faAngleRight} color={Colors.text}   />
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
