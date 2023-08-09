import React, {useEffect, useState,useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal,} from 'react-native';
import Colors from '../colors.json'
import Header from '../components/Header';
import HomePageFootor from '../components/HomePageFootor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SoundContext } from '../components/SoundContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';


const FocusMode = ({navigation}) => {
  const [bgm,setBGM] = useState(false);
  const [Colors,setColors] = useState([]);
  const [btnColors,setBtnColors] = useState(["white","","#12156c"]);
  const [min,setMin] = useState(0);
  const [sec,setSec] = useState(0);
  const [running, setRunning] = useState(false);
  const [note,setNote] = useState('Grab a pair of headphones and dive into deep focus\n if music do not started wait(uses internet)')
  const height = useSharedValue(250);
  const width = useSharedValue(250);
  const marginTop = useSharedValue(0);
  const [others,setOther] = useState(true);
  const padding = useSharedValue(20)


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
            }
        }
        getColors();
    },[])
  
  const sound = useContext(SoundContext);

  const playMusic = () => {
    
    setBGM(!bgm);
    if(bgm){
        sound.stop(() => {
          console.log('The sound has stopped');
        });
      setRunning(false);
      setOther(true)
    }else{ 
    sound.play((success) => {
      if (success) {
        console.log('The sound is playing');
        
      } else {
        console.log('Failed to play the sound');
        setNote('Failed to play the sound, may be the problem of network.')
      }
    });
      setNote('')
        setOther(false)
        setRunning(true)
    
    
  } 
  };
  

  const paddingAnimatedStyle = useAnimatedStyle(()=>{
    return {
      padding: padding.value
    }
  })
  
  return (
    <View
      style={styles.background} >
        
      
      <View style={styles.App} >
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginHorizontal:10}} >{note}</Text>
          <View style={{padding: 20,borderRadius:210,borderWidth:10,borderColor:btnColors[1],backgroundColor:btnColors[1]}} >
            <Animated.View style={[paddingAnimatedStyle,{padding: 20,borderRadius:180,borderWidth:10,borderColor:btnColors[0],backgroundColor:btnColors[0]}]} >
              <View 
                style={[styles.btn_Container,{backgroundColor:Colors.primary,height: 250,width:250}]} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:55}} >{min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}</Text>
              </View >
           </Animated.View>
          </View>
          
          
          
          
      
              <TouchableOpacity onPress={playMusic} style={[{backgroundColor:Colors.primary,padding: 20,borderRadius:40,elevation:10,borderColor:Colors.text}]} >
                <FontAwesomeIcon size={30} color={Colors.text} icon={!bgm ? faPlay : faPause} />
              </TouchableOpacity>  
      
        
      </View>
      { others ? 
        <HomePageFootor marginTop={true} navigation={navigation} />:
        '' 
      }
       

      
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
});

export default FocusMode;
