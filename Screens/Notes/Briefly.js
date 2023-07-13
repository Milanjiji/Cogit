import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import HomePageFootor from "../../components/HomePageFootor";

const Brief = ({navigation,route}) =>{
    const [Colors,setColors] = useState([])
    const {note} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        console.log(note.topics);
    
    },[])

    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <Header navigation={navigation}  title="Maths" info=""/>
            <ScrollView style={{flex: 1,paddingHorizontal:12}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold,textAlign:'center',fontSize:28,marginTop:10}} >{note.chapter}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginTop:10}} >{note.chapterOverview}</Text>
                {
                    note.topics.map(item => {
                        return(
                            <View>
                                <Text style={{color:Colors.text,textAlign:'center',marginTop:10,fontFamily:Colors.Bold}} >{item.title}</Text>
                                <View>
                                    {
                                        item.content.map(item =>{
                                            return(
                                                <View>
                                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginTop:10}} >{item.definition}: </Text>
                                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:20}} >{item.example}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        )
                    })
                }
                <View style={{height:50}} ></View>
            </ScrollView>
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

export default Brief;