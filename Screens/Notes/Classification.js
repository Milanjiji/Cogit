import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import HomePageFootor from "../../components/HomePageFootor";

const Classification = ({sub,clas,navigation}) =>{
    const [Colors,setColors] = useState([])
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

    return(
        <View style={{flex: 1,backgroundColor:Colors.Background}} >
            <Header navigation={navigation}  title="Maths" info=""/>
            <View style={{flex: 1,}} >
                <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary}]} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20}} >Chapter Explained Briefly</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Summary of every Topic</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary}]} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20}} >Detailed Explanation of Topics</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Each Topic explained induvidually</Text>
                </TouchableOpacity>
            </View>
            <HomePageFootor navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    btn:{
        margin:3,
        borderRadius:10,
        elevation:10,
        marginTop:10,
        padding: 10,
    }
})

export default Classification;