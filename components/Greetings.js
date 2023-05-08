import { faMoon } from '@fortawesome/free-regular-svg-icons'
import { faCloudMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React,{useEffect,useState,useRef} from 'react'
import {View,Text, StyleSheet} from 'react-native'
import Colors from '../colors.json'

const Greetings = () =>{
    return(
        <View style={styles.body} >
            <View>
                <Text style={styles.title} > Hello Name</Text>
                <Text style={styles.time} >GoodMorning</Text>
            </View>
            <View>
                <FontAwesomeIcon style={{marginRight:20}} size={80} color={Colors.white} icon={faCloudMoon} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    body:{
        backgroundColor:Colors.primary,
        borderRadius:10,
        margin:5,
        padding:8,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        elevation:20
    },
    title:{
        color:Colors.white,
        fontFamily:Colors.ExtraBoldItalic,
        fontSize:28
    },
    time:{
        color:Colors.white,
        fontFamily:Colors.Bold,
        paddingLeft:8,
        fontSize:20
    }
})
export default Greetings;