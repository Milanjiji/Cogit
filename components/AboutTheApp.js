import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, FlatList,Dimensions } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight} from "@fortawesome/free-solid-svg-icons";
import { storage } from "../Storage";

const search = firestore().collection('Users');

const AboutTheApp = ({navigation}) =>{
    
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
        <View style={{padding: 10,margin:3,borderRadius:10}}>

            <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20}} >About</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('AboutUs')} style={{flexDirection:'row',marginTop:10,justifyContent:'space-between',alignItems:'center'}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >About Us</Text>
                <FontAwesomeIcon style={{marginRight:10}} color={Colors.text} icon={faAngleRight} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>navigation.navigate('Privacy')} style={{flexDirection:'row',marginTop:10,justifyContent:'space-between',alignItems:'center'}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Privacy Policy</Text>
                <FontAwesomeIcon style={{marginRight:10}} color={Colors.text} icon={faAngleRight} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Terms')} style={{flexDirection:'row',marginTop:10,justifyContent:'space-between',alignItems:'center'}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Terms and Conditions</Text>
                <FontAwesomeIcon style={{marginRight:10}} color={Colors.text} icon={faAngleRight} />
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
    
})

export default AboutTheApp;
