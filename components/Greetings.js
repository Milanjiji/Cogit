import { faSun } from '@fortawesome/free-regular-svg-icons'
import { faCloud, faCloudMoon, faCloudSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React,{useEffect,useState,useRef} from 'react'
import {View,Text, StyleSheet} from 'react-native'
import Colors from '../colors.json'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Greetings = () =>{
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false }));
    const [message,setMessage] = useState();
    const [name,setName] = useState('');
    const [Colors,setColors] = useState([]);

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
            console.log("Colors => ",colors);
        }
        getColors();
    },[])

    useEffect(()=>{
        const getName = async() =>{
            try{
                const Name = await AsyncStorage.getItem('userName');
                setName(Name);
            }catch(e){
                console.log(e);
            }
        }
        getName();
    },[])
    console.log(currentTime);

    useEffect(()=>{
        if(currentTime < 12){
            setMessage('Good Morning');
        }else if(currentTime >= 12 && currentTime < 16){
            setMessage('Good AfterNoon');
        }else if(currentTime >= 16 && currentTime < 19){
            setMessage('Good Evening');
        }else if(currentTime >= 19 && currentTime < 24){
            setMessage('Good Night');
        }else{
            setMessage('');
        }
    },[])
    return(
        <View style={[styles.body,{backgroundColor:Colors.primary}]} >
            <View>
                <Text style={[styles.title,{color:Colors.text}]} > Hello {name}</Text>
                <Text style={[styles.time,{color:Colors.text}]} >{message}</Text>
            </View>
            <View>
                <FontAwesomeIcon style={{marginRight:20}} size={80} color={Colors.text} 
                icon={message == 'Good Morning' ? faCloudSun : message == 'Good AfterNoon' ? faSun : message == 'Good Evening' ? faCloudSun : message == 'Good Night' ? faCloud : ''} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    body:{
        backgroundColor:Colors.primary,
        borderRadius:10,
        margin:5,
        padding:8,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        elevation:20
    },
    title:{
        color:Colors.white,
        fontFamily:Colors.ExtraBoldItalic,
        fontSize:28
    },
    time:{
        color:Colors.white,
        fontFamily:Colors.Bold,
        paddingLeft:8,
        fontSize:20
    }
})
export default Greetings;