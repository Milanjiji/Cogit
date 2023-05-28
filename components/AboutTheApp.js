import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, FlatList,Dimensions } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faAngleRight, faAngleUp, faArrowDownShortWide, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const search = firestore().collection('Users');

const AboutTheApp = ({navigation}) =>{
    
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
        <View style={{backgroundColor:Colors.primary,padding: 10,margin:3,borderRadius:10,elevation:10}}>

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
