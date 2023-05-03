import React, {useEffect, useState} from 'react';
import {View, Text,Button, TouchableOpacity, StyleSheet, Modal,TouchableWithoutFeedback} from 'react-native';
import { useRingerMode, RINGER_MODE,} from 'react-native-ringer-mode';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from '../colors.json'
import Header from '../components/Header';
import HomePageFootor from '../components/HomePageFootor';
import { faBold, faGears } from '@fortawesome/free-solid-svg-icons';
import Sound from 'react-native-sound';

const modeText = {
  [RINGER_MODE.silent]: 'Silent',
  [RINGER_MODE.normal]: 'Normal',
  [RINGER_MODE.vibrate]: 'Vibrate',
};


const FocusMode = ({navigation}) => {
  const { mode, error, setMode } = useRingerMode();
  const [currentState,setCurrentState] = useState(false);
  const [bgm,setBGM] = useState(true);
  const [bgmConfig,setBGMConfig] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(()=>{
    setCurrentState(false);
    setMode(RINGER_MODE.normal);
    const sound = new Sound('https://drive.google.com/uc?id=', '', (error) => {
    if (error) {
      console.log('Error loading sound: ', error);
    } else {
      sound.play();
      console.log("playing");
    }
  });
  },[])
  
  const FocusModeToggler = () =>{
    if(currentState){
      setMode(RINGER_MODE.normal);
      setCurrentState(false);
    }else{
      setMode(RINGER_MODE.vibrate);
      setCurrentState(true);
    }
  }
  const BGM = () =>{
    if(bgm){
      setBGM(false);
    }else{
      setBGM(true);
    }
  }
  const BGMconfig = () =>{
    setBGMConfig(true);
  }
  const BGMSelector = () =>{
    setBGMConfig(false);
  }
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const handlePress = () => {
    setIsChecked(!isChecked);
  };
  



  return (
    <View style={styles.background} >
      {currentState ? '' : <Header title='Foucs Mode' info='ellipsis' pageSettings={BGMconfig} /> }
      
      
      <View style={styles.App} >
        
        <TouchableOpacity onPress={FocusModeToggler} style={styles.btn_Container} >
          <Text style={styles.btn} >{currentState ? 'Disable' :'Enable'}</Text>
        </TouchableOpacity>
        
          {currentState ? '' : 
          <TouchableOpacity onPress={BGM} style={styles.btn_Container_Option} >
            <Text style={styles.btn} >BGM</Text>
          </TouchableOpacity>
          }          
          
      </View>
      {currentState ? '' : <HomePageFootor navigation={navigation} /> }

      <Modal 
      visible={bgmConfig}
      transparent={true}
      animationType='fade'>
        <View style={styles.ModalBackground} >
         <View style={styles.Modal_Container} >
            <Text style={styles.BGMType} >BGM Type</Text>
            <TouchableOpacity onPress={BGMSelector} style={styles.soundType_Options} >
              <Text style={styles.soundType_Options_Text} >Lofi HipHop</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={BGMSelector} style={styles.soundType_Options} >
              <Text style={styles.soundType_Options_Text} >Sound of Fire Burning</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={BGMSelector} style={styles.soundType_Options} >
              <Text style={styles.soundType_Options_Text} >Sound of Water Fall</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={BGMSelector} style={styles.soundType_Options} >
              <Text style={styles.soundType_Options_Text} >Sound of Forest</Text>
            </TouchableOpacity>
         </View>
        </View>
      </Modal>
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
