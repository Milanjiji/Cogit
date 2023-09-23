import React,{useEffect,useState} from "react";
import { Text, View,StyleSheet, TouchableOpacity, Dimensions,ScrollView,ImageBackground, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from '../colors.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import focus from '../assets/images/focus.png'
import { faAngleUp, faCake, faHeadphones, faMessage, faQuestionCircle, faTemperatureThreeQuarters, faTrash, faUsersBetweenLines, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import mesh from '../assets/images/CommunityBackground.png'
import { Overlay } from "@chatscope/chat-ui-kit-react";

// go through instagram and get the music for focus mode


const HomePageBar = ({navigation,...props}) =>{
    const [Colors,setColors] = useState([]);
    const [cheakDisplay,setCheakDisplay] = useState(false);

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        if(props.item !== "com"  ){
            setCheakDisplay(true);
        }
    },[])



      const goTo = (place) =>{
        navigation.navigate(place);
      }

      
    return(
        <View style={[styles.App,{backgroundColor:Colors.Background,marginHorizontal:props.margin ? 8 : 0}]} >
            <TouchableOpacity style={[styles.community,{backgroundColor:Colors.primary,flexDirection:props.item == "c" ? "row" : "column",height:props.item == "c" ? 50 : 70 ,display:cheakDisplay ? "flex" :"none"}]} onPress={()=>goTo(props.navigate)}>
                        <LinearGradient
                        colors={['#00000010', '#00000050']} 
                        style={{width:50,height:50,marginRight:10,borderTopLeftRadius:10,borderBottomLeftRadius:10,alignItems:'center',justifyContent:'center',display:props.item == "c"? "flex" :'none'}} >
                            <Text style={{fontSize:20,color:Colors.text}} >$_</Text>
                        </LinearGradient>
                        <View style={{display: props.item !== "c"  ?'flex' :'none' ,flex:1 ,alignItems:'center',justifyContent:'center'}} >
                          <FontAwesomeIcon size={20}  color={Colors.text} icon={ props.item == "focus" ? faHeadphones : props.item == "recycle" ? faTrash : props.item == "skills" ? faCake : props.item == "Forum" ? faMessage : props.item == "Ted" ? faQuestionCircle : faAngleUp}/>
                        </View>
                        <Text style={[styles.community_Text,{color:Colors.text,flex:1,textAlignVertical:'center',marginTop:props.item == "c"  ? 0 : -20}]} >{props.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.community,{height:props.item == "c" ? 50 : 40 ,display:props.item == "com" ? "flex" :"none",marginBottom:20,marginTop:20,overflow:'hidden'}]} onPress={()=>goTo(props.navigate)}>
                <ImageBackground source={mesh} style={{width:'100%'}} >
                  <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between'}} >
                    <Text style={[styles.community_Text,{color:Colors.text,marginLeft:20,fontSize:14}]} >{props.title}</Text>
                    <FontAwesomeIcon style={{marginRight:20,marginTop:10}} size={80} icon={faUsersCog} color={Colors.text} />
                  </View>
                </ImageBackground>
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