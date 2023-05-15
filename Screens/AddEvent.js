import React,{useState,useEffet, useEffect} from "react";
import { View,Text, FlatList,StyleSheet, Touchable, TouchableOpacity, TextInput,ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import firestore from '@react-native-firebase/firestore';
import Colors from '../colors.json'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";


const AddEvents = ({navigation}) =>{
    const [title,setTitle] = useState('');
    const [disc,setDisc] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [date,setDate] = useState();
    const [web,setWeb] = useState('');
    const [totalEvent,setTotalEvent] = useState();

    const [warn,setWarn] = useState(false);

    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const lastId = async() =>{
            const users = await firestore().collection('Events').get()
            const events = users.docs.map(doc => doc.data())
            setTotalEvent(users.size);
            console.log('totaol event => ',users.size);
        }
        lastId()
    },[])

    const Submit = async () =>{
        if(
            title && disc && date
        ){
            console.log(title,disc,email,phone,date,web);
            setWarn(false);
        try{
            firestore()
                .collection('Events')
                .add({
                       title:title,
                       disc:disc,
                       email:email,
                       phone:phone,
                       date:date,
                       web:web,
                       id:totalEvent+1
                })
                .then(() => {
                console.log('Message sent successfully');
                
                })
                .catch((error) => {
                console.log('Error sending message:', error);
                });
                
                
        }catch(e){
            console.log("error while adding data: ",e);
        }
        }else{
            setWarn(true);
        } 
    }

    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background}} >
            <Header navigation={navigation} title="Post Event" info='' />
            <ScrollView style={{flex: 1}} >
                <View style={{marginHorizontal:20,marginTop:10}} >
                    <Text style={[styles.label,{color:Colors.text}]} >Title*:</Text>
                    <TextInput value={title} onChangeText={setTitle} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                </View>

                <View style={{marginHorizontal:20}} >
                    <Text style={[styles.label,{color:Colors.text}]} >Discription*:</Text>
                    <TextInput  value={disc} onChangeText={setDisc} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                </View>

                <View style={{marginHorizontal:20}} >
                    <Text style={[styles.label,{color:Colors.text}]} >Email(optional):</Text>
                    <TextInput keyboardType={'email-address'} value={email} onChangeText={setEmail} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                </View>

                <View style={{marginHorizontal:20}} >
                    <Text style={[styles.label,{color:Colors.text}]} >Phone(optional):</Text>
                    <TextInput keyboardType={'phone-pad'} value={phone} onChangeText={setPhone} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                </View>

                <View style={{marginHorizontal:20}} >
                    <Text style={[styles.label,{color:Colors.text}]} >Date*:</Text>
                    <TextInput keyboardType={'default'} value={date} onChangeText={setDate} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                </View>

                <View style={{marginHorizontal:20}} >
                    <Text style={[styles.label,{color:Colors.text}]} >Website(optional):</Text>
                    <TextInput keyboardType={'url'}  value={web} onChangeText={setWeb} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                </View>

                <Text style={{fontFamily:Colors.Medium,color:'red',textAlign:'center',display:warn ? 'flex' : 'none'}} >buddy, fill up the fields</Text>

                <TouchableOpacity onPress={Submit} style={[styles.postBtn,{backgroundColor:Colors.secondary}]} >
                    <Text style={[styles.postBtnText,{color:Colors.text}]} >Post Event</Text>
                </TouchableOpacity>
            </ScrollView>
            <HomePageFootor navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    label:{
        fontFamily:Colors.Medium,
        elevation:10,
        
    },
    input:{
        borderRadius:10,
        elevation:10,
        padding: 10,
        marginBottom:10
    },
    postBtn:{
        alignItems:'center',
        borderRadius:10,
        elevation:10,
        marginTop:10,
        marginHorizontal:20
    },
    postBtnText:{
        padding: 10,
        fontFamily:Colors.Bold,
        
    }
})
export default AddEvents;