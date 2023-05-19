import React, { useState,useEffect } from "react";
import { View,Text, StyleSheet, TouchableOpacity,Dimensions, FlatList } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Colors from '../colors.json'
import { faArrowRight, faDotCircle, faHashtag, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Achievement = () =>{
    const [missions,setMissions] = useState([])
    const [loading,setLoading] = useState(false);
    const missionsToRender = missions.filter(missions => missions.id < 3)
    const width =Dimensions.get('window').width
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

    useEffect(()=>{
        const fetchItems = async () =>{
        setLoading(true);
          try{
            const response = await fetch('https://firebasestorage.googleapis.com/v0/b/fir-e4bcf.appspot.com/o/Missions.json?alt=media&token=7cbf7171-2113-4e17-83b0-6f7c9e701335');
            const data = await response.json();
            setMissions(data.missions);
            if(data){
                setLoading(false);
            }
          }catch(error){
            console.log(error);
          }
        }
        fetchItems();
      },[])

    
    return(
        <View style={[styles.body,{width:width-140,backgroundColor:Colors.primary}]} >
            <Text style={[styles.title,{color:Colors.text}]} >Achievements(0)</Text>
            
            <View style={styles.mission_Info_container} >
                <FontAwesomeIcon color={Colors.text} icon={faInfoCircle} />
                <Text style={[styles.mission_Info,{color:Colors.text}]} >Complete Missions to earn badges</Text>
            </View>
            <Text style={[styles.mission_title,{color:Colors.text}]} >Missions</Text>
            <View style={{height:135,overflow:'hidden',padding:4,display:loading ? 'none' : 'flex'}} >
            {
                missionsToRender.map(item =>{
                    return (
                        <View key={item.id} style={{flexDirection:'row',alignItems:'center',marginVertical:5}} >
                            <FontAwesomeIcon style={{paddingHorizontal:10}} icon={faDotCircle} color={Colors.text} />
                            <Text style={{color:Colors.text,width:'90%',textAlign:'left',fontFamily:Colors.Medium}} key={item.id} >{item.description}</Text>
                        </View>
                    )
                })
            }
            </View>
            <Text style={{color:Colors.text,fontFamily:Colors.Medium,display:loading ? 'flex':'none',marginTop:10}} >Loading...</Text>
            <TouchableOpacity style={[styles.Missions_Container,{backgroundColor:Colors.secondary}]} >
                <Text style={[styles.open_Missions,{color:Colors.text}]} >Missions </Text>
                <FontAwesomeIcon color={Colors.text} icon={faArrowRight} />
            </TouchableOpacity>    
            
            
        </View>
    )
}
const styles=  StyleSheet.create({
    body:{
        backgroundColor:Colors.primary,
        margin:3,
        borderRadius:10,
        padding:10,
        height:250,
        alignItems:'center',
        elevation:10
    },
    title:{
        color:Colors.white,
        fontFamily:Colors.Bold,
        alignSelf:'flex-start'
    },
    badgesNumber:{
        marginTop:10,
        color:Colors.primary,
        marginLeft:10,
        fontWeight:500
    },
    mission_Info_container:{
        marginHorizontal:10,
        flexDirection:'row',
        padding:3,
        justifyContent:'space-evenly',
        borderRadius:10,
        alignItems:'center'
    },
    mission_Info:{
        color:Colors.white,
        paddingLeft:10
    },
    open_Missions:{
        color:Colors.primary,
        marginHorizontal:10,
        fontFamily:Colors.ExtraBold,
    },
    Missions_Container:{
        backgroundColor:Colors.white,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-around',
        width:150,
        paddingHorizontal:20,
        paddingVertical:5,
        marginTop:7,
        
    },
    mission_title:{
        color:Colors.white,
        borderBottomColor:Colors.white,
        borderBottomWidth:1,
        width:'100%',
        textAlign:'center'
    }
    
})
export default Achievement;