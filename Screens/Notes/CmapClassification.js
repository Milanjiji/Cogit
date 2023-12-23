import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet,FlatList, ScrollView } from "react-native";
import { storage } from "../../Storage";

import Class11Phy from '../../assets/Cmaps/Class11Phy.json'
import Class12Phy from '../../assets/Cmaps/Class12Phy.json'
import Class11Chem from '../../assets/Cmaps/Class11Chem.json'
import Class12Chem from '../../assets/Cmaps/Class12Chem.json'
import Class11Maths from '../../assets/Cmaps/Class11Maths.json'
import DownloadAndSavePdf from "../../components/DownloadAndSavePdf";

const CmapClassification = ({route,navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [cmap,setCmap] = useState([]);
    const {sub} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        const setNotes = async() =>{
            const clas = storage.getString('class')

            console.log(clas);

             if(clas === '+1') {
                console.log("its +1 boys");
                if(sub === 'math'){
                    setCmap(Class11Maths);
                }else if(sub === 'phy'){
                    setCmap(Class11Phy);
                }else if(sub === 'chem'){
                    setCmap(Class11Chem);
                }else{
                    console.log('got some problem over the note selections');
                }
            }else if(clas === '+2') {
                console.log("its +2 boys");
                if(sub === 'math'){
                    // setCmap(Class12Math);
                    setCmap(Class12Phy);
                }else if(sub === 'phy'){
                    setCmap(Class12Phy);
                }else if(sub === 'chem'){
                    setCmap(Class12Chem);
                }else{
                    console.log('got some problem over the note selections');
                }
            }
        }
        setNotes();
        console.log(sub);

    },[])
    
    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around',paddingTop:10,paddingBottom:20}} >
            <FlatList
            data={cmap}
            keyExtractor={(item)=>{item.id}}
            renderItem={(item)=> <DownloadAndSavePdf navigation={navigation} data={item} /> }
            />
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

export default CmapClassification;