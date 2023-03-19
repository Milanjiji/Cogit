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
    Image,
    Button,
    
  } from 'react-native';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import {Picker} from '@react-native-picker/picker';
  import Registration from './Registration';
  import ksb from '../../assets/images/index.png'
  import cbse from '../../assets/images/cbse.png'
import { useState } from 'react';
 

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

  
const Details = ({navigation,route}) =>{
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [userName,setUserName] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [Password,setPassword] = useState('');
    const [email,setEmail] = useState('');

    const UserInputHolder = (text) =>{
        setUserName(text);
    }
    const EmailInputHolder = (text) =>{
        setEmail(text);
    }
    const PasswordInputHolder = (text) =>{
        setPassword(text);
    }
    const ConfirmPasswordInputHolder = (text) =>{
        setConfirmPassword(text);
    }
    const Submit = () =>{
        
    }
    return(
       <View style={styles.background} >
        <Text style={styles.signup} >Sign Up</Text>
        <Text style={styles.reg} >Let's Register to </Text>
        <Text style={styles.reg} >Get Started</Text>
        <TextInput placeholderTextColor={white} style={styles.input}  placeholder='User name' />
        <TextInput placeholderTextColor={white} style={styles.input}  placeholder='Email' />
        <TextInput placeholderTextColor={white} style={styles.input}  placeholder='Password'/>
        <TextInput placeholderTextColor={white} style={styles.input}  placeholder='Confirm Password' 
        onChangeText={(text) => ConfirmPasswordInputHolder(text)}/>
       
            <Picker 
                style={styles.picker} 
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)}>

                <Picker.Item style={styles.items}  label="10" value="10" />
                <Picker.Item style={styles.items} label="+1" value="+1" />
                <Picker.Item style={styles.items} label="+2" value="+2" />
            </Picker>
        <TouchableOpacity onPress={Submit} >
            <Text style={styles.btn} >Register</Text>
        </TouchableOpacity>
       </View>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:primary,
        flex:1,
    },
    signup:{
        color:white,
        fontSize:50,
        marginLeft:30,
        marginTop:50,
        marginBottom:10,
        fontFamily:Medium
    },
    reg:{
        color:white,
        fontSize:18,
        marginLeft:30,
        fontFamily:Regular
    },
    input:{
        color:white,
        backgroundColor:secondry,
        marginHorizontal:30,
        marginTop:30,
        borderRadius:10,
        paddingHorizontal:20
    },
    picker:{
        color:white,
        backgroundColor:secondry,
        marginHorizontal:30,
        marginTop:30,
        borderRadius:30,
    },
    items:{
        color:white,
        backgroundColor:secondry,

    },
    btn:{
        fontSize:25,
        color:white,
        fontFamily:Bold,
        backgroundColor:secondry,
        margin:20,
        textAlign:'center',
        padding:10,
        borderRadius:10,
        marginTop:140,
        marginHorizontal:70,
    }
    
})
export default Details;