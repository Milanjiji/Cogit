import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, FlatList,Dimensions } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";


const HomeScreenSettings = ({navigation}) =>{
    const [iconHide,setIconHide] = useState(false);
    const [AchivementHide,setAchivementHide] = useState(false);
    const [noteHide,setNotesHide] = useState(false);
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
            const currentState = await AsyncStorage.getItem('SmallIconStatus');
            const value = JSON.parse(currentState);
            setIconHide(value);

            const AchivementcurrentState = await AsyncStorage.getItem('AchivementStatus');
            const Achivementvalue = JSON.parse(AchivementcurrentState);
            setAchivementHide(Achivementvalue);

            const NotescurrentState = await AsyncStorage.getItem('AchivementStatus');
            const Notesvalue = JSON.parse(NotescurrentState);
            setNotesHide(Notesvalue);
        }
        getDetails();
    },[])


    const IconHide = async() =>{
        setIconHide(!iconHide);
        
        try {
            const valueStringed = JSON.stringify(!iconHide)
            await AsyncStorage.setItem('SmallIconStatus',valueStringed);
        } catch (error) {
            console.log(error);
        }
    }
    const Achivement = async() =>{
        setAchivementHide(!AchivementHide);
        
        try {
            const valueStringed = JSON.stringify(!AchivementHide)
            await AsyncStorage.setItem('AchivementStatus',valueStringed);
        } catch (error) {
            console.log(error);
        }
    }
    const Notes = async() =>{
        setNotesHide(!noteHide);
        
        try {
            const valueStringed = JSON.stringify(!noteHide)
            await AsyncStorage.setItem('NoteStatus',valueStringed);
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <View style={{backgroundColor:Colors.primary,padding: 10,margin:3,borderRadius:10,elevation:10}}>
            <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20}} >Home</Text>
            <TouchableOpacity onPress={IconHide} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Hide small icons from home screen</Text>
                <FontAwesomeIcon style={{marginRight:10}} color={Colors.text} icon={iconHide ? faCheckSquare : faSquare} />
            </TouchableOpacity>

            <TouchableOpacity onPress={Achivement} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Hide Achivements from home screen</Text>
                <FontAwesomeIcon style={{marginRight:10}} color={Colors.text} icon={AchivementHide ? faCheckSquare : faSquare} />
            </TouchableOpacity>

            <TouchableOpacity onPress={Notes} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Place notes to the first place</Text>
                <FontAwesomeIcon style={{marginRight:10}} color={Colors.text} icon={noteHide ? faCheckSquare : faSquare} />
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

export default HomeScreenSettings;
