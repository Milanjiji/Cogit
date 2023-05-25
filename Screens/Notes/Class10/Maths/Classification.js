import React from "react";
import { View,Text,ScrollView,StyleSheet,TouchableOpacity } from "react-native";
import Header from "../../../../components/Header";


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

const Classification = ({subject,clas,navigation}) =>{
    return(
        <View style={{backgroundColor:primary,flex:1}} >
            <Header title={'Chapters'} info={'#'} />
            <TouchableOpacity style={styles.btnContainer} >
                <Text style={styles.chapterNum} >Chapter 1</Text>
                <Text style={styles.chapterName} >Chapter name</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    btnContainer:{
        backgroundColor:white
    },
    chapterNum:{
        color:black
    },
    chapterName:{
        color:black
    }
})

export default Classification;