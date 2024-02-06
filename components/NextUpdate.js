import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { storage } from '../Storage';




const NextUpdate = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [message,setMessage] = useState("")
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getMessage = async ()=>{
          const querySnapshot = await firestore()
                .collection('HomePageMessage')
                .get();
          const data = querySnapshot.docs.map(doc => ({
                i:doc.id,
                ...doc.data()
              }));
          console.log("Home page message",data[0].message);
          setMessage(data[0].message)
        }
        getMessage();
    },[])

  
  return (
    <View
      style={[styles.background,{borderRadius:10,backgroundColor:Colors.hashWhite,marginHorizontal:15,marginTop:5}]} >
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >{message}</Text>
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
