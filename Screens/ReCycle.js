import React,{useEffect,useState} from "react";
import { Text, View,StyleSheet, TouchableOpacity, ScrollView,Linking} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from '../colors.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import { faHeart, faPhone } from "@fortawesome/free-solid-svg-icons";
import firestore from '@react-native-firebase/firestore';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";




const ReCycle = ({navigation,...props}) =>{
    const [Colors,setColors] = useState([]);
    const [name,setName] = useState('');
    const [Phone,setPhone] = useState('');
    const [clas,setClass] = useState('');
    const [school,setSchool] = useState('');
    const [lead,setLead] = useState();
    const [supported,setSupported] = useState(false);
    const [Join,setJoin] = useState(false);

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

            const support = await AsyncStorage.getItem('ReCycleSupported');
            const RecycleSupport = JSON.parse(support);
            console.log(RecycleSupport);
            if(RecycleSupport){
                setSupported(true);
                // AsyncStorage.setItem('ReCycleSupported',JSON.stringify(false))

            }else{
                AsyncStorage.setItem('ReCycleSupported',JSON.stringify(false))
                setSupported(false);

            }

            const joined = await AsyncStorage.getItem('joinedRecycle');
            const RecycleJoin = JSON.parse(joined);
            console.log(RecycleJoin);
            if(RecycleJoin){
                setJoin(true);
                // AsyncStorage.setItem('joinedRecycle',JSON.stringify(false))

            }else{
                AsyncStorage.setItem('joinedRecycle',JSON.stringify(false))
                setJoin(false);

            }



            const users = await firestore().collection('ReCycleSupport').get();
            // console.log(users.size);
            setLead(users.size);
            console.log(Name,Phone,Clas,School);
        }
        getDetails();
    },[])

const support = () =>{
    try{
        
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
const join = async() =>{
    try{
        firestore()
        .collection('ReCycle')
        .add({
            name:name,
            school:school,
            phone:Phone,
            class:clas,
            school,school
        })
        .then(() => {
            console.log('Message sent successfully');
            AsyncStorage.setItem('joinedRecycle',JSON.stringify(true))
            setJoin(true);
        })
        .catch((error) => {
        console.log('Error sending message:', error);
        AsyncStorage.setItem('joinedRecycle',JSON.stringify(false))
        setJoin(false);
        });
       
    }catch(e){
        console.log(e);
    }
}

const open = () =>{
    Linking.canOpenURL('tel:7736744769')
    .then((supported) => {
      if (supported) {
        return Linking.openURL('tel:7736744769');
      } else {
        throw new Error('Dialer is not supported on this device.');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
const openWhatsApp = () => {
    const whatsappUrl = `whatsapp://send?phone=7736744769`;
  
    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          throw new Error('WhatsApp is not installed on this device.');
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle error here
      });
  };
      
    return(
        <View style={[styles.App,{backgroundColor:Colors.Background}]} >
            <Header navigation={navigation}  title="Re:Cycle" info="" />

            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal:8}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:50,letterSpacing:6,paddingLeft:10}} >Hey {"\n"}there!,</Text>

                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'right'}} > 
                As a group of students, we are running a campaign to address the issue of <Text style={{fontSize:30}} >plastic waste</Text>. So we use plastic straws whenever we buy any drink and also we take plastic knives whenever we buy a cake to celebrate any occasion. The problem is that after using it, we throw it anywhere, which causes soil and water <Text style={{fontSize:30}} >pollution</Text> because plastic is a non-biodegradable waste). So let’s start an awareness campaign to make all people not use plastic straws and instead buy paper straws and refuse knives whenever someone buys cakes. Tho I won’t be surprised if no one responds. However, if you read to the end, pressing that white like button would be really supportive.
                </Text>

                <TouchableOpacity onPress={support} style={{display:supported ? 'none' : 'flex',marginLeft:30,backgroundColor:Colors.primary,width:100,alignItems:'center',padding: 10,borderRadius:10,elevation:10}} >
                    <FontAwesomeIcon icon={faHeart} color="white" />
                </TouchableOpacity>

                <Text style={{display:supported ? 'flex' : 'none',color:Colors.text,fontFamily:Colors.Bold,textAlign:'right',marginVertical : supported ? 6 : 0}} >Thanks</Text>

                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >If you are interested in participation</Text>

                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginTop:10}} >Its simple no need to fill any form or register just click the button and you will be informed if we are going to do anything.</Text>

                <Text style={{display:Join ? 'flex' : 'none',color:Colors.text,fontFamily:Colors.Bold,textAlign:'center',marginTop:10}} >Thanks You will be informed.</Text>

                <TouchableOpacity onPress={join} style={{display:Join ? 'none' : 'flex',backgroundColor:Colors.primary,margin:3,borderRadius:10,padding: 10,textAlign:'center',alignItems:'center',elevation:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Join Us</Text>
                </TouchableOpacity>

                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginTop:10}} >Interested in any other Contribution or Know more about this.</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:20,marginTop:10}} >Talk to</Text>

                <Text style={{color:Colors.text,fontFamily:Colors.Bold,marginTop:10,marginLeft:20}} >Ardra Babu</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:20,marginTop:10}} >+2 Student in Kanichukulangara HSS</Text>
                
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginVertical:20}} >
                    <TouchableOpacity onPress={open} style={{width:100,backgroundColor:Colors.primary,margin:3,borderRadius:10,padding: 10,textAlign:'center',alignItems:'center',elevation:10}} >
                        <FontAwesomeIcon icon={faPhone} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openWhatsApp} style={{width:100,backgroundColor:Colors.primary,margin:3,borderRadius:10,padding: 10,textAlign:'center',alignItems:'center',elevation:10}} >
                        <FontAwesomeIcon icon={faWhatsapp} color="white" />
                    </TouchableOpacity>
                </View>
                

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