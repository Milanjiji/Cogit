import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    useColorScheme,
    View,
    
  } from 'react-native';
  
  import {CurrentRenderContext, NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  
               
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer,faCheckSquare } from '@fortawesome/free-regular-svg-icons'
import { faArrowAltCircleDown, faInfo, faInfoCircle, faNavicon } from '@fortawesome/free-solid-svg-icons';
const primary = "#04103a"
const secondry = "#283459"
const blue = '#3fb0c9'

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
    return(
        <View style={styles.background} >

            <TouchableOpacity>
                <FontAwesomeIcon style={styles.iLeft} icon={faNavicon} />
            </TouchableOpacity>
            <Text style={[styles.title,{
                letterSpacing: props.letterpacing == 'y' ? 4 : 0
            }]} >{props.title}</Text>
            <View>
                {props.info == "info" ?
                <TouchableOpacity >
                    <FontAwesomeIcon style={styles.iRight} icon={faInfoCircle} />
                </TouchableOpacity> : props.info == "#" ? 
                <TouchableOpacity >
                    <FontAwesomeIcon style={styles.iRight} icon={faArrowAltCircleDown} />
                </TouchableOpacity> : ''}
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        
        height:50,
        backgroundColor:'#fdfcfd',
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