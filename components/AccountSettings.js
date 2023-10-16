import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, FlatList,Dimensions } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faAngleUp, faArrowDownShortWide, faCheck, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const search = firestore().collection('Users');

const AccountSettings = ({navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [logOutSec,setLogOutSec] = useState(0);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

    },[])


  
    
    
   
    const logOut = () =>{
        setLogOutSec(logOutSec+1);
        if(logOutSec === 1){
            navigation.navigate('Details');
        }
    }
    
    return(
        <View style={{padding: 10,margin:3,borderRadius:10}}>

            <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20}} >Account</Text>

            <TouchableOpacity onPress={logOut} style={{marginTop:10}} >
                <View style={{}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Log Out</Text>
                    <Text style={{display:logOutSec === 1 ? 'flex' : 'none',color:Colors.text,fontFamily:Colors.Medium,marginTop:10}} >Are you sure want to log out{"\n"}Press again to log out</Text>
                </View>
            </TouchableOpacity>
        
        </View>
    );
}

const styles = StyleSheet.create({
    Top:{
        borderRadius:10,
        margin:3,
        padding: 10,
        
    },
    input:{
        borderRadius:10,
        paddingHorizontal:10,
        elevation:10,
        marginVertical:10
    },
    update:{
        elevation:10,
        alignSelf:'center',
        padding: 10,
        paddingHorizontal:30,
        borderRadius:10
    }
})

export default AccountSettings;
