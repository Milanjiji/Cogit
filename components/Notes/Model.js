import React from "react";
import { Text,View,StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Header from "../Header";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const primary = "#04103a"
const secondry = "#283459"

const black = "black"
const white = "white"
const Bold = "Montserrat-Bold"
const Regular = 'Montserrat-Regular';
const BoldItalic = 'Montserrat-BoldItalic';
const ExtraBold = 'Montserrat-ExtraBold';
const ExtraBoldItalic = 'Montserrat-ExtraBoldItalic';
const Medium = 'Montserrat-Medium';
const MediumItalic = 'Montserrat-MediumItalic';


const Model = ({navigation,route,...props}) =>{
    return(
        <SafeAreaView style={styles.background} >
            <ScrollView>
                <Header title={`chapter ${props.num}`} info={'#'}  />
                <Text style={styles.chapter} >{props.name}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:'#faf0e6',
        flex:1,
    },
    chapter:{
        color:black,
        textAlign:'center',
        fontSize:40,
        fontFamily:ExtraBold
    }
})

export default Model;