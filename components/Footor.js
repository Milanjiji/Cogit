import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';
  
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
const Footor = ({navigation,route,...props}) =>{
    return(
        <View style={styles.background}   >
            <TouchableOpacity onPress={()=>{
                navigation.navigate('MathsNote2')
            }} >
                <Text style={styles.footor} >Next Chapter</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        height:50,
        backgroundColor:white,
        margin:3,
        marginBottom:5,
        borderRadius:10
    },
    footor:{
        color:primary,
        fontSize:25,
        fontFamily:Bold,
        paddingVertical:7,
        textAlign:'center'
    },

})
export default Footor;