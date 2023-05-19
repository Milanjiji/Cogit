import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBookOpen, faMessage, faNoteSticky, faTrophy } from "@fortawesome/free-solid-svg-icons";
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
           <TouchableOpacity onPress={()=>jump('Notes')} style={[styles.btn_container,{backgroundColor:Colors.primary}]} >
                <FontAwesomeIcon size={30} sytle={styles.btn_Icon} icon={faBookOpen} color={Colors.text} />
           </TouchableOpacity>
           
           <TouchableOpacity onPress={()=>jump('NoteCreator_Classification')} style={[styles.btn_container,{backgroundColor:Colors.primary}]} >
                <FontAwesomeIcon size={30} sytle={styles.btn_Icon} icon={faNoteSticky} color={Colors.text} />
           </TouchableOpacity>

           <TouchableOpacity onPress={()=>jump('Missions')}style={[styles.btn_container,{backgroundColor:Colors.primary}]} >
                <FontAwesomeIcon size={30} sytle={styles.btn_Icon} icon={faTrophy} color={Colors.text} />
           </TouchableOpacity>

           <TouchableOpacity onPress={()=>jump('Forum')} style={[styles.btn_container,{backgroundColor:Colors.primary}]} >
                <FontAwesomeIcon size={30} sytle={styles.btn_Icon} icon={faMessage} color={Colors.text} />
           </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    body:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginVertical:5,
        marginTop:5
    },
    btn_container:{
        backgroundColor:Colors.primary,
        padding:14,
        borderRadius:10,
        elevation:10
    }
})

export default PrevSection;