import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React,{useState,useEffect} from 'react';
import {  faMusic, faFilm } from '@fortawesome/free-solid-svg-icons';
import { View,
        Text,
        StyleSheet,
        TouchableOpacity,
        Dimensions,
        Animated
        } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../colors.json'

const secondry = "#3fb0c9"
const white = "white"
const fontBold = "Montserrat-Bold"


const GetStarted = ({navigation}) =>{
    const [delay,setDelay] = useState(false);
    const [name,setname] = useState("");
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    useEffect(()=>{
        // const getDetails = async() =>{
        //     const name = await AsyncStorage.getItem('userName');
        //     console.log(name);
        //     setname(name);
        // }
    },[])
    
    
    
    return (

        <View style={styles.background} >
          

            
                <View style={{flex: 1,}}  > 
                    <Text style={styles.name} >Cogit</Text>
                    <View style={{flex:1,justifyContent:'space-around',marginTop:-100}} >
                    <View>
                        <Text style={[styles.quote,{
                            fontSize:width/8,
                        }]} >Transform the way you learn with Cogit</Text>
                        <Text style={styles.smallquote} >Get ahead in your studies with Cogit {"\n"} - the student-friendly app.</Text>
                    </View>
                    

                    </View>
                    
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Details')
                    }} >
                        <Text style={[styles.btn,{}]} >Get Started</Text>
                    </TouchableOpacity>
                </View>
            
            
            
        </View>
        

    )
} 
const styles = StyleSheet.create({
    background:{
        backgroundColor:Colors.Background,
        flex:1
    },
    name:{
        fontSize:35,
        color:white,
        fontFamily:fontBold,
        marginLeft:30,
        marginTop:20,
    },
    quote:{
        color:secondry,
        fontFamily:fontBold,
        padding:20,
        textShadowColor:secondry,
    },
    btn:{
        fontSize:25,
        color:white,
        fontFamily:fontBold,
        backgroundColor:secondry,
        margin:20,
        textAlign:'center',
        padding:10,
        borderRadius:10,
    },
    smallquote:{
        marginHorizontal:20,
        fontFamily:Colors.BoldItalic,
        color:white,
    },
})

export default GetStarted;