import React,{useState,useEffect,useRef} from "react";
import {View,Text,ScrollView,StyleSheet,TextInput,Dimensions, TouchableOpacity,Touchable} from 'react-native'
import Colors from '../colors.json';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { storage } from "../Storage";

const NoteCreator = ({navigation,route}) =>{
    const [note,setNote] = useState('');
    const textInput = useRef(null)
    const height  = Dimensions.get('window').height
    const {id,title} = route.params;
    const [theme,setTheme] = useState(false);
    const [Colors,setColors] = useState([])


    useEffect(()=>{
        const getNote = async () =>{
            const Notes = storage.getString(id);
            if(Notes){
                setNote(Notes) 
            }else{
                
            }
            console.log(title);
        }
        getNote();

    },[])
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])
    

    const SaveNote = async(text) =>{
        setNote(text);
        storage.set(id,note);
    }
    const focusToTextInput = () =>{
        textInput.current.focus();
    }
    const ToggleTheme = () => {
        setTheme(!theme)
    }
        return(
        <View style={[styles.body,{backgroundColor:'transparent'}]} >
            <ScrollView style={styles.area} showsVerticalScrollIndicator={false} >
                <TouchableOpacity activeOpacity={1} style={{height:height-100}} onPress={focusToTextInput} >

                
                <TextInput
                    ref={textInput}
                    placeholder="Type your notes here" 
                    style={[styles.noteInput,{color:Colors.text}]}
                    multiline={true}
                    numberOfLines={undefined}
                    onChangeText={SaveNote}
                    value={note}
                    placeholderTextColor={Colors.secondary}
                     />
                    </TouchableOpacity>
               
            </ScrollView>
            <TouchableOpacity onPress={ToggleTheme} style={{alignSelf:'flex-end',marginBottom:10,marginRight:10}} >
                    <FontAwesomeIcon color={Colors.text} icon={faSun} />
            </TouchableOpacity>
            
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