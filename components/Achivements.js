import React, { useState,useEffect } from "react";
import { View,Text, StyleSheet, TouchableOpacity,Dimensions, FlatList } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Colors from '../colors.json'
import { faArrowRight, faHashtag, faInfoCircle } from "@fortawesome/free-solid-svg-icons";


const Achievement = () =>{
    const [missions,setMissions] = useState([])
    const missionsToRender = missions.filter(missions => missions.id < 3)
    const width =Dimensions.get('window').width

    useEffect(()=>{
        const fetchItems = async () =>{
          try{
            const response = await fetch('https://firebasestorage.googleapis.com/v0/b/fir-e4bcf.appspot.com/o/Missions.json?alt=media&token=7cbf7171-2113-4e17-83b0-6f7c9e701335');
            const data = await response.json();
            setMissions(data.missions);
            console.log(data.missions);
          }catch(error){
            console.log(error);
          }
        }
        fetchItems()
      },[])

    
    return(
        <View style={[styles.body,{width:width-140}]} >
            <Text style={styles.title} >Achievements(0)</Text>
            
            <View style={styles.mission_Info_container} >
                <FontAwesomeIcon color={Colors.white} icon={faInfoCircle} />
                <Text style={styles.mission_Info} >Complete Missions to earn badges</Text>
            </View>
            <Text style={styles.mission_title} >Missions</Text>
            <View style={{height:110,overflow:'hidden',padding:4}} >
            {
                missionsToRender.map(item =>{
                    return (
                        <View key={item.id} style={{flexDirection:'row',alignItems:'center'}} >
                            <FontAwesomeIcon style={{paddingHorizontal:10}} icon={faHashtag} color={Colors.white} />
                            <Text style={{color:Colors.white,width:220,textAlign:'center'}} key={item.id} >{item.description}</Text>
                        </View>
                    )
                })
            }
            </View>
            
            <TouchableOpacity style={styles.Missions_Container} >
                <Text style={styles.open_Missions} >Missions </Text>
                <FontAwesomeIcon color={Colors.black} icon={faArrowRight} />
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
        justifyContent:'center',
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
        marginTop:7
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