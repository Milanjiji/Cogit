import React,{useEffect,useState} from "react";
import { Text, View,StyleSheet, TouchableOpacity, Dimensions,ScrollView,ImageBackground, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from '../colors.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import focus from '../assets/images/focus.png'
import { faAngleUp, faCake, faHeadphones, faTemperatureThreeQuarters, faTrash } from "@fortawesome/free-solid-svg-icons";

// go through instagram and get the music for focus mode


const HomePageBar = ({navigation,...props}) =>{
    const [Colors,setColors] = useState([]);

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])



      const goTo = (place) =>{
        navigation.navigate(place);
      }

      
    return(
        <View style={[styles.App,{backgroundColor:Colors.Background,marginHorizontal:props.margin ? 8 : 0}]} >
            <TouchableOpacity style={[styles.community,{backgroundColor:Colors.primary,flexDirection:props.item == "c" ? "row" : "column",height:props.item == "c" ? 50 : 70 ,display:props.item !== "com" ? "flex" :"none"}]} onPress={()=>goTo(props.navigate)}>
                        <LinearGradient
                        colors={['#00000010', '#00000050']} 
                        style={{width:50,height:50,marginRight:10,borderTopLeftRadius:10,borderBottomLeftRadius:10,alignItems:'center',justifyContent:'center',display:props.item == "c"? "flex" :'none'}} >
                            <Text style={{fontSize:20}} >$_</Text>
                        </LinearGradient>
                        <View style={{display: props.item !== "c"  ?'flex' :'none' ,flex:1 ,alignItems:'center',justifyContent:'center'}} >
                          <FontAwesomeIcon size={20}  color={Colors.text} icon={ props.item == "focus" ? faHeadphones : props.item == "recycle" ? faTrash : props.item == "skills" ? faCake : faAngleUp}/>
                        </View>
                        <Text style={[styles.community_Text,{color:Colors.text,flex:1,textAlignVertical:'center',marginTop:props.item == "c"  ? 0 : -20}]} >{props.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.community,{backgroundColor:Colors.primary,height:props.item == "c" ? 50 : 70 ,display:props.item == "com" ? "flex" :"none",alignItems:'flex-start'}]} onPress={()=>goTo(props.navigate)}>
                <Text style={[styles.community_Text,{color:Colors.text,flex:1,textAlignVertical:'top',textAlign:'left',fontSize:16,marginTop:10,marginLeft:10}]} >{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    App:{
        flex:1,
        backgroundColor:Colors.Background,
    },
      community:{
        margin:5,
        backgroundColor:Colors.primary,
        borderRadius:10,
        elevation:5,
        justifyContent:'center',
        alignItems:'center'
      },
      community_Text:{
        color:Colors.white,
        fontFamily:Colors.Medium,
        fontSize:11,
      },
      community_Disc:{
        color:Colors.white,
        fontFamily:Colors.Regular,
        fontSize:12
      },
})
export default HomePageBar;