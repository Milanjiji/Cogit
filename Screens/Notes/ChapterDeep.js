import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import HomePageFootor from "../../components/HomePageFootor";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretSquareRight, faCircleNotch, faDotCircle, faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";

const DeepExplanation = ({navigation,route}) =>{
    const [Colors,setColors] = useState([])
    const {note} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        console.log(note.subTopics);
    
    },[])

    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <Header navigation={navigation}  title="Maths" info=""/>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1,paddingHorizontal:12}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold,textAlign:'center',fontSize:28,marginTop:10}} >{note.chapter}</Text>
                {
                    note.subTopics.map(item => {
                        return(
                            <View>
                                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Bold}} >{item.title}</Text>
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10,marginTop:10,marginBottom:15}} >{item.explanation}</Text>
                                <View>
                                    <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Bold}} >keyPoints:</Text>
                                    {
                                        item.keyPoints.map(item => {
                                            return(
                                                <View key={item}  style={{flexDirection:'row',alignItems:'center',marginTop:5,marginHorizontal:20}} >
                                                    <FontAwesomeIcon color={Colors.text} icon={faCaretSquareRight} />
                                                    <Text style={{color:Colors.text,marginTop:5,fontFamily:Colors.Medium,marginLeft:10}} >{item}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View>
                                    <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Bold}} >Examples: </Text>
                                    {   
                                        
                                        item.examples.map(item => {
                                            return(
                                                <View key={item}  style={{flexDirection:'row',alignItems:'center',marginTop:5,marginHorizontal:20}} >
                                                    <FontAwesomeIcon color={Colors.text} icon={faDotCircle} />
                                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >{item}</Text>
                                                </View>    
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        )
                    })
                }
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

export default DeepExplanation;