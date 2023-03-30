import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';

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
            <View style={styles.btnContainer} >
                <View style={styles.secondBtnContainer} >
                    <TouchableOpacity style={styles.btn} >
                        <Text style={styles.btnText} >Maths</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} >
                        <Text style={styles.btnText} >Chemistry</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.btn} >
                        <Text style={styles.btnText} >Physics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} >
                        <Text style={styles.btnText} >Biology</Text>
                    </TouchableOpacity>
                </View>
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
        padding:15,

    },
    title:{
        color:primary,
        fontSize:30,
        fontFamily:Bold,
        paddingLeft:20,
        marginBottom:0
    },
    btn:{
        backgroundColor:'red',
        width:150,
        height:100,
        borderRadius:10,
        justifyContent:'flex-end',
        marginVertical:10

    },
    btnText:{
        color:white,
        fontSize:20,
        fontFamily:Bold,
        textAlign:'right',
        padding:20
    },
    btnContainer:{
        flexDirection: 'row', // Arrange children horizontally
        justifyContent: 'space-around',  
    },
    
})
export default Notes;