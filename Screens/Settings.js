import React,{useState,useEffect,} from "react";
import {View,Text, ScrollView} from 'react-native'
import GeneralSetting from "../components/GeneralSettings";
import AccountSettings from "../components/AccountSettings";
import AboutTheApp from "../components/AboutTheApp";
import HelpAndSupport from "../components/HelpAndSupportSettings";
import UserDetails from "../components/UserDetails";
import SideBar from "../components/SideBar";
import { storage } from "../Storage";


const Setting = ({navigation,route}) =>{

    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        
    },[])

    return(
        <View style={{flex:1,backgroundColor:Colors.Background,flexDirection:'row'}} >
            <SideBar navigation={navigation} page={"Settings"} />
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,marginLeft:10,marginRight:10}} >
                <Text style={{color:`${Colors.text}50`,fontFamily:Colors.Bold,textAlign:'center',padding: 20,fontSize:40}} >Settings</Text>
                <UserDetails/>
                <GeneralSetting/>
                <AccountSettings navigation={navigation} />
                <HelpAndSupport/>
                <AboutTheApp navigation={navigation} />
            </ScrollView>
        </View>
    );
}

export default Setting;