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
            <Text>hello</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:'white',
    },
})
export default SubNotes;