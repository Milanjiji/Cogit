import React from 'react';
import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import {Link, NavigationContainer} from '@react-navigation/native';
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

const Questions = ({navigation,route,...props}) =>{

    const openUrl = ()=>{
        Linking.openURL(props.link)
    }

    return(
        <View style={styles.background}   >
            <TouchableOpacity >
                <Text style={styles.Questions}  >Basic Q</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openUrl} >
                <Text style={styles.Questions} >Video Explanation</Text>
            </TouchableOpacity>
            <TouchableOpacity >
                <Text style={styles.Questions} >Advanced Q</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        margin:3,
        marginBottom:5,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    Questions:{
        width:110,
        color:primary,
        fontSize:10,
        fontFamily:Bold,
        paddingVertical:7,
        textAlign:'center',
        backgroundColor:white,
        borderRadius:10
    },

})
export default Questions;