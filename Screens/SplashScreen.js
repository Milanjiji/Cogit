import React, { useEffect } from "react";
import {ImageBackground, View } from "react-native";
import logo from '../android/app/src/main/res/drawable/launch_screen.png'
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "react-native-splash-screen";

const LoadScreen = ({navigation}) =>{
    useEffect(()=>{
        const getAccInfo = async() =>{
            const name = JSON.parse(await AsyncStorage.getItem('userName'));
            console.log("on Splash screen");
            console.log(name);
            if(name){
                navigation.navigate('Home');
                SplashScreen.hide();
                console.log("Home");
            }else{
                navigation.navigate('getStarted');
                SplashScreen.hide();
                console.log("getStarted");
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