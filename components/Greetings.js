import { faSun } from '@fortawesome/free-regular-svg-icons'
import { faCloud, faCloudMoon, faCloudSun, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React,{useEffect,useState,useRef} from 'react'
import {View,Text, StyleSheet,Image,Dimensions, ImageBackground,TouchableOpacity} from 'react-native'
import Colors from '../colors.json'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from './Header'
import ted  from  '../assets/images/ted.png'
import Quotes from '../assets/others/quotes.json'
const date = new Date();

const Greetings = ({navigation}) =>{
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false }));
    const [message,setMessage] = useState();
    const [name,setName] = useState('');
    const [Colors,setColors] = useState([]);
    const [focusedTime,setFocusedTime] = useState(0);
    const [quote,setQuote] = useState('');

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        const getFocusModeStatus = async() =>{
            const data = await AsyncStorage.getItem('FocusModeRunning');
            const value = JSON.parse(data);
            console.log(value);
        }
        getFocusModeStatus()

        const selectQuote = () => {
            const random = Math.floor(Math.random() * 74);
            console.log(random,Quotes[random]);
            setQuote(Quotes[random]);
        }
        selectQuote();

        

        
    },[])

    

    useEffect(()=>{
        const getName = async() =>{
            try{
                const Name = JSON.parse(await AsyncStorage.getItem('userName'));
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
            {/* <Header navigation={navigation} title="Cogit" info='home' /> */}
            <View style={[styles.body,{marginTop:20}]} >
                    <Text style={[styles.title,{color:Colors.text}]} > Hello {name}</Text>
                    <Text style={[styles.time,{color:Colors.text}]} >{message}</Text>
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('TedEd')} style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                <Text style={{width:'40%',color:Colors.text,fontFamily:Colors.Medium}} >Discover fascinating subjects and broaden your horizons with TED-Ed classes.{"\n"}
                <Text style={{fontSize:24}} >Watch{"\n"} 
                <Text style={{color:"red",fontFamily:Colors.Bold}} >TED </Text>
                <Text style={{fontFamily:Colors.Bold}} >ED</Text>
                </Text>
                </Text>
                <View style={{width:'40%'}}  >
                    <View style={{backgroundColor:Colors.secondary,elevation:10,borderRadius:10,width:130,height:150,transform: [{ perspective: 1000 }, { rotateY: '-40deg'}, { rotateX: '10deg'}],}} >
                        <View style={{backgroundColor:Colors.white,width:100,height:100,borderRadius:10,elevation:10,marginTop:-30,marginRight:-20,alignSelf:'flex-end'}} >
                            <ImageBackground imageStyle={{borderRadius:10}}  source={ted} style={{width:150,height:180,marginLeft:-80,marginTop:50,elevation:10}}  >
                                <View style={{flex: 1,}} >
                                    <View style={{flex: 1}} >

                                    </View>
                                        <View style={{backgroundColor:'yellow',width:100,height:20,flexDirection:'row',borderRadius:2,margin:3,justifyContent:'space-around'}} >
                                            <FontAwesomeIcon icon={faStar} color='black' />
                                            <Text style={{color:Colors.black,fontFamily:Colors.Bold}} >Featured</Text>
                                        </View>
                                  
                                </View>
                            </ImageBackground>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginHorizontal:15,backgroundColor:'#ffffff25',borderRadius:10,marginTop:100}} >
                    <Text style={{color:Colors.white,fontFamily:Colors.Medium,padding: 10,}} >{quote}</Text>  
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