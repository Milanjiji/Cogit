import defaultExport from "@react-native-firebase/firestore";
import React,{useState,useEffect,useRef} from "react";
import {View,Text, ScrollView} from 'react-native'
import GeneralSetting from "../components/GeneralSettings";
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreenSettings from "../components/HomePageSettings";
import NoteScreenSettings from "../components/NotesSettings";
import AiSettings from "../components/AiSettings";
import AccountSettings from "../components/AccountSettings";
import AboutTheApp from "../components/AboutTheApp";
import HelpAndSupport from "../components/HelpAndSupportSettings";
import UserDetails from "../components/UserDetails";

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
        <View style={{flex:1,backgroundColor:Colors.Background,paddingHorizontal:10}} >
            <Header navigation={navigation} title="Settings" info=""  />
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} >
                <UserDetails/>
                <GeneralSetting/>
                <HomeScreenSettings/>
                <NoteScreenSettings/>
                <AiSettings/>
                <AccountSettings navigation={navigation} />
                <HelpAndSupport/>
                <AboutTheApp navigation={navigation} />
                <View style={{height:50}} ></View>
            </ScrollView>
            <HomePageFootor navigation={navigation} />
        </View>
    );
}

export default Setting;