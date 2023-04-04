import React,{useState} from 'react';
import { View,
        Text,
        StyleSheet,
        SafeareaView,
        TextInput,
        Button,
        TouchableOpacity,
        ImageBackground
        } from 'react-native'

const primary = "#04103a"
const secondry = "#3fb0c9"
const maincolor = "#7F00FF"
const black = "black"
const white = "white"
const fontBold = "Montserrat-Bold"


const GetStarted = ({navigation}) =>{
    const [name,setname] = useState("");
   
    const inputHandler = (text)=>{
        setname(text);   
    }
    
    
    return (
        <View style={styles.background} >
            <ImageBackground  ></ImageBackground>
            <Text style={styles.name} >Cogit</Text>
            <Text style={styles.quote} >Transform the way you learn with Cogit</Text>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('Details')
            }} >
                <Text style={styles.btn} >Get Started</Text>
            </TouchableOpacity>
        </View>

    )
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:primary,
        flex:1,
        
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
        fontSize:64,
        padding:20,
        marginTop:110,
        textShadowColor:secondry,
        textShadowOffset:{width:2,height:2},
        textShadowRadius:20,
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
        marginTop:180
    }
})

export default GetStarted;