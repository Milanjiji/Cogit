import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';




const UserDetails = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [clas,setClass] = useState('');
  const [email,setEmail] = useState('');
  const [school,setSchool] = useState('');
   
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getDetails = async() =>{
            const Name = await AsyncStorage.getItem('userName');
            setName(Name);
            const Phone = await AsyncStorage.getItem('phone');
            setPhone(Phone);
            const Clas = await AsyncStorage.getItem('class');
            setClass(Clas);
        }
        getDetails();
    },[])

  
  return (
    <View
      style={[styles.background,{borderRadius:10,backgroundColor:'#ffffff25'}]} >
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginVertical:10,fontSize:20}} >hello {name} </Text>
        <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Account Info</Text>
        <View style={{marginLeft:10,marginVertical:10}} >
            <View style={{flexDirection:'row',alignItems:'center'}} >
                <FontAwesomeIcon size={14}  icon={faPhone} color={Colors.text}  />
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >{phone}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}} >
                <FontAwesomeIcon size={14}  icon={faUser} color={Colors.text}  />
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >{clas}</Text>
            </View>
        </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
  background:{
    flex:1,
    padding: 10,
    marginHorizontal:5
  },
});

export default UserDetails;
