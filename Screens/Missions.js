import React,{useEffect,useState} from "react";
import {StyleSheet, Text,View,Dimensions, TouchableOpacity, FlatList} from 'react-native';
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import Colors from '../colors.json';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import LoadingAnimation from "../components/LoadingAnimation";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Missions = ({navigation}) =>{
    const [MissionsTable,setMissionsTable] = useState(true);
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
      const fetchItems = async () =>{
        console.log(loading);
        try{
          const response = await fetch('https://firebasestorage.googleapis.com/v0/b/fir-e4bcf.appspot.com/o/Missions.json?alt=media&token=7cbf7171-2113-4e17-83b0-6f7c9e701335');
          const data = await response.json();
          setData(data.missions);
          setLoading(false);
          console.log(false);
        }catch(error){
          console.log(error);
        }
      }
      fetchItems()
    },[])
    const toggleBtn = () =>{
      setMissionsTable(!MissionsTable);
    }
    
    const renderItem = ({item}) =>{
      return(
        <View style={styles.missionContainer} >
            <FontAwesomeIcon color={Colors.white} style={{marginRight:10}} icon={faHashtag} />
            <Text style={styles.missionDisc} >{item.description}</Text>
        </View>
      )
    }

    return(
        <View style={{flex:1,backgroundColor:Colors.Background}} >
            <Header title="Missions" info='ellipsis' />
            <View style={{flex:1}} >
              <View style={styles.TabSelector_Container} >

                <TouchableOpacity onPress={toggleBtn} style={[styles.TabSelector_Btn,{borderBottomWidth : MissionsTable ? 3 : 0}]} >
                  <Text style={styles.TabSelector_Text} >Missions</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleBtn} style={[styles.TabSelector_Btn,{borderBottomWidth : MissionsTable ? 0 : 3}]} >
                  <Text style={styles.TabSelector_Text} >Completed</Text>
                </TouchableOpacity>
              </View>
              
              
                
             

              <View style={{flex:1,padding:8,display: MissionsTable ? 'flex' : 'none',width:width}} >
                <FlatList
                horizontal={false}
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={{flexGrow:1}}
                showsVerticalScrollIndicator={false}
                />
              </View>
              <View style={{flex:1,padding:8,display: !MissionsTable ? 'flex' : 'none'}} >
                <Text>
                  Completed
                </Text>
              </View>

              
            </View>
            <HomePageFootor navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
  TabSelector_Container:{
    backgroundColor:Colors.secondary,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  TabSelector_Btn:{
    padding:8,
    borderBottomColor:Colors.white,
    borderBottomWidth:3,
    width:'50%'
  },
  TabSelector_Text:{
    textAlign:'center',
    color:Colors.white,
    fontFamily:Colors.Bold
  },
  missionContainer:{
    flexDirection:'row',
    marginVertical:8,
    marginHorizontal:2,
    width:width-50,
    alignItems:'center',
  },
  missionDisc:{
    color:Colors.white
  },
  loading:{
    flex:1,
    justifyContent:'space-around',
    alignItems:'center'
  }
})
export default Missions;