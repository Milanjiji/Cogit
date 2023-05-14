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
  import {  faBook, faGear, faHome, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faFileText, faUser } from '@fortawesome/free-solid-svg-icons';


  const primary = "#04103a"
const secondry = "#283459"

const black = "black"
const white = "white"
const ExtraBold = 'Montserrat-ExtraBold';

const HomePageFootor = ({navigation,route,...props}) =>{
    return(
        <View style={styles.background}   >
            <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={styles.iconContainer} >
                <FontAwesomeIcon style={styles.icon} size={23} icon={faHome} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Notes')}} style={styles.iconContainer} >
                <FontAwesomeIcon style={styles.icon} size={23} icon={faBook} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Ai')}} style={styles.iconContainer} >
                <Text style={{color:black,fontSize:23,fontFamily:ExtraBold}} >AI</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Forum')}} style={styles.iconContainer} >
                <FontAwesomeIcon style={styles.icon} size={23} icon={faMessage} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} >
                <FontAwesomeIcon style={styles.icon} size={23} icon={faUser} />
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
        alignItems:'center',
        elevation:10
    },
    icon:{
        fontSize:30
    }

})
export default HomePageFootor;