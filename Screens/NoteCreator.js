import React,{useState,useEffect,useRef} from "react";
import {View,Text,ScrollView,StyleSheet,TextInput,Dimensions, TouchableOpacity,Touchable} from 'react-native'
import Colors from '../colors.json';
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteCreator = ({navigation,route}) =>{
    const [note,setNote] = useState('');
    const textInput = useRef(null)
    const height  = Dimensions.get('window').height
    const {id,title} = route.params;
    const [theme,setTheme] = useState(true)


    useEffect(()=>{
        const getNote = async () =>{
            const Notes = await AsyncStorage.getItem(id);
            if(Notes){
                setNote(Notes) 
            }else{
                
            }
            console.log(title);
        }
        getNote();

    },[])
    const setData = async () =>{
        await AsyncStorage.setItem(id,note);
    }

    const SaveNote = (text) =>{
        setNote(text);
        setData();
    }
    const focusToTextInput = () =>{
        textInput.current.focus();
    }
    const test =() =>{

    }
        return(
        <View style={[styles.body,{backgroundColor:theme ? Colors.NoteBackground : Colors.Background}]} >
            <Header title={title} pageSettings={test} info={theme ? 'darkMode' : 'lightMode'} />
            <ScrollView style={styles.area} >
                <TouchableOpacity activeOpacity={1} style={{height:height-100}} onPress={focusToTextInput} >

                
                <TextInput
                    ref={textInput}
                    placeholder="Type your notes here" 
                    style={styles.noteInput}
                    multiline={true}
                    numberOfLines={undefined}
                    onChangeText={SaveNote}
                    value={note}
                    placeholderTextColor={Colors.secondary}
                     />
                    </TouchableOpacity>
            </ScrollView>
            
            <HomePageFootor navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    body:{
        flex:1,
        
    },
    area:{
        flex:1,
    },
    noteInput:{
        padding:15,
        color:Colors.black
    }
})

export default NoteCreator;