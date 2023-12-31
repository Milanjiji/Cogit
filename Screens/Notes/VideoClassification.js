import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet,FlatList, ScrollView } from "react-native";
import { storage } from "../../Storage";

import Class10Math from './../../assets/yt/Class10Maths.json'
import Class10Phy from './../../assets/yt/Class10Phy.json'
import Class10MChem from './../../assets/yt/Class10Chem.json'

import Class11Math from './../../assets/yt/Class11Maths.json'
import Class11Phy from './../../assets/yt/Class11Phy.json'
import Class11MChem from './../../assets/yt/Class11Chem.json'

import Class12Math from './../../assets/yt/Class12Maths.json'
import Class12Phy from './../../assets/yt/Class12Phy.json'
import Class12MChem from './../../assets/yt/Class12Chem.json'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const VideoClassification = ({route,navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [note,setNote] = useState([]);
    const {sub} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        const setNotes = async() =>{
            const value = storage.getString('class')
            console.log(Class10MChem[1]);
            if(value === 10) {
                console.log("class 10");
                if(sub === 'math'){
                    setNote(Class10Math);
                }else if(sub === 'phy'){
                    setNote(Class10Phy);
                }else if(sub === 'chem'){
                    setNote(Class10MChem);
                }else{
                    console.log('got some problem over the note selections');
                }
            }
            else if(value === '+1') {
                console.log("its +1 boys");
                if(sub === 'math'){
                    setNote(Class11Math);
                }else if(sub === 'phy'){
                    setNote(Class11Phy);
                }else if(sub === 'chem'){
                    setNote(Class11MChem);
                }else{
                    console.log('got some problem over the note selections');
                }
            }else if(value === '+2') {
                console.log("its +2 boys");
                if(sub === 'math'){
                    setNote(Class12Math);
                }else if(sub === 'phy'){
                    setNote(Class12Phy);
                }else if(sub === 'chem'){
                    setNote(Class12MChem);
                }else{
                    console.log('got some problem over the note selections');
                }
            }
        }
        setNotes();
        console.log(sub);
    },[])
    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1,marginTop:10}} >
               
                {
                    note.map((item, index) =>{
                        console.log(item);
                        return(
                           <TouchableOpacity onPress={()=>navigation.navigate('VideoClass',{link:item.link,name:item.name})} style={{padding:13,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
                            <View style={{flexDirection:'row',alignItems:'center'}} >
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12,marginRight:10}} >{item.id}</Text>   
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >{item.name}</Text>
                            </View>
                            <FontAwesomeIcon color={Colors.text} icon={faAngleRight} />
                           </TouchableOpacity>
                        );
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
        marginTop:3,
        padding: 10,
    }
})

export default VideoClassification;