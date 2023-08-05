import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import HomePageFootor from "../../components/HomePageFootor";
import SideBar from "../../components/SideBar";

const Classification = ({navigation,route}) =>{
    const [Colors,setColors] = useState([])
    const [title,setTitle] = useState('')
    const {sub} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        console.log(sub);
        if(sub=='math'){
            setTitle('Maths')
        }else if(sub=='chem'){
            setTitle('Chemistry')
        }else if(sub=='phy'){
            setTitle('Physics')
        }else if(sub=='bio'){
            setTitle('Biology')
        }
    },[])

    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around',flexDirection:'row'}} >
           <SideBar navigation={navigation} page={"Notes"} />

            <View style={{flex: 1,paddingHorizontal:10}} >
                <Header navigation={navigation}  title={title} info="" sideBar={true} />
                <TouchableOpacity style={{backgroundColor:Colors.hashWhite,padding: 10,borderRadius:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:24}} >Very short note</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Complete chapter notes in single page (only essentials)</Text>
                </TouchableOpacity>
                <View style={styles.grid} >
                    <TouchableOpacity onPress={()=>{navigation.navigate('BriefClassfication',{sub:sub})}} style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:20}} >Chapter Explained Briefly</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Chapter explained briefly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:20}} >Detailed Explanation of Topics</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Each Topic explained induvidually</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.grid} >
                    <TouchableOpacity onPress={()=>{navigation.navigate('DeepClassfication',{sub:sub})}} style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:20}} >Deep learn</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Chapter explained Deeply</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('VideoClassification',{sub:sub})}}  style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:20}} >Video Class</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Video Classes</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.grid} >
                    <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:20}} >Mock Text</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Simple Mock tests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:20}} >Mock Text</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Advanced Mock tests</Text>
                    </TouchableOpacity>
                </View>

                

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    btn:{
        margin:3,
        borderRadius:10,
        elevation:10,
        marginTop:10,
        padding: 15,
    },
    grid:{
        flexDirection:'row'
    }
})

export default Classification;