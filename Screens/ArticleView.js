import React,{useState,useEffect} from "react";
import {View,Text, StyleSheet, FlatList, ScrollView, PermissionsAndroid} from 'react-native'
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import Colors from '../colors.json'
import { faOptinMonster } from "@fortawesome/free-brands-svg-icons";

const ArticleView = ({route,navigation}) =>{
    const [data,setData] = useState([])
    useEffect(()=>{
        setData(route.params);
    },[])
    
    return(
        <View style={{flex:1,backgroundColor:Colors.Background}} >
            <Header title="Community" info='ellipsis' />
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,margin:10,}} >
               <Text style={styles.title} >{data.title}</Text>
               <Text style={styles.overView} >{data.overView}</Text>
               <Text style={styles.content} >{data.content}</Text>
               
            </ScrollView>
            <HomePageFootor navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    title:{
        color:Colors.white,
        fontSize:24,
        fontFamily:Colors.ExtraBold,
        textAlign:'center'
    },
    overView:{
        color:Colors.white,
        fontSize:18,
        paddingVertical:20,
        textAlign:'center'
    },
    content:{
        color:Colors.white,
        textAlign:'center',
        borderBottomColor:Colors.white,
        borderBottomWidth:2,
        paddingBottom:10,
        marginBottom:10
    }
})
export default ArticleView;