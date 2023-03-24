import React from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
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
const SubNotes = ({navigation,route}) =>{
    return(
        <View style={styles.background} >
            <TouchableOpacity>
                <ImageBackground style={[styles.Image,{
                    marginTop:-10
                }]} source={require('../assets/images/maths.png')} >
                    <Text style={styles.Text}  >Maths</Text>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity >
                <ImageBackground style={styles.Image} source={require('../assets/images/physics.png')} >
                    <Text style={styles.Text} >Physics</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:'white',
    },
    Text:{
        display:'flex',
        color:white,
        textAlign:'center',
        fontSize:30,
        fontFamily:ExtraBold,
        width:150,
        height:130,
        
       padding:10,
      
    },
    Image:{
        marginTop:10,  
        
    }
})
export default SubNotes;