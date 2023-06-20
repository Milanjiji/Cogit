import React, {useEffect, useState,useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal,} from 'react-native';
import Colors from '../colors.json'
import Header from '../components/Header';
import HomePageFootor from '../components/HomePageFootor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SoundContext } from '../components/SoundContext';




const FocusMode = ({navigation}) => {
  const [currentState,setCurrentState] = useState(false);
  const [bgm,setBGM] = useState(true);
  const [bgmConfig,setBGMConfig] = useState(false);
  const [sounds,setSound] = useState('10YyAB7jvmbGAOvyhBGo7YKuFLkkjV_sF');
  const [Colors,setColors] = useState([]);
    
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])
  
  useEffect(()=>{
    setCurrentState(false);
   
  },[])
  
  
  const sound = useContext(SoundContext);

  const playMusic = () => {
    // sound.play((success) => {
    //   if (success) {
    //     console.log('The sound is playing');
    //   } else {
    //     console.log('Failed to play the sound');
    //   }
    // });
    const soundUrl = 'https://drive.google.com/uc?id=1Ku2G8uVCyN1g_-MhFRlqW3LMnRpQIQsQ'; // Change the URL here
    sound.release(); // Release the current sound instance
    sound.init(soundUrl, '', (error) => {
      if (error) {
        console.log('Error loading sound: ', error);
      } else {
        sound.play((success) => {
          if (success) {
            console.log('The sound is playing');
          } else {
            console.log('Failed to play the sound');
          }
        });
      }
    });
  };
  const stopMusic = () => {
    if (sound) {
      sound.stop(() => {
        console.log('The sound has stopped');
      });
    }
  };
 
  
  // const BGMconfig = () =>{
  //   setBGMConfig(true);
  // }
//   const BGMSelector = (type) =>{
//     setBGMConfig(false);
//     if(type === 1){
//       setSound('10YyAB7jvmbGAOvyhBGo7YKuFLkkjV_sF');
//       console.log(`https://drive.google.com/uc?id=10YyAB7jvmbGAOvyhBGo7YKuFLkkjV_sF`);
//     }else if(type === 2){
//       setSound('1Ku2G8uVCyN1g_-MhFRlqW3LMnRpQIQsQ');
//       console.log(`https://drive.google.com/uc?id=1Ku2G8uVCyN1g_-MhFRlqW3LMnRpQIQsQ`);
//     }
//   }
// ;
  



  return (
    <View style={[styles.background,{backgroundColor:Colors.Background}]} >
      {currentState ? '' : <Header navigation={navigation} title='Foucs Mode' info='ellipsis'  /> }
      
      
      <View style={styles.App} >
        
        <TouchableOpacity onPress={playMusic} style={[styles.btn_Container,{backgroundColor:Colors.primary}]} >
          <Text style={[styles.btn,{color:Colors.text}]} >{currentState ? 'Disable' :'Enable'}</Text>
        </TouchableOpacity>

        <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >
          Use headphones for better experience
        </Text>
        
          {/* {currentState ? '' : 
          <TouchableOpacity onPress={stopMusic} style={styles.btn_Container_Option} >
            <Text style={[styles.btn,{color:bgm ? Colors.text : 'red'}]} >BGM</Text>
          </TouchableOpacity>
          }           */}
          
      </View>
      {currentState ? '' : <HomePageFootor navigation={navigation} /> }

      {/* <Modal 
      visible={bgmConfig}
      transparent={true}
      animationType='fade'>
        <View style={styles.ModalBackground} >
         <View style={styles.Modal_Container} >
            <Text style={styles.BGMType} >BGM Type</Text>
            <TouchableOpacity onPress={()=>BGMSelector(1)} style={styles.soundType_Options} >
              <Text style={styles.soundType_Options_Text} >Lofi HipHop</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>BGMSelector(2)} style={styles.soundType_Options} >
              <Text style={styles.soundType_Options_Text} >Sound of Fire Burning</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>BGMSelector(1)} style={styles.soundType_Options} >
              <Text style={styles.soundType_Options_Text} >Sound of Water Fall</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>BGMSelector(1)} style={styles.soundType_Options} >
              <Text style={styles.soundType_Options_Text} >Sound of Forest</Text>
            </TouchableOpacity>
         </View>
        </View>
      </Modal> */}
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
    justifyContent:'space-evenly',
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
    width:200,
    height:200,
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
