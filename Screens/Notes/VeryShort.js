import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import HomePageFootor from "../../components/HomePageFootor";

const VeryShort = ({navigation,route}) =>{
    const [Colors,setColors] = useState([])
    const {note} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        console.log(note);

    
    },[])

    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <Header navigation={navigation}  title={note.Chapter} info=""/>
            <ScrollView style={{flex: 1,paddingHorizontal:12}} >
                {
                    note.Topics.map(item => {
                        return(
                            <View>
                                <Text style={{color:Colors.text,fontFamily:Colors.Bold,marginTop:10}}  >{item.Topic}</Text>
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:20}} >{item.Definition}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}


export default VeryShort;