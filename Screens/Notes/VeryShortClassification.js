import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet,FlatList, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import HomePageFootor from "../../components/HomePageFootor";

import Class10Maths from '../../assets/VeryshortNote/Class10CbseMaths.json'
import Class10Phy from '../../assets/VeryshortNote/Class10CbsePhy.json'
import Class10Chem from '../../assets/VeryshortNote/Class10CbseChem.json'
import Class10Bio from '../../assets/VeryshortNote/Class10CbseBio.json'


// import Class10Math from './../../assets/rawNotes/Class10Maths.json'
// import Class10Bio from './../../assets/rawNotes/Class10Bio.json'
// import Class10Phy from './../../assets/rawNotes/Class10Phy.json'
// import Class10MChem from './../../assets/rawNotes/Class10Chem.json'

// import Class11Math from './../../assets/rawNotes/Class11Maths.json'
// import Class11Bio from './../../assets/rawNotes/Class11Bio.json'
// import Class11Phy from './../../assets/rawNotes/Class11Phy.json'
// import Class11MChem from './../../assets/rawNotes/Class11Chem.json'

// import Class12Math from './../../assets/rawNotes/Class12Maths.json'
// import Class12Bio from './../../assets/rawNotes/Class12Bio.json'
// import Class12Phy from './../../assets/rawNotes/Class12Phy.json'
// import Class12MChem from './../../assets/rawNotes/Class12Chem.json'

const VeryShortClassification = ({route,navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [note,setNote] = useState([]);
    const [clas,setClass] = useState([]);
    const {sub} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        // setNote(Class10Maths);

        const setNotes = async() =>{
            const clas = await AsyncStorage.getItem('class');
            const value = JSON.parse(clas);
            console.log(value,sub);


            if(value == 10) {
                console.log("class 10");
                if(sub === 'math'){
                    setNote(Class10Maths);
                    console.log(Class10Maths);
                }else if(sub === 'phy'){
                    setNote(Class10Phy);
                }else if(sub === 'chem'){
                    setNote(Class10Chem);
                }else if(sub === 'bio'){
                    setNote(Class10Bio);
                }else{
                    console.log('got some problem over the note selections');
                }
            // }else if(value == '+1') {
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
            // }else if(value == '+2') {
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
            }
        }
        setNotes();
        
        console.log(sub);
    },[])
    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <Header navigation={navigation}  title="Short Note" info=""/>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1,marginTop:10}} >
               
                {
                    note.map(item =>{
                        return(
                            <TouchableOpacity
                            onPress={() => {
                                const matchedArray = note.find(element => element.Chapter === item.Chapter);
                                console.log(matchedArray);
                                navigation.navigate('VeryShort',{note:matchedArray})
                              }}
                                key={item.Chapter}  style={[styles.btn,{flex:1,justifyContent:'center'}]} >
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >{item.Chapter}</Text>
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
        marginTop:3,
        padding: 10,
        marginHorizontal:10
    }
})

export default VeryShortClassification;