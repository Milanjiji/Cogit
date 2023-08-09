import React,{useEffect,useState} from 'react';
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
  import {  faAdd, faBook, faGear, faHome, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faFileText, faUser } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';


  const primary = "#04103a"
const secondry = "#283459"

const black = "black"
const white = "white"
const ExtraBold = 'Montserrat-ExtraBold';

const HomePageFootor = (props) =>{
   
    const navigation = props.navigation
    const [Colors,setColors] = useState([]);

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        
    },[])

    return(
            <LinearGradient colors={['#FFFFFF00', "#2b1499","#2b1499"]} style={[styles.background,{marginTop:props.marginTop ? 0 : -50}]} >
            <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} style={styles.iconContainer} >
                <FontAwesomeIcon color={`${Colors.text}50`}  style={styles.icon} size={20} icon={faHome} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Ai')}} style={styles.iconContainer} >
                {
                    !props.add ?  
                    <TouchableOpacity onPress={()=>{navigation.navigate('Focus')}} style={{justifyContent:'center',alignItems:'center',width:40,height:40,elevation:20}} >
                        {/* <FontAwesomeIcon color={Colors.text} style={styles.icon} size={24} icon={faAdd} /> */}
                        <Text style={{color:`${Colors.text}50`,fontSize:24,fontWeight:'bold'}} >(o)</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity onPress={()=>{navigation.navigate('AddArticle')}} style={{justifyContent:'center',alignItems:'center',width:40,height:40,elevation:20}} >
                        {/* <FontAwesomeIcon color={Colors.text} style={styles.icon} size={24} icon={faAdd} /> */}
                        <Text style={{color:`${Colors.text}50`,fontSize:26,fontWeight:'bold'}} >(o)</Text>
                    </TouchableOpacity>
                    
                }
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('Notes')}} style={styles.iconContainer} >
                <FontAwesomeIcon color={`${Colors.text}50`}  style={styles.icon} size={20} icon={faBook} />
            </TouchableOpacity>

            

            <TouchableOpacity onPress={()=>{navigation.navigate('Forum')}} style={styles.iconContainer} >
                <FontAwesomeIcon color={`${Colors.text}50`} style={styles.icon} size={20} icon={faMessage} />
            </TouchableOpacity>

            
            </LinearGradient>
        
    );
}
const styles = StyleSheet.create({
    background:{
        height:50,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        
    },
    icon:{
        fontSize:30,
        alignSelf:'center',
        elevation:2
    },
    iconContainer:{
        width:40,
           
    }

})
export default HomePageFootor;