import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { storage } from "../../Storage";

const VeryShort = ({navigation,route}) =>{
    const [Colors,setColors] = useState([])
    const {note} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        console.log(note);

    
    },[])

    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <ScrollView style={{flex: 1,paddingHorizontal:12}} >
                {
                    note.Topics.map(item => {
                        return(
                            <View>
                                <Text style={{color:Colors.text,fontFamily:Colors.Bold,marginTop:10}}  >{item.Topic}</Text>
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:20,fontSize:12}} >{item.Definition}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}


export default VeryShort;