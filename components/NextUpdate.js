import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight} from '@fortawesome/free-solid-svg-icons';




const NextUpdate = ({navigation}) => {
  const [Colors,setColors] = useState([]);
   
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

  
  return (
    <View
      style={[styles.background,{borderRadius:10,backgroundColor:Colors.hashWhite,marginHorizontal:15}]} >
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >The next update include</Text>
        <View style={{marginHorizontal:10,marginVertical:10}} >
            <View style={{flexDirection:'row'}}  >
                <FontAwesomeIcon icon={faAngleRight} color={Colors.text} />
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10,fontSize:12}} >Ai: chatgpt integration</Text>
            </View>
            <View style={{flexDirection:'row',}}  >
                <FontAwesomeIcon icon={faAngleRight} color={Colors.text} />
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10,fontSize:12}} >Books: which is not on school curriculum</Text>
            </View>
        </View>
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginBottom:10,fontSize:12}}  >Note : This is not a stably maintained app due to some lack of resourse, so we cant currently say when will be the next update</Text>
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}}  >If you're ready to be part of something meaningful, seize this chance! Send us a message, and rest assured, we'll respond within a maximum of 0-4 days. Join our community of dedicated contributors and let's make a difference together!. (Msg for know more)</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('SendMessage')} style={{borderRadius:50,backgroundColor:Colors.secondary,elevation:10,padding:10,marginVertical:10}} >
            <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',fontSize:12}} >Send Message</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background:{
    flex:1,
    padding: 10,
    margin:10
  },
});

export default NextUpdate;
