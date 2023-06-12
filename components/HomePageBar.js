import React,{useEffect,useState} from "react";
import { Text, View,StyleSheet, TouchableOpacity, Dimensions,ScrollView,ImageBackground, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from '../colors.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";




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
        <View style={[styles.App,{backgroundColor:Colors.Background}]} >
            <TouchableOpacity style={[styles.community,{backgroundColor:Colors.primary}]} onPress={()=>goTo(props.navigate)}>
                    <View>
                        <Text style={[styles.community_Text,{color:Colors.text}]} >{props.title}</Text>
                        <Text style={[styles.community_Disc,{color:Colors.text}]} >{props.disc}</Text>
                    </View>
                    <FontAwesomeIcon style={{}} color={Colors.text}  icon={faArrowRightFromBracket} />
            </TouchableOpacity>
            
        </View>
    )
}
const styles = StyleSheet.create({
    App:{
        flex:1,
        backgroundColor:Colors.Background
    },
      community:{
        margin:5,
        padding:8,
        backgroundColor:Colors.primary,
        borderRadius:10,
        elevation:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingRight:20
      },
      community_Text:{
        color:Colors.white,
        fontFamily:Colors.Bold,
        fontSize:24
      },
      community_Disc:{
        color:Colors.white,
        fontFamily:Colors.Regular,
      },
})
export default HomePageBar;