import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faPhone} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import firestore from '@react-native-firebase/firestore';
import RenderPosts from './RenderPosts';



const UserDetails = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [clas,setClass] = useState('');
  const [timesOfRetry,setTimesOfRetry] = useState(0);
  const [data,setData] = useState([]);
  const [postCount,setPostCount] = useState(0);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getDetails = async() =>{
            const Name = JSON.parse(await AsyncStorage.getItem('userName'));
            setName(Name);
            console.log(Name);
            const Phone = JSON.parse(await AsyncStorage.getItem('phone'));
            setPhone(Phone);
            const Clas = JSON.parse(await AsyncStorage.getItem('class'));
            setClass(Clas);
        }
        getDetails();

    },[])
   
    const getPosts = async () =>{

      console.log("trying to get the posts",name);
      try {
        const querySnapshot = await firestore()
          .collection('Skills')
          .where('userName', '==', name)
          .get();
    
        const documentsInRange = [];
    
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          documentsInRange.push({
            Id: doc.id,
            ...data,
          });
        });
        
        console.log(documentsInRange)
        setData(documentsInRange);
        setTimesOfRetry(timesOfRetry+1);
        if(documentsInRange  == 0){
          setPostCount(0);
        }else{
          setPostCount(documentsInRange.length)
        }
      } catch (error) {
        console.error('Error fetching documents in range:', error);
      }

    }
    if(timesOfRetry < 2){
      getPosts();
    }
    
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
        <View style={{marginHorizontal:5,marginVertical:10}} >
          <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginBottom:10}} >Posts ({postCount})</Text>

          <FlatList
          data={data}
          keyExtractor={item => item.title}
          renderItem={ (i) => <RenderPosts item={i} />}
          />
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
