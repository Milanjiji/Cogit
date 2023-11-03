import React,{useState,useEffect} from "react"
import { StyleSheet, Text, View } from "react-native"
import { storage } from "../Storage";

const AboutUs = ({navigation}) =>{
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

    },[])

    const Person = ({name,letterSpacing,position}) =>{
        return(
            <View style={{width:'90%',backgroundColor:Colors.primary,alignSelf:'center',borderRadius:10,justifyContent:'space-around',alignItems:'center',paddingVertical:30,marginTop:10}} >
                <View style={{width:100,height:100,borderRadius:100,backgroundColor:'red'}} >

                </View>
                <Text style={{color:Colors.text,fontFamily:Colors.Bold,marginTop:10,letterSpacing:letterSpacing}} >{name}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginTop:10,letterSpacing:letterSpacing}} >{position}</Text>
            </View>
        )
    }

    return(
        <View style={[styles.body,{backgroundColor:Colors.Background}]} >
            <View style={{width:'50%'}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:40,marginVertical:20,marginLeft:20}} >About Us</Text>
                <Person name={'Gayatry'} letterSpacing={4} position={'Writer'} />
            </View>
            <View style={{width:'50%',paddingTop:30,justifyContent:'space-around'}} >
                <Person name={'Milan'} letterSpacing={4} position={'Developer'} />
                <Person name={'Isha Navas'} letterSpacing={4} position={'Developer'} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        flexDirection:'row'
    }
})
export default AboutUs;