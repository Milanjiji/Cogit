import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import  Colors  from "../colors.json";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


const AllSet  = ({navigation}) =>{
    const skip = () =>{
        navigation.navigate('Home');
        
    }
    return(
        <View style={styles.body} >
            <Text style={styles.AllSet} > You are all set!</Text>
            <View style={{flex:1}} >

            </View>
            <TouchableOpacity onPress={skip} style={styles.finish} >
                <Text style={styles.finishBtn} >Finish</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:Colors.Background
    },
    AllSet:{
        color:Colors.white,
        fontFamily:Colors.Bold,
        fontSize:28,
        marginHorizontal:20,
        marginTop:20,
        marginBottom:0,
    },
    tour:{
        color:Colors.white,
        fontFamily:Colors.Medium,
        fontSize:18,
        marginHorizontal:30,
    },
    go:{
        backgroundColor:Colors.white,
        width:100,
        marginHorizontal:30,
        paddingRight:40,
        marginTop:10,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:"center",
        padding:10
    },
    btnText:{
        color:Colors.primary,
        fontFamily:Colors.Medium,
    },
    finish:{
        backgroundColor:Colors.primary,
        borderRadius:10,
        marginHorizontal:30,
        marginVertical:10
    },
    finishBtn:{
        color:Colors.white,
        textAlign:'center',
        paddingVertical:10,
        fontFamily:Colors.ExtraBold,
        fontSize:24
    }
})

export default AllSet;