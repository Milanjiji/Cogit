import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet,FlatList, ScrollView } from "react-native";

import Class10Math from './../../assets/DeepRawNote/Class10Maths.json'
import Class10Bio from './../../assets/DeepRawNote/Class10Bio.json'
import Class10Phy from './../../assets/DeepRawNote/Class10Phy.json'
import Class10MChem from './../../assets/DeepRawNote/Class10Chem.json'

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { storage } from "../../Storage";

import Class11Math from './../../assets/DeepRawNote/Class11Maths.json'
import Class11Bio from './../../assets/DeepRawNote/Class11Bio.json'
import Class11Phy from './../../assets/DeepRawNote/Class11Phy.json'
import Class11MChem from './../../assets/DeepRawNote/Class11Chem.json'

// import Class12Math from './../../assets/DeepRawNote/Class12Maths.json'
// import Class12Bio from './../../assets/DeepRawNote/Class12Bio.json'
// import Class12Phy from './../../assets/DeepRawNote/Class12Phy.json'
// import Class12MChem from './../../assets/DeepRawNote/Class12Chem.json'

const DeepClassification = ({route,navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [note,setNote] = useState([]);
    const [clas,setClass] = useState([]);
    const [title,seTtitle] = useState('');
    const {sub} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            console.log(colors);
            setColors(colors);

            

        }
        getColors();

        const setNotes = async() =>{
            const clas = storage.getString('class')
            const value = JSON.parse(clas);
            console.log(value);
            setNote(Class10Math);

            if(value === 10) {
                console.log("class 10");
                if(sub === 'math'){
                    setNote(Class10Math);
                        
                }else if(sub === 'phy'){
                    setNote(Class10Phy);
                }else if(sub === 'chem'){
                    setNote(Class10MChem);
                }else if(sub === 'bio'){
                    setNote(Class10Bio);
                }else{
                    console.log('got some problem over the note selections');
                }
            }else if(value === '+1') {
                console.log("its +1 boys");
                if(sub === 'math'){
                    setNote(Class11Math);
                }else if(sub === 'phy'){
                    setNote(Class11Phy);
                }else if(sub === 'chem'){
                    setNote(Class11MChem);
                }else if(sub === 'bio'){
                    setNote(Class11Bio);
                }else{
                    console.log('got some problem over the note selections');
                }
            }else if(value === '+2') {
        //     //     console.log("its +2 boys");
        //     //     if(sub === 'math'){
        //     //         setNote(Class12Math);
        //     //     }else if(sub === 'phy'){
        //     //         setNote(Class12Phy);
        //     //     }else if(sub === 'chem'){
        //     //         setNote(Class12MChem);
        //     //     }else if(sub === 'bio'){
        //     //         setNote(Class12Bio);
        //     //     }else{
        //     //         console.log('got some problem over the note selections');
        //     //     }
        //     // }
        }
    }
        setNotes();
        console.log(sub);

    },[])
    
    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1,marginTop:10}} >
               
                {
                    note.map(item => {
                        return(
                            <TouchableOpacity
                            onPress={() => {
                                const matchedArray = note.find(element => element.chapter === item.chapter);
                                console.log(matchedArray);
                                navigation.navigate('Deep',{note:matchedArray})
                              }}
                                key={item.chapter}  style={[styles.btn,{flex:1,justifyContent:'space-between',flexDirection:'row'}]} >
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >{item.chapter}</Text>
                                <FontAwesomeIcon color={Colors.text}  icon={faAngleRight} />
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
        marginTop:3,
        padding: 10,
    }
})

export default DeepClassification;