import defaultExport from "@react-native-firebase/firestore";
import React,{useState,useEffect,useRef} from "react";
import {View,Text, ScrollView} from 'react-native'
import GeneralSetting from "../components/GeneralSettings";
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Setting = ({navigation,route}) =>{

    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

    return(
        <View style={{flex:1,backgroundColor:Colors.Background}} >
            <Header navigation={navigation} title="Settings" info=""  />
            <ScrollView style={{flex:1}} >
                <GeneralSetting/>
            </ScrollView>
            <HomePageFootor navigation={navigation} />
        </View>
    );
}

export default Setting;