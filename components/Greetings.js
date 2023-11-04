import React,{useEffect,useState} from 'react'
import {View,Text, StyleSheet} from 'react-native'
import Colors from '../colors.json'
import Quotes from '../assets/others/quotes.json'
import Timer from './Timer'
import { storage } from '../Storage'


const date = new Date();

const Greetings = () =>{
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false }));
    const [message,setMessage] = useState();
    const [name,setName] = useState('');
    const [Colors,setColors] = useState([]);
    const [quote,setQuote] = useState('');


    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        const getFocusModeStatus = async() =>{
            const data = storage.getString('FocusModeRunning')
            const value = JSON.parse(data);
        }
        getFocusModeStatus()

        const selectQuote = () => {
            const random = Math.floor(Math.random() * 74);
            setQuote(Quotes[random]);
        }
        selectQuote();
    },[])

    
    
    

    useEffect(()=>{
        const getName = async() =>{
            try{
                const Name = storage.getString('userName')
                setName(JSON.parse(Name));
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

            <Timer/>
            <View style={[styles.body,{marginTop:20}]} >
                    <Text style={[styles.title,{color:Colors.text}]} > Hello <Text style={{color:'#7300e6'}} >{name}</Text></Text>
                    <Text style={[styles.time,{color:Colors.text}]} >{message}</Text>
            </View>
            
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginHorizontal:15,backgroundColor:Colors.hashWhite,borderRadius:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,padding: 10,fontSize:12}} >{quote}</Text>  
            </View>
        
        </View>
    )
}
const styles = StyleSheet.create({
    body:{
        borderRadius:10,
        margin:5,
        padding:8,
        justifyContent:'space-between',
    },
    title:{
        color:Colors.white,
        fontFamily:Colors.Bold,
        fontSize:22
    },
    time:{
        color:Colors.white,
        fontFamily:Colors.Bold,
        paddingLeft:8,
        fontSize:16
    }
})
export default Greetings;