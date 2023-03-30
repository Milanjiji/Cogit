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
  import {  faGear, faHome, faMessage } from '@fortawesome/free-solid-svg-icons';

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
const HomePageFootor = ({navigation,route,...props}) =>{
    return(
        <View style={styles.background}   >
            <TouchableOpacity style={styles.iconContainer} >
                <FontAwesomeIcon style={styles.icon} size={23} icon={faHome} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} >
                <FontAwesomeIcon style={styles.icon} size={23} icon={faMessage} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} >
                <FontAwesomeIcon style={styles.icon} size={23} icon={faGear} />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        height:50,
        backgroundColor:white,
        margin:3,
        marginBottom:3,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    icon:{
        fontSize:30
    }

})
export default HomePageFootor;