import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React,{useEffect,useState,useRef} from 'react'
import {View,Text, StyleSheet,ImageBackground,TouchableOpacity} from 'react-native'
import Colors from '../colors.json'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ted  from  '../assets/images/ted.png'
import Quotes from '../assets/others/quotes.json'
import Timer from './Timer'
import focusImage from '../assets/images/focused.png'
import skillImg from '../assets/images/skills.png'
import forumImg from '../assets/images/forum.png'


const date = new Date();

const Greetings = ({navigation}) =>{
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString('en-US', { hour: 'numeric', hour12: false }));
    const [message,setMessage] = useState();
    const [name,setName] = useState('');
    const [Colors,setColors] = useState([]);
    const [quote,setQuote] = useState('');
    const [page,setPage] = useState(1);
    const [isRunning,setIsRunning] = useState(true);


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
        }
        getFocusModeStatus()

        const selectQuote = () => {
            const random = Math.floor(Math.random() * 74);
            setQuote(Quotes[random]);
        }
        selectQuote();
    },[])

    useEffect(() => {
        let interval;
        if (isRunning) {
          interval = setInterval(() => {
            setPage((prevPage) => prevPage + 1);
          }, 5000);
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [isRunning]);

      if(page >= 5){
        setPage(1);
      }
    
    

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

            <Timer/>
            <View style={[styles.body,{marginTop:20}]} >
                    <Text style={[styles.title,{color:Colors.text}]} > Hello {name}</Text>
                    <Text style={[styles.time,{color:Colors.text}]} >{message}</Text>
            </View>
            
            <TouchableOpacity onPress={()=>navigation.navigate('TedEd')} style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',display:page == 1 ? 'flex' : 'none'}} >
                <Text style={{width:'40%',color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Discover fascinating subjects and broaden your horizons with TED-Ed classes.{"\n"}
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
                                        <View style={{backgroundColor:'yellow',width:100,height:15,flexDirection:'row',borderRadius:2,margin:3,justifyContent:'space-around'}} >
                                            <FontAwesomeIcon size={12} icon={faStar} color='black' />
                                            <Text style={{color:Colors.black,fontFamily:Colors.Medium,fontSize:12}} >Featured</Text>
                                        </View>
                                  
                                </View>
                            </ImageBackground>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal:10,marginLeft:20,height:250,display:page == 2 ? 'flex' : 'none'}} >
                <ImageBackground source={focusImage} style={{flex: 1,}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:30}} >Be Focused!</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}}  >Use FocusMode for better focus</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Turn on now!</Text>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal:10,marginLeft:20,height:270,display:page == 3 ? 'flex' : 'none'}} >
                <ImageBackground source={skillImg} style={{flex: 1,}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:30}} >Show what you can do</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Show your skills right now!</Text>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal:10,marginLeft:20,height:270,display:page == 4 ? 'flex' : 'none'}} >
                <ImageBackground source={forumImg} style={{flex: 1,}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:30}} >Get in Touch</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >find new people.</Text>
                </ImageBackground>
            </TouchableOpacity>
            
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginHorizontal:15,backgroundColor:Colors.hashWhite,borderRadius:10,marginTop:page == 1 ? 100 : 0}} >
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