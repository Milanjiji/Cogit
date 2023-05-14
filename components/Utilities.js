import React,{useState,useEffect} from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Colors from '../colors.json'
import { faClock, faNoteSticky } from "@fortawesome/free-regular-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Utilities = ({navigation}) =>{

    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
            console.log("Colors => ",colors);
        }
        getColors();
    },[])

    return(
        <View style={styles.body} >
            <View style={styles.utility_align_container_1} >
                <TouchableOpacity onPress={()=>navigation.navigate('Focus')} style={[styles.container,{backgroundColor:Colors.primary}]} >
                    <FontAwesomeIcon size={30} color={Colors.text} icon={faClock} />
                    <Text style={[styles.text,{color:Colors.text}]} >Focus Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('NoteCreator_Classification')} style={[styles.container,{backgroundColor:Colors.primary}]} >
                    <FontAwesomeIcon size={30} color={Colors.text} icon={faNoteSticky} />
                    <Text style={[styles.text,{color:Colors.text}]} >Notes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles=  StyleSheet.create({
    body:{
        margin:3,
        borderRadius:10,
        marginRight:100,
        width:110
    },
    title:{
        marginTop:10,
        marginLeft:10,
        fontFamily:Colors.ExtraBold
    },
    utility_align_container_1:{
        justifyContent:'space-around',
        padding:5
    },
    container:{
        alignItems:'center',
        justifyContent:'center',
        padding:15,
        borderRadius:10,
        width:100,
        height:100,
        marginVertical:10,
        elevation:10
    },
    text:{
        padding:6,
        fontFamily:Colors.ExtraBold,
        textAlign:'center'
    }
})
export default Utilities;