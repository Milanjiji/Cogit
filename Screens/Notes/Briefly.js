import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { storage } from "../../Storage";

const Brief = ({navigation,route}) =>{
    const [Colors,setColors] = useState([])
    const {note} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        console.log(note.topics);
    
    },[])

    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <ScrollView style={{flex: 1,paddingHorizontal:12}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold,textAlign:'center',fontSize:18,marginTop:10}} >{note.chapter}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginTop:10,fontSize:12}} >{note.chapterOverview}</Text>
                {
                    note.topics.map(item => {
                        return(
                            <View>
                                <Text style={{color:Colors.text,textAlign:'center',marginTop:10,fontFamily:Colors.Bold,fontSize:18}} >{item.title}</Text>
                                <View>
                                    {
                                        item.content.map(item =>{
                                            return(
                                                <View>
                                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginTop:10,fontSize:14}} >{item.definition}: </Text>
                                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:20,fontSize:12}} >{item.example}</Text>
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