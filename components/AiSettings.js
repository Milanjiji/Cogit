import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, FlatList,Dimensions } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";


const AiSettings = ({navigation}) =>{
    const [popup,setPopup] = useState(false);
    const [ai,setAi] = useState(false);
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
            const currentState = await AsyncStorage.getItem('Ai');
            const value = JSON.parse(currentState);
            setAi(value);

            const popupcurrentState = await AsyncStorage.getItem('popup');
            const popupvalue = JSON.parse(popupcurrentState);
            setPopup(popupvalue);
        }
        getDetails();
    },[])


    const ChangeAi = async() =>{
        setAi(!ai);
        
        try {
            const valueStringed = JSON.stringify(!ai)
            await AsyncStorage.setItem('Ai',valueStringed);
        } catch (error) {
            console.log(error);
        }
    }
    const ChangePopup = async() =>{
        setPopup(!popup);
        
        try {
            const valueStringed = JSON.stringify(!popup)
            await AsyncStorage.setItem('popup',valueStringed);
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <View style={{backgroundColor:Colors.primary,padding: 10,margin:3,borderRadius:10,elevation:10}}>
            <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20}} >Ai</Text>
            <TouchableOpacity onPress={ChangePopup} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Remove the popup everytime opens</Text>
                <FontAwesomeIcon style={{marginRight:10}} color={Colors.text} icon={popup ? faCheckSquare : faSquare} />
            </TouchableOpacity>

            <TouchableOpacity onPress={ChangeAi} >
                <View  style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Change Ai Model to textDavinci002 </Text>
                    <FontAwesomeIcon style={{marginRight:10}} color={Colors.text} icon={ai ? faCheckSquare : faSquare} />
                </View>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:13}} >Note: take much more time than older one but reduce internet usage</Text>

            </TouchableOpacity>
        
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

export default AiSettings;
