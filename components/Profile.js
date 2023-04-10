import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from '../colors.json'

const Profile = () =>{
    const [userName,setuserName] = useState('')
    useEffect(()=>{
       const fetch = async () =>{
            const username = await AsyncStorage.getItem('UserName')
            console.log(username);
       }
       fetch();
        },[])
        return(
        <View style={styles.body} >
            <Text>hello</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    body:{
        backgroundColor:colors.white,
        borderRadius:10,
        marginTop:5
    }
})
export default Profile;