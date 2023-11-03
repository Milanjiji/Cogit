import React, { useEffect } from "react";
import {ImageBackground, View } from "react-native";
import logo from '../android/app/src/main/res/drawable/launch_screen.png'
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";
import { storage } from "../Storage";

const LoadScreen = ({navigation}) =>{
    useEffect(()=>{
        const getAccInfo = async() =>{
            const name = storage.getString('userName')
            console.log(name);
            if(name){
                navigation.navigate('Home');
                SplashScreen.hide();
                console.log("home");
            }else{
                navigation.navigate('getStarted');
                SplashScreen.hide();
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