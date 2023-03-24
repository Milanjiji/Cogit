import React from 'react';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import SubNote from './SubNote';
  import SubNotes from './SubNotes';

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
const Notes = ({navigation,route,...props}) =>{
    return(
        <View style={styles.background}>
            <Text style={styles.title} >Notes</Text>
            <View style={styles.align}>
                <SubNotes/>  
                <SubNote/>   
            </View>   
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:'white',
        marginTop:10,
        borderRadius:10,
        margin:3,
        padding:15
    },
    title:{
        color:primary,
        fontSize:30,
        fontFamily:Bold,
        paddingLeft:20,
        marginBottom:0
    },
    align:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    }
})
export default Notes;