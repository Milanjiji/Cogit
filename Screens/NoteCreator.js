import React,{useState,useEffect} from "react";
import {View,Text,ScrollView,StyleSheet,TextInput,Dimensions} from 'react-native'
import Colors from '../colors.json';
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteCreator = (navigation) =>{
    const [note,setNote] = useState('');

    useEffect(()=>{
        const getNote = async () =>{
            const Notes = await AsyncStorage.getItem("NoteCreator_Note");
            setNote(Notes)
        }
        getNote();
    },[])
    const setData = async () =>{
        await AsyncStorage.setItem("NoteCreator_Note",note);
    }

    const SaveNote = (text) =>{
        setNote(text);
        setData()
    }
        return(
        <View style={styles.body} >
            <Header title={'Notes'} info={'ellipsis'} />
            <ScrollView style={styles.area} >
                <TextInput
                    placeholder="Type your notes here" 
                    style={styles.noteInput}
                    multiline={true}
                    numberOfLines={undefined}
                    onChangeText={SaveNote}
                    value={note}
                     />
            </ScrollView>
            
            <HomePageFootor navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:Colors.NoteBackground
    },
    area:{
        flex:1,
    },
    noteInput:{
        flex:1,
        padding:15,
        color:Colors.black
    }
})

export default NoteCreator;