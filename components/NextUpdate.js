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
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >The next update include</Text>
        <View style={{marginHorizontal:10,marginVertical:10}} >
            <View style={{flexDirection:'row'}}  >
                <FontAwesomeIcon icon={faAngleRight} color={Colors.text} />
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10,fontSize:12}} >Ai: chatgpt integration.</Text>
            </View>
            <View style={{flexDirection:'row',}}  >
                <FontAwesomeIcon icon={faAngleRight} color={Colors.text} />
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10,fontSize:12}} >Books: which is not from school curriculum.</Text>
            </View>
            <View style={{flexDirection:'row',}}  >
                <FontAwesomeIcon icon={faAngleRight} color={Colors.text} />
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10,fontSize:12}} >Forum : Seperate server options.</Text>
            </View>
        </View>
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginBottom:10,fontSize:12}}  >Note : This is not a stably maintained app due to some lack of resourse, so we cant currently say when will be the next update</Text>
        
        
    </View>
  );
};

const styles = StyleSheet.create({
  background:{
    flex:1,
    padding: 15,
    margin:10,
    paddingRight:10
  },
});

export default NextUpdate;
