import { faSun } from '@fortawesome/free-regular-svg-icons'
import { faCloud, faCloudMoon, faCloudSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React,{useEffect,useState,useRef} from 'react'
import {View,Text, StyleSheet,Image,Dimensions} from 'react-native'
import Colors from '../colors.json'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from './Header'

const Greetings = ({navigation}) =>{
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false }));
    const [message,setMessage] = useState();
    const [name,setName] = useState('');
    const [Colors,setColors] = useState([]);
    const width = Dimensions.get('window').width;

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
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
        <View style={{marginBottom:10}} >
            <Header navigation={navigation} title="Cogit" info='' />
            <View style={[styles.body,{}]} >
                
                <View>
                    <Text style={[styles.title,{color:Colors.text}]} > Hello {name}</Text>
                    <Text style={[styles.time,{color:Colors.text}]} >{message}</Text>
                </View>
                <View>
                    <FontAwesomeIcon style={{marginRight:15}} size={80} color={Colors.text} 
                    icon={message == 'Good Morning' ? faCloudSun : message == 'Good AfterNoon' ? faSun : message == 'Good Evening' ? faCloudSun : message == 'Good Night' ? faCloud : ''} />
                </View>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}} >
                <Image
                    source={{
                    uri: 'https://drive.google.com/uc?export=view&id=1eoBJLNZApvSjOWutgFliH3xJYNlNhQbO',
                    }}
                    style={{height:width/1.5,width:(width/2),marginLeft:20,}}
                />
                <Text style={{color:Colors.text,width:(width/3)+35,textAlign:'right',marginRight:20,fontFamily:Colors.Medium}} >
                Feel free to explore the app while I embark on an interplanetary journey to explore the wonders of Jupiter and Help others by sharing what you know
                </Text>
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    body:{
        borderRadius:10,
        margin:5,
        padding:8,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
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