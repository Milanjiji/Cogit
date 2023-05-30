import React,{useState,useEffect} from "react";
import { View,Text,FlatList } from "react-native";
import Class11Maths from '../assets/rawNotes/Class11Maths.json'

const SummaryNote = ({route,navigation}) => {
    useEffect(()=>{
        console.log(Class11Maths.sets);
    },[]);
    return(
        <View>
            <Text>hello</Text>
        </View>
    );
}
export default SummaryNote;