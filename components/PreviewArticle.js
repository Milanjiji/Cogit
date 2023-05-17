import React,{useState,useEffect} from "react";
import {View,Text, StyleSheet,  ScrollView} from 'react-native'
import Colors from '../colors.json'
import AsyncStorage from "@react-native-async-storage/async-storage";


const PreviewArticle = ({title,overView,content,extra}) =>{
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
        <View style={{flex:1,backgroundColor:Colors.Background}} >
            
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,margin:10,}} >
               <Text style={[styles.title,{color:Colors.text}]} >{title}</Text>
               <Text style={[styles.overView,{color:Colors.text}]} >{overView}</Text>
               <Text style={[styles.content,{color:Colors.text}]} >{content}</Text>
               <Text style={[styles.extra,{color:Colors.text}]} >{extra}</Text>
               
            </ScrollView>
            
        </View>
    )
}
const styles = StyleSheet.create({
    title:{
        fontSize:24,
        fontFamily:Colors.ExtraBold,
        textAlign:'center'
    },
    overView:{
        fontSize:18,
        paddingVertical:20,
        textAlign:'center',
        fontFamily:Colors.MediumItalic
    },
    content:{
        textAlign:'center',
        paddingBottom:10,
        marginBottom:10,
        fontFamily:Colors.Medium
    },
    extra:{
        textAlign:'center',
        paddingBottom:10,
        marginBottom:10,
        fontFamily:Colors.Medium
    }
})
export default PreviewArticle;