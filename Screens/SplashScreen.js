import React, { useEffect } from "react";
import {ImageBackground, View } from "react-native";
import logo from '../android/app/src/main/res/drawable/launch_screen.png'
import { storage } from "../Storage";

const LoadScreen = ({navigation}) =>{
    useEffect(()=>{
        const getAccInfo = async() =>{
            const name = storage.getString('userName');
            console.log(name,"name");
            if(name !== undefined ){
                if(name == "undefined"){
                    navigation.navigate('getStarted');
                }else{
                    navigation.navigate('Home');
                }
            }else{
                navigation.navigate('getStarted');
            }
        }
        getAccInfo();
    },[])
    
    return(
        <View style={{flex: 1,}} >
            <ImageBackground style={{width:'100%',height:'100%'}} source={logo} >
            </ImageBackground>
        </View>
    )
}
export default LoadScreen;