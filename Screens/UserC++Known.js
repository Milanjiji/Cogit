import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Colors from '../colors.json'
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';



const UsersKnownC = ({navigation}) => {
  const [Colors,setColors] = useState([]);
    
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        const getStage = async() =>{
            const stage = JSON.parse(await AsyncStorage.getItem('LevelC'));
            if(stage !== null){
                navigation.navigate('LearnC')
            }
        }
        getStage();
    },[]);

    const setLevel = async(level) =>{
        console.log(level);
        await AsyncStorage.setItem('LevelC',JSON.stringify(level));
        navigation.navigate('LearnC');
    }

  return (
    <View
      style={{backgroundColor:Colors.Background,flex: 1,}} >
          <Header navigation={navigation} title='Foucs Mode' info=''  />    
        <View style={{padding: 10,flex: 1,}} >
            <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >How well do you know C++?</Text>
            <TouchableOpacity onPress={()=>setLevel(0)} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,flex: 1,marginVertical:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Dont know any thing.</Text>
                <View style={{backgroundColor:Colors.primary,flex: 1,justifyContent: 'center',borderRadius:10,elevation:10,margin:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold,alignSelf:'center',verticalAlign:'middle'}}  >beginner</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setLevel(1)} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,flex: 1,marginVertical:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >I Know some basics</Text>
                <View style={{backgroundColor:Colors.primary,flex: 1,justifyContent: 'center',borderRadius:10,elevation:10,margin:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold,alignSelf:'center',verticalAlign:'middle'}}  >Intermediate</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setLevel(2)} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,flex: 1,marginVertical:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >I Know most of it.</Text>
                <View style={{backgroundColor:Colors.primary,flex: 1,justifyContent: 'center',borderRadius:10,elevation:10,margin:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold,alignSelf:'center',verticalAlign:'middle'}}  >Expert</Text>
                </View>
            </TouchableOpacity>
            
        </View>

    </View>
  );
};



export default UsersKnownC;
