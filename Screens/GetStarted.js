import React,{useState} from 'react';
import { View,
        Text,
        StyleSheet,
        TouchableOpacity,
        Dimensions
        } from 'react-native'
import Colors from '../colors.json'

const secondry = "#3fb0c9"
const white = "white"
const fontBold = "Montserrat-Bold"


const GetStarted = ({navigation}) =>{
    const [name,setname] = useState("");
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    const inputHandler = (text)=>{
        setname(text);   
    }
    
    
    return (
        <View style={styles.background} >
           
            <Text style={styles.name} >Cogit</Text>
            <Text style={[styles.quote,{
                fontSize:width/8,marginTop:height/6.5
            }]} >Transform the way you learn with Cogit</Text>
            <Text style={styles.smallquote} >Get ahead in your studies with Cogit {"\n"} - the student-friendly app.</Text>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('Details')
            }} >
                <Text style={[styles.btn,{
                    marginTop: Dimensions.get('window').height / 4.5
                }]} >Get Started</Text>
            </TouchableOpacity>
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
    },
    smallquote:{
        marginHorizontal:20,
        fontFamily:colors.BoldItalic,
        color:white
    },
})

export default GetStarted;