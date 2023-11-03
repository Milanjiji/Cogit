import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity } from "react-native";
import { useTimer } from '../components/TimerContext';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { storage } from "../Storage";


const Timer = () =>{
    const [Colors,setColors] = useState([]);
    const {  isRunning,leftStudyTime,leftIntTime,State,resetTimer,stopTimer } = useTimer();

    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

    const reset  = () =>{
        stopTimer()
        resetTimer();
    }

    return(
        <View style={{backgroundColor:'#ffffff50',borderRadius:10,margin:5,padding: 5,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,display:isRunning ? 'flex' : 'none'}} >
            <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Timer </Text>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >remaining: </Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >{Math.floor( State ?  leftIntTime : leftStudyTime / 60)}:{State ?  leftIntTime : leftStudyTime % 60}</Text>
            </View>
            <TouchableOpacity onPress={reset} >
                <FontAwesomeIcon color={Colors.text}  icon={faSquare} />
            </TouchableOpacity>
        </View>
    )
}

export default Timer;