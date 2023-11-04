import React,{useEffect,useState} from "react";
import { Text, View,StyleSheet, TouchableOpacity, ScrollView,Linking,TextInput} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from '../colors.json'
import { faHeart, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import firestore from '@react-native-firebase/firestore';
import SideBar from "../components/SideBar";
import { storage } from "../Storage";




const ReCycle = ({navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [name,setName] = useState('');
    const [Phone,setPhone] = useState('');
    const [clas,setClass] = useState('');
    const [school,setSchool] = useState('');
    const [lead,setLead] = useState();
    const [supported,setSupported] = useState(false);
    const [Join,setJoin] = useState(false);
    const [lastId,setLastId] = useState();
    const [message,setMessage] = useState('');
    const [warn,setWarn] = useState(false);
    const [status,setStatus] = useState('');
    const [email,setEmail] = useState('');

    useEffect(()=>{
        const getEvents = async () =>{
            const users = await firestore().collection('RecycleContribution').get()
            setLastId(users.size);
        }
        getEvents();
    
      },[])

    useEffect(()=>{
        const getColors = async()=>{
            // const data = await AsyncStorage.getItem('Colors');
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getDetails = async() =>{
            const Name = JSON.parse(storage.getString('userName'))
            setName(Name);
            const Phone = JSON.parse(storage.getString('phone'))
            setPhone(Phone);
            const Clas = JSON.parse(storage.getString('class'))
            setClass(Clas);

            const support = storage.getBoolean('ReCycleSupported')
            if(support){
                setSupported(true);

            }else{
                storage.set('ReCycleSupported',false)
                setSupported(false);

            }

            const joined = storage.getBoolean('joinedRecycle');
            if(joined){
                setJoin(true);
            }else{
                setJoin(false);
            }



            const users = await firestore().collection('ReCycleSupport').get();
            // console.log(users.size);
            setLead(users.size);
            console.log(Name,Phone,Clas);
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
            storage.set('ReCycleSupported',true)
            setSupported(true)
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            setSupported(false);
            storage.set('ReCycleSupported',false)
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
            phone:Phone,
            class:clas,
        })
        .then(() => {
            console.log('Message sent successfully');
            storage.set('joinedRecycle',true)
            setJoin(true);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            storage.set('joinedRecycle',false)
            setJoin(false);
        });
       
    }catch(e){
        console.log(e);
    }
}

const handleSend = () => {

    if(message){
        setWarn(false);
        setStatus('Sending...')
        console.log(message,name);
        firestore()
          .collection('RecycleContribution')
          .add({ 
            id:lastId+1,
            name:name,
            message:message,
            phone:Phone,
           })
          .then(() => {
            console.log('Message sent successfully');
            setMessage(''); 
            setStatus('Thank you for your interest, we will contact back as soon as possible.')
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
    }else{
        setWarn(true)
    } }
    
    
    return(
        <View style={[styles.App,{backgroundColor:Colors.Background,flexDirection:'row',alignItems:'center'}]} >

            <SideBar navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal:8,marginTop:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:50,letterSpacing:3,paddingLeft:10}} >Hey!,</Text>

                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',fontSize:12}} > 
                As a group of students, we are running a campaign to address the issue of plastic waste. So we use plastic straws whenever we buy any drink and also we take plastic knives whenever we buy a cake to celebrate any occasion. The problem is that after using it, we throw it anywhere, which causes soil and water pollution because plastic is a non-biodegradable waste). So let’s start an awareness campaign to make all people not use plastic straws and instead buy paper straws and refuse knives whenever someone buys cakes. Tho I won’t be surprised if no one responds. However, if you read to the end, pressing that white like button would be really supportive.
                </Text>

                <TouchableOpacity onPress={support} style={{display:supported ? 'none' : 'flex',backgroundColor:Colors.primary,alignItems:'center',padding: 10,borderRadius:50,elevation:10,marginVertical:10}} >
                    <FontAwesomeIcon icon={faHeart} color="white" />
                </TouchableOpacity>

                <Text style={{display:supported ? 'flex' : 'none',color:Colors.text,fontFamily:Colors.Bold,textAlign:'right',marginVertical : supported ? 6 : 0}} >Thanks</Text>


                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginTop:10,fontSize:12}} >If you are interested in participation,Its simple no need to fill any form or register just click the button and you will be informed if we are going to do anything.</Text>

                <Text style={{display:Join ? 'flex' : 'none',color:Colors.text,fontFamily:Colors.Bold,textAlign:'center',marginTop:10}} >Thanks You will be informed.</Text>

                <TouchableOpacity onPress={join} style={{display:Join ? 'none' : 'flex',backgroundColor:Colors.primary,margin:3,borderRadius:50,padding: 10,textAlign:'center',alignItems:'center',elevation:10,marginVertical:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Join Us</Text>
                </TouchableOpacity>

                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginTop:10,fontSize:12}} >Interested in any other Contribution or Know more about this.</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:20,marginTop:10}} >Talk to</Text>

                <Text style={{color:Colors.text,fontFamily:Colors.Bold,marginTop:10,marginLeft:20}} >Ardra Babu</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:20,marginTop:10}} >+2 Student in Kanichukulangara HSS</Text>
                <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:30,backgroundColor:Colors.hashWhite,borderRadius:10,paddingLeft:10,marginVertical:10}} >
                    <TextInput 
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Send a simple message will contact you back."
                        style={{color:Colors.text}}
                        numberOfLines={undefined}
                        multiline={true} />
                    <Text style={{ display: warn ? 'flex' :'none', color:Colors.text,fontFamily:Colors.Medium,marginLeft:20,marginTop:10}} >Cannot send message without content</Text>
                    <Text style={{ display: status ? 'flex' : 'none', color:Colors.text,fontFamily:Colors.Medium,marginLeft:20,marginTop:10}} >{status}</Text>
                    
                    <TouchableOpacity onPress={handleSend} style={{}} >
                        <FontAwesomeIcon icon={faPaperPlane} color={Colors.text} />
                    </TouchableOpacity>   
                </View>
            <View style={{height:50}} ></View>
            </ScrollView>
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