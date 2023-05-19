import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    DrawerLayoutAndroid
  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowAltCircleDown, faEllipsisV, faGear, faGears, faInfo, faInfoCircle, faNavicon, faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
const primary = "#04103a"


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

    const Setting  = () =>{
        if(props.pageSettings){
            navigation.navigate('Settings')         
        }else{
            navigation.navigate('Settings')
        
    }
}
    
    return(
        <View style={[styles.background,{backgroundColor:'white'}]} >
            <TouchableOpacity onPress={Setting} >
                <FontAwesomeIcon style={styles.iLeft} icon={faGear} />
            </TouchableOpacity>
            <Text style={[styles.title,{
                letterSpacing: props.letterpacing == 'y' ? 4 : 0
            }]} >{props.title}</Text>
            <View>
                {props.info == "info" ?
                <TouchableOpacity onPress={props.pageSettings} >
                    <FontAwesomeIcon style={styles.iRight} icon={faInfoCircle} />
                </TouchableOpacity> : props.info == "#" ? 

                <TouchableOpacity onPress={props.pageSettings} >
                    <FontAwesomeIcon style={styles.iRight} icon={faArrowAltCircleDown} />
                </TouchableOpacity> : props.info == 'ellipsis' ?

                <TouchableOpacity onPress={props.pageSettings} >
                <FontAwesomeIcon style={styles.iRight} icon={faEllipsisV} />
                </TouchableOpacity> : props.info == 'darkMode' ?

                <TouchableOpacity onPress={props.pageSettings} >
                    <FontAwesomeIcon style={styles.iRight} icon={faMoon} />
                </TouchableOpacity>:  props.info == '' ?

                <TouchableOpacity onPress={props.pageSettings} >
                    <FontAwesomeIcon color='white' style={styles.iRight} icon={faMoon} />
                </TouchableOpacity>: ''}
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        elevation:10,
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        margin:3,
        borderRadius:10
    },
    title:{
        color:primary,
        fontSize:25,
        fontFamily:Bold,
        paddingVertical:7,
        
    },
    nav:{
        fontSize:20,
        padding:10,
        paddingLeft:20
    },
    
    iRight:{
        fontSize:40,
        marginRight:20,
        marginTop:17,
        
    },
    iLeft:{
        fontSize:40,
        marginLeft:20,
        marginTop:17,
        
    },
})
export default Header;