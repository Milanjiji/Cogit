import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { storage } from '../Storage';




const NextUpdate = ({navigation}) => {
  const [Colors,setColors] = useState([]);
   
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

  
  return (
    <View
      style={[styles.background,{borderRadius:10,backgroundColor:Colors.hashWhite,marginHorizontal:15}]} >
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Dear users, we are excited to announce that until the next update, we are offering <Text style={{fontFamily:Colors.Bold,color:'#a64dff'}} >premium services for free for ever</Text> to all users who create new accounts. Feel free to share this news with others. Take advantage of this opportunity while it lasts!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background:{
    flex:1,
    padding: 15,
    margin:10,
    paddingRight:10,
    marginTop:0
  },
});

export default NextUpdate;
