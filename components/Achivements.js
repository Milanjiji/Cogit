import React, { useState } from "react";
import { View,Text, StyleSheet, TouchableOpacity,Dimensions, FlatList } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Colors from '../colors.json'
import { faArrowRight, faInfoCircle } from "@fortawesome/free-solid-svg-icons";


const Achievement = () =>{
    const [missions,setMissions] = useState([
        {id:1,mission:'complete a mission'},
        {id:2,mission:'complete a mission'},
        {id:3,mission:'complete a mission'},
        {id:4,mission:'complete a mission'},
        {id:5,mission:'complete a mission'},
        {id:6,mission:'complete a mission'},
        {id:7,mission:'complete a mission'},
        {id:8,mission:'complete a mission'},
        {id:9,mission:'complete a mission'},
        {id:10,mission:'complete a mission'}
    ])
    const missionsToRender = missions.filter(missions => missions.id < 7)
    const width =Dimensions.get('window').width

    
    return(
        <View style={[styles.body,{width:width-140}]} >
            <Text style={styles.title} >Achievements(0)</Text>
            
            <View style={styles.mission_Info_container} >
                <FontAwesomeIcon color={Colors.black} icon={faInfoCircle} />
                <Text style={styles.mission_Info} >Complete Missions to earn badges</Text>
            </View>
            <Text style={styles.mission_title} >Missions</Text>
            <View  >
            {
                missionsToRender.map(item =>{
                    return <Text style={{color:'black'}} key={item.id} >{item.mission}</Text>
                })
            }
            </View>
            
            <TouchableOpacity style={styles.Missions_Container} >
                <Text style={styles.open_Missions} >Missions </Text>
                <FontAwesomeIcon color={Colors.white} icon={faArrowRight} />
            </TouchableOpacity>    
            
            
        </View>
    )
}
const styles=  StyleSheet.create({
    body:{
        backgroundColor:Colors.white,
        margin:3,
        borderRadius:10,
        padding:10,
        height:250,
        alignItems:'center'
    },
    title:{
        color:Colors.primary,
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
        color:Colors.black,
        paddingLeft:10
    },
    open_Missions:{
        color:Colors.white,
        marginHorizontal:10,
        fontFamily:Colors.ExtraBold,
    },
    Missions_Container:{
        backgroundColor:Colors.primary,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-around',
        width:150,
        paddingHorizontal:20,
        paddingVertical:5,
        marginTop:7
    },
    mission_title:{
        color:Colors.black,
        borderBottomColor:Colors.black,
        borderBottomWidth:1,
        width:'100%',
        textAlign:'center'
    }
    
})
export default Achievement;