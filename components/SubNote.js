import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground
  } from 'react-native';
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
const SubNote = ({navigation,route}) =>{
    return(
        <View style={styles.background} >
            <ImageBackground style={styles.chemistry} source={require('../assets/images/chemistry.png')} >
                <Text style={styles.ctext} >Chemistry</Text>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:'white',
        marginTop:-30,
       
    },
    title:{
        color:primary,
        fontSize:30,
        fontFamily:ExtraBold,
        paddingLeft:20,
        
    },
    chemistry:{
       
        
    },
    ctext:{
        height:300,
        width:180,
        color:white,
        paddingTop:20,
        fontSize:30,
        textAlign:'center',
        fontFamily:ExtraBold,
        borderRadius:10
    }
})
export default SubNote;