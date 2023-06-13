import React,{useEffect,useState} from "react";
import { Text, View,StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from '../colors.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import firestore from '@react-native-firebase/firestore';




const ReCycle = ({navigation,...props}) =>{
    const [Colors,setColors] = useState([]);
    const [name,setName] = useState('');
    const [Phone,setPhone] = useState('');
    const [clas,setClass] = useState('');
    const [school,setSchool] = useState('');
    const [lead,setLead] = useState();
    const [supported,setSupported] = useState(false);

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getDetails = async() =>{
            const Name = await AsyncStorage.getItem('userName');
            setName(Name);
            const Phone = await AsyncStorage.getItem('phone');
            setPhone(Phone);
            const Clas = await AsyncStorage.getItem('class');
            setClass(Clas);
            const School = await AsyncStorage.getItem('school');
            setSchool(School);
            const RecycleSupport = await AsyncStorage.getItem('ReCycleSupported');
            console.log(RecycleSupport);
            if(RecycleSupport){
                setSupported(true);
            }else{
                AsyncStorage.setItem('ReCycleSupported',JSON.stringify(false))
            }
            
            const users = await firestore().collection('ReCycleSupport').get();
            // const data = users.docs.map(doc => doc.data())
            console.log(users.size);
            setLead(users.size);
            console.log(Name,Phone,Clas,School);
        }
        getDetails();
    },[])

const support = () =>{
    try{
        // firestore()
        // .collection('ReCycle')
        // .add({
        //     name:name,
        //     school:school,
        //     phone:Phone,
        //     class:clas,
        //     school,school
        // })
        // .then(() => {
        // console.log('Message sent successfully');

        // })
        // .catch((error) => {
        // console.log('Error sending message:', error);
        // });
        firestore()
        .collection('ReCycleSupport')
        .add({
            name:name,
            lead:lead+1
        })
        .then(() => {
            console.log('Message sent successfully');
            AsyncStorage.setItem('ReCycleSupported',JSON.stringify(true));
            setSupported(true)
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            setSupported(false);
            AsyncStorage.setItem('ReCycleSupported',JSON.stringify(false));
        });
    }catch(e){
        console.log(e);
    }
    
}


      
    return(
        <View style={[styles.App,{backgroundColor:Colors.Background}]} >
            <Header navigation={navigation}  title="Re:Cycle" info="" />
            <ScrollView style={{flex:1,padding: 8,paddingBottom:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:60,letterSpacing:6,paddingLeft:20}} >Hey there!,</Text>

                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'right'}} > 
                As a group of students, we are running a campaign to address the issue of <Text style={{fontSize:30}} >plastic waste</Text>. So we use plastic straws whenever we buy any drink and also we take plastic knives whenever we buy a cake to celebrate any occasion. The problem is that after using it, we throw it anywhere, which causes soil and water <Text style={{fontSize:30}} >pollution</Text> because plastic is a non-biodegradable waste). So let’s start an awareness campaign to make all people not use plastic straws and instead buy paper straws and refuse knives whenever someone buys cakes. Tho I won’t be surprised if no one responds. However, if you read to the end, pressing that white like button would be really supportive.
                </Text>

                <TouchableOpacity onPress={support} style={{display:supported ? 'none' : 'flex',marginLeft:30,backgroundColor:Colors.primary,width:100,alignItems:'center',padding: 10,borderRadius:10}} >
                    <FontAwesomeIcon icon={faHeart} color="white" />
                </TouchableOpacity>

                <Text style={{display:supported ? 'flex' : 'none',color:Colors.text,fontFamily:Colors.Medium,textAlign:'right',marginTop : supported ? 20 : 0}} >Thanks</Text>

                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >If you are interested in participation</Text>

                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginTop:10}} >Its simple no need to fill any form or register just click the button and you will be informed if we are going to do anything.</Text>

                <TouchableOpacity  style={{backgroundColor:Colors.primary,margin:3,borderRadius:10,padding: 10,textAlign:'center',alignItems:'center'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Join Us</Text>
                </TouchableOpacity>
                
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginTop:10}} >Interested in any other Contribution or Know more about this.</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:20,marginTop:10}} >Talk to</Text>

                <Text style={{color:Colors.text,fontFamily:Colors.Bold,marginTop:10,marginLeft:20}} >Ardra Babu</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:20,marginTop:10}} >+2 Student in Kanichukulangara HSS</Text>
                

                

            </ScrollView>
            <HomePageFootor navigation={navigation}  />
        </View>
    )
}
const styles = StyleSheet.create({
    App:{
        flex:1,
        backgroundColor:Colors.Background,
    },
      
})
export default ReCycle;