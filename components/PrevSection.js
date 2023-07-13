import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight, faBookOpen, faMessage, faNoteSticky, faTrophy } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from '../colors.json'

const PrevSection = ({navigation}) =>{
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

    const jump = (place) =>{
        navigation.navigate(place)
    }


    return(
        <View style={styles.body} >
           <TouchableOpacity onPress={()=>jump('Notes')} style={[styles.btn_container]} >
                <Text style={{color:Colors.white,fontFamily:Colors.Medium}} >Last Session</Text>
                <FontAwesomeIcon color={Colors.text} icon={faAngleRight} />
           </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    body:{
        marginVertical:5,
        marginTop:5,
        marginHorizontal:15
    },
    btn_container:{
        padding:14,
        marginHorizontal:9,
        borderBottomColor:Colors.white,
        borderBottomWidth:1,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    }
})

export default PrevSection;