import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    
  } from 'react-native';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';

const primary = "#04103a"
const secondry = "#283459"
const blue = '#3fb0c9'

const black = "black"
const white = "white"
const Regular = 'Roboto-Regular';
const BoldItalic = 'Montserrat-BoldItalic';
const Bold = 'Montserrat-Bold';
const ExtraBold = 'Montserrat-ExtraBold';
const ExtraBoldItalic = 'Montserrat-ExtraBoldItalic';
const Medium = 'Montserrat-Medium';
const MediumItalic = 'Montserrat-MediumItalic';
const Header = ({navigation,route,...props}) =>{
    return(
        <View style={styles.background} >
            <Text style={styles.title} >{props.title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:'white',
        height:50,
        backgroundColor:blue,
        
    },
    title:{
        color:primary,
        fontSize:20,
        fontFamily:Bold,
        padding:10,
        paddingLeft:20,
        
    }
})
export default Header;