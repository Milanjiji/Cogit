import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';

  const maincolor = "#7F00FF"
  const black = 'black';
  const white = 'white';
  const Regular = 'Montserrat-Regular';
const Registration = ({navigation,route}) =>{
    return(
        <View style={styles.background} >
            <Text style={styles.reg} >Registration</Text>
            <Text style={styles.label} >Email :</Text>
            <TextInput style={styles.input}  placeholder='hello world'  />
            <Text style={styles.label} >Phone number :</Text>
            <TextInput  style={styles.input} placeholder='helo world' />
            <TouchableOpacity onPress={()=>
                    navigation.navigate('Details',{name:name})
                } >
                    <Text style={styles.arrow} >Next</Text>
                </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:maincolor,
        display:'flex',
        justifyContent:'space-around',
        marginHorizontal:40,
        marginVertical:40,
        borderRadius:5,
        padding:20
    },
    reg:{
        color:white,
        textAlign:'center',
        fontSize:20,
        fontFamily:Regular
    },
    label:{
        color:white,
        fontSize:20,
        marginVertical:5,
        fontFamily:Regular,
        marginLeft:20,
    },
    input:{
       backgroundColor:"#a64dff",
       marginHorizontal:20, 
    },
    arrow:{
        fontSize:20,
        color:black,
        textAlign:'center',
        backgroundColor:"#6600cc",
        marginTop:20,
        borderRadius:3,
        padding:4,
        color:'white',
        marginHorizontal:20, 
    },
})
export default Registration;