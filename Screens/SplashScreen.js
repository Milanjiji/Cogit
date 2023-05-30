import React,{useEffect,useState} from "react";
import { View,Text,Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import logo from '../assets/images/logo.png'

const Spalsh  = ({navigation}) =>{
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        
    },[])
    useEffect(() => {
        const fetchData = async () => {

          await new Promise(resolve => setTimeout(resolve, 500));

          const data = await AsyncStorage.getItem('userName');


          if (data) {
            navigation.navigate('Home');
          } else {
            navigation.navigate('getStarted');
          }
        }
        fetchData()
      }, []);
    return(
        <View style={{flex:1,justifyContent:'space-around',alignItems:'center',backgroundColor:Colors.Background}} >
            <Image source={logo} style={{width:100,height:100}} />

        </View>
    );
}

export default Spalsh