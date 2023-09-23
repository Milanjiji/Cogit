import React,{useState,useEffect} from "react"
import { StyleSheet, Text, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomePageFootor from "../components/HomePageFootor";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const AboutUs = ({navigation}) =>{
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

    },[])
    
    const Person = ({name,letterSpacing,position,contact}) =>{
        return(
            <View style={{width:'90%',backgroundColor:Colors.primary,alignSelf:'center',borderRadius:10,justifyContent:'space-around',alignItems:'center',paddingVertical:30,marginTop:10}} >
                <View style={{width:100,height:100,borderRadius:100,backgroundColor:'red'}} >

                </View>
                <Text style={{color:Colors.text,fontFamily:Colors.Bold,marginTop:10,letterSpacing:letterSpacing}} >{name}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginTop:10,letterSpacing:letterSpacing}}  >{position}</Text>
                <View style={{flexDirection:'row',display:contact ? 'flex' :'none',alignItems:'center',justifyContent: 'center',marginTop:10}} >
                    <FontAwesomeIcon color={Colors.text} size={10}  icon={faInstagram} />
                    <Text style={{display: contact ? 'flex' : 'none',color:Colors.text,fontFamily:Colors.Medium,fontSize:10,marginLeft:5}} >@m_i_l_an___</Text>
                </View>
                
            </View>
        )
    }

    return(
        <View style={[styles.body,{backgroundColor:Colors.Background}]} >
            <View style={{flex: 1,flexDirection:'row'}} >
                <View style={{width:'50%'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:40,marginVertical:20,marginLeft:20}} >About Us</Text>
                    <Person name={'Gayatry'} letterSpacing={4} position={'Writer'}  />
                    <Person name={'Akshay Ts'} letterSpacing={4} position={'Floater'} />
                </View>
                <View style={{width:'50%',paddingTop:10,}} >
                    <Person contact={true} name={'Milan'} letterSpacing={4} position={'Developer'} />
                    <Person name={'Isha Navas'} letterSpacing={4} position={'Writer'} />
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
    }
})
export default AboutUs;