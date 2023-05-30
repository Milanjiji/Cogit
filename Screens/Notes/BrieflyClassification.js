import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import HomePageFootor from "../../components/HomePageFootor";
import Class10Math from './../../assets/rawNotes/Class10Maths.json'
import Class10Bio from './../../assets/rawNotes/Class10Bio.json'
import Class10Phy from './../../assets/rawNotes/Class10Phy.json'
import Class10MChem from './../../assets/rawNotes/Class10Chem.json'

import Class11Math from './../../assets/rawNotes/Class11Maths.json'
import Class11Bio from './../../assets/rawNotes/Class11Bio.json'
import Class11Phy from './../../assets/rawNotes/Class11Phy.json'
import Class11MChem from './../../assets/rawNotes/Class11Chem.json'

import Class12Math from './../../assets/rawNotes/Class12Maths.json'
import Class12Bio from './../../assets/rawNotes/Class12Bio.json'
import Class12Phy from './../../assets/rawNotes/Class12Phy.json'
import Class12MChem from './../../assets/rawNotes/Class12Chem.json'

const BriefClassification = ({route,navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [note,setNote] = useState([])
    const [clas,setClass] = useState([]);
    const {sub} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            const clas = await AsyncStorage.getItem('class');
            const value = JSON.parse(clas);
            console.log(value);
            setColors(colors);
        }
        getColors();
        if(sub === 'math' )
        console.log(sub);
    },[])


    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <Header navigation={navigation}  title="Maths" info=""/>
            <View style={{flex: 1,}} >
            <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary,flex:1,justifyContent:'center'}]} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20}} >Chapter 1 : </Text>
                </TouchableOpacity>
            </View>
            <HomePageFootor navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    btn:{
        margin:3,
        borderRadius:10,
        elevation:10,
        marginTop:10,
        padding: 10,
    }
})

export default BriefClassification;