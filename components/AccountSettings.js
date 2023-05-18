import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, FlatList,Dimensions } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import colors  from '../colors.json'
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AccountSettings = ({navigation}) =>{
    const [data,setData] = useState([]);

    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
            console.log("Colors => ",colors);
        }
        getColors();
        const getDetails = async() =>{
            const name = await AsyncStorage.getItem('userName');
            const email = await AsyncStorage.getItem('email');
            const password = await AsyncStorage.getItem('password');
            setData({
                name:name,
                email:email
            })
            console.log(name,email); 
        }
        getDetails();
    },[])

    
    return(
        <View style={{backgroundColor:Colors.Background,flex: 1,}}  >
            <Header navigation={navigation} title="cogit" info="ellipsis" />
                <View style={[styles.Top,{backgroundColor:Colors.primary}]} >
                    <Text>hello</Text>
                </View>
            <HomePageFootor navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    Top:{
        borderRadius:10,
        margin:3,
        padding: 10,
        
    }
})

export default AccountSettings;
