import React, { useState,useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';


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

    const [Colors,setColors] = useState([]);

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            if(!colors){
                const data = await AsyncStorage.getItem('Colors');
                const colors = JSON.parse(data);
                setColors(colors);
            }else{
                setColors(colors);
            }
            
        }
        getColors();
    },[])
    const Setting  = () =>{
        if(props.pageSettings){
            navigation.navigate('Settings')         
        }else{
            navigation.navigate('Settings')
        
    }
}
const post = () =>{
    navigation.navigate('PostSkills')
  }
    
    return(
        <View style={[styles.background]} >
            <TouchableOpacity onPress={props.sideBar ? '' : Setting} >
                <FontAwesomeIcon color={props.sideBar ? Colors.Background : Colors.text} style={styles.iLeft} icon={faGear} />
            </TouchableOpacity>
            <Text style={[styles.title,{
                letterSpacing: props.letterpacing == 'y' ? 4 : 0
            }]} >{props.title}</Text>
            <View>
                {props.info == "info" ?
                <TouchableOpacity onPress={props.pageSettings} >
                    <FontAwesomeIcon color='white' style={styles.iRight} icon={faInfoCircle} />
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
                    <FontAwesomeIcon color={Colors.Background} style={styles.iRight} icon={faMoon} />
                </TouchableOpacity>:  props.info == 'home' ?

                <TouchableOpacity onPress={props.pageSettings} >
                    <FontAwesomeIcon color={Colors.Background} style={styles.iRight} icon={faMoon} />
                </TouchableOpacity>:props.info == 'post' ?

                <TouchableOpacity  onPress={post} >
                    <Text style={{marginRight:10,marginTop:17,color:Colors.text,fontFamily:Colors.Bold}} >Post</Text>
                </TouchableOpacity>:  ''}
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        margin:3,
        borderRadius:10
    },
    title:{
        color:white,
        fontSize:25,
        fontFamily:Bold,
        paddingVertical:7,
        textAlign:'center'
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