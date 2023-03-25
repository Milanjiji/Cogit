import React from 'react';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import RNFS from 'react-native-fs';

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


const Download = ({navigation,route}) =>{
    // const folderPath = `${RNFS.DocumentDirectoryPath}/Cogit`;
    // const filePath = `${folderPath}/Readme.txt`;
    // RNFS.readFile(filePath, 'utf8')
    
    // RNFS.mkdir(folderPath)
    // .then(() => {
    //     console.log('Folder created');
    //     return RNFS.writeFile(filePath, 'This is the readme file of the app cogit', 'utf8');
    // })
    // .then(() => {
    //     console.log('File created');
    //     return RNFS.readFile(filePath, 'utf8');
    // })
    // .then((contents) => {
    //     console.log(contents);
    // })
    // .catch((err) => {
    //     console.log(err.message);
    // });
    
    return(
        <View style={styles.background} >
            <Text>Download</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:'white',
        flex:1
    },
    
})
export default Download;