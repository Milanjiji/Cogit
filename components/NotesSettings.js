import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, FlatList,Dimensions } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";


const NoteScreenSettings = ({navigation}) =>{
    const [banner,setBanner] = useState(false);
    const [note,setNotes] = useState(false);
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
            console.log("Colors => ",colors);
        }
        getColors();

        const getDetails = async() =>{
            const currentState = await AsyncStorage.getItem('BannerPosition');
            const value = JSON.parse(currentState);
            setBanner(value);

            const NotescurrentState = await AsyncStorage.getItem('NotesPosition');
            const Notesvalue = JSON.parse(NotescurrentState);
            setNotes(Notesvalue);
        }
        getDetails();
    },[])


    const ChangeBanner = async() =>{
        setBanner(!banner);
        
        try {
            const valueStringed = JSON.stringify(!banner)
            await AsyncStorage.setItem('BannerPosition',valueStringed);
        } catch (error) {
            console.log(error);
        }
    }
    const ChangeNotes = async() =>{
        setNotes(!note);
        
        try {
            const valueStringed = JSON.stringify(!note)
            await AsyncStorage.setItem('NotesPosition',valueStringed);
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <View style={{backgroundColor:Colors.primary,padding: 10,margin:3,borderRadius:10,elevation:10}}>
            <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20}} >Notes</Text>
            <TouchableOpacity onPress={ChangeBanner} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Place banner to the last place</Text>
                <FontAwesomeIcon style={{marginRight:10}} color={Colors.text} icon={banner ? faCheckSquare : faSquare} />
            </TouchableOpacity>

            <TouchableOpacity onPress={ChangeNotes} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Place notes to the first place</Text>
                <FontAwesomeIcon style={{marginRight:10}} color={Colors.text} icon={note ? faCheckSquare : faSquare} />
            </TouchableOpacity>
        
        </View>
    );
}

const styles = StyleSheet.create({
    Top:{
        borderRadius:10,
        margin:3,
        padding: 10,
        
    }
})

export default NoteScreenSettings;
