import React,{useState,useEffect} from "react";
import { View,Text,TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CutomTextInput from "../components/CutomTextInput";
import firestore from '@react-native-firebase/firestore';

const Report = ({navigation,route}) =>{

    const [Colors,setColors] = useState([]);
    const [data,setData] = useState([])
    const [text,setText] = useState('')
    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);
    const [send,setSend] = useState(false);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const name = JSON.parse(await AsyncStorage.getItem('userName'))
            const colors = JSON.parse(data);
            setColors(colors);
            setName(name);
        }
        getColors();
        setData(route.params);
        console.log("routet params" , route.params);
    },[])
    const postReport = async () =>{
        if(text){
            setLoading(true)
            try {
                await firestore()
                        .collection('Report')
                        .add({
                            id:data.id,
                            page:data.page,
                            name:name
                        }).then(() => {
                            setLoading(false);
                            setSend(true);
                            console.log('Message sent successfully');
                            setText('');
                            setTimeout(() => {
                                navigation.navigate(data.page == 'Skills' ? 'Skills' : 'Community')
                            }, 2000);
                        })
            } catch (error) {
                console.log("error sending message");
            }
        }
    }


    return(
        <View style={{backgroundColor:Colors.Background,flex: 1,}} >
            <Text style={{color:Colors.text,textAlign:'center',fontSize:20,fontFamily:Colors.Bold,marginVertical:10}} >Report</Text>

            <CutomTextInput multiLine={true} value={text} onTextChange={setText} color={Colors.text} textColor={Colors.text} fontFamily={Colors.Medium} label="why are you reporting the content" borderColor={Colors.text} horizontal={10} marginTop={10}  />
            <View style={{flex: 1,}} ></View>
            <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',display:loading ? 'flex' : 'none' }} >Sending Report...</Text>
            <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',display:send ? 'flex' : 'none'}} >Thanks for sending the report.</Text>
            <TouchableOpacity onPress={postReport} style={{backgroundColor:text ? Colors.primary : Colors.hashWhite ,padding: 10,borderRadius:30,alignItems:'center',marginVertical:10,marginHorizontal:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Send Report</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Report;