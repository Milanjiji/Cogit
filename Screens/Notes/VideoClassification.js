import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet,FlatList, ScrollView } from "react-native";

import Class10Math from './../../assets/yt/Class10Maths.json'
import { storage } from "../../Storage";
import Class10Phy from './../../assets/yt/Class10Phy.json'
import Class10MChem from './../../assets/yt/Class10Chem.json'

import Class11Math from './../../assets/yt/Class11Maths.json'
import Class11Phy from './../../assets/yt/Class11Phy.json'
import Class11MChem from './../../assets/yt/Class11Chem.json'

import Class12Math from './../../assets/yt/Class12Maths.json'
import Class12Phy from './../../assets/yt/Class12Phy.json'
import Class12MChem from './../../assets/yt/Class12Chem.json'

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

            if(value === 10) {
                console.log("class 10");
                if(sub === 'math'){
                    setNote(Class10Math);
                }else if(sub === 'phy'){
                    // setNote(Class10Phy);
                }else if(sub === 'chem'){
                    // setNote(Class10MChem);
                }else if(sub === 'bio'){
                    // setNote(Class10Bio);
                }else{
                    console.log('got some problem over the note selections');
                }
            }
            // else if(value === '+1') {
            //     console.log("its +1 boys");
            //     if(sub === 'math'){
            //         setNote(Class11Math);
            //     }else if(sub === 'phy'){
            //         setNote(Class11Phy);
            //     }else if(sub === 'chem'){
            //         setNote(Class11MChem);
            //     }else if(sub === 'bio'){
            //         setNote(Class11Bio);
            //     }else{
            //         console.log('got some problem over the note selections');
            //     }
            // }else if(value === '+2') {
            //     console.log("its +2 boys");
            //     if(sub === 'math'){
            //         setNote(Class12Math);
            //     }else if(sub === 'phy'){
            //         setNote(Class12Phy);
            //     }else if(sub === 'chem'){
            //         setNote(Class12MChem);
            //     }else if(sub === 'bio'){
            //         setNote(Class12Bio);
            //     }else{
            //         console.log('got some problem over the note selections');
            //     }
            // }
        }
        setNotes();
        
        console.log(sub);
    },[])
    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1,marginTop:10}} >
               
                {
                    note.map(item =>{
                        return(
                            <TouchableOpacity
                            onPress={() => {
                                const matchedArray = note.find(element => element.chapter === item.chapter);
                                console.log(matchedArray);
                                navigation.navigate('VideoClass',{note:matchedArray,sub:sub})
                              }}
                                key={item.chapter}  style={[styles.btn,{backgroundColor:Colors.primary,flex:1,justifyContent:'center'}]} >
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >{item.chapter}</Text>
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