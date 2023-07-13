import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity,TextInput,StyleSheet} from 'react-native';
import Colors from '../colors.json'
import firestore from '@react-native-firebase/firestore';
import HomePageFootor from '../components/HomePageFootor';
import AsyncStorage from '@react-native-async-storage/async-storage';




const SendMessage = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [message,setMessage] = useState('');
  const [name,setName] = useState('');
  const [lastId,setLastId] = useState(0);
  const [contact,setContact] = useState('');
  const [warn,setWarn] = useState(false);
  const [school,setSchool] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [note,setNote] = useState('Before submitting any work here, it s important to note that this app is currently not generating any revenue. Therefore, if you re interested in contributing, please do so based on your passion for the project rather than monetary gain. Additionally, it s worth mentioning that the work is open, and you don t need to feel pressured. Your focus and dedication to the project are greatly appreciated. In the event that revenue is generated in the future, you will be eligible for a share. Thank you for considering involvement in this endeavor.')
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const fetchDetails = async () =>{
          const name = await AsyncStorage.getItem('userName');
          const phone = await AsyncStorage.getItem('phone');
          const school = await AsyncStorage.getItem('school');
          const email = await AsyncStorage.getItem('email');
          setName(name);
          setPhone(phone);
          setEmail(email);
          setSchool(school);
          console.log(name,phone,email,school);
        }
        fetchDetails();

    },[])

  const handleSend = () => {

    if(message && name && contact){
        setWarn(false);
        setNote('Sending...')
        console.log(message,name, contact);
        firestore()
          .collection('UserHelpRequests')
          .add({ 
            id:lastId+1,
            name:name,
            message:message,
            contact:contact,
            phone:phone,
            email:email,
            school:school
           })
          .then(() => {
            console.log('Message sent successfully');
            setMessage(''); 
            setContact('');
            setNote('Thank you for your interest, we will contact back as soon as possible.')
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
    }else{
        setWarn(true)
    }
    
  }
  useEffect(()=>{
    const getEvents = async () =>{
        const users = await firestore().collection('UserHelpRequests').get()
        setLastId(users.size);
    }
    getEvents();

  },[])
  

  return (
    <View
      style={[styles.background,{backgroundColor:Colors.Background}]} >
        
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginTop:10}} >Tell us what you like to do:</Text>
        <TextInput 
            onChangeText={setMessage}
            value={message}
            placeholder='Tell everything, No limits' 
            style={{backgroundColor:Colors.primary,elevation:10,borderRadius:10,padding: 10,marginVertical:10,fontFamily:Colors.Medium}}
            multiline={true}
            numberOfLines={undefined}  />
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginVertical:10}} >Tell us how can we contact you back: </Text>
        <TextInput onChangeText={setContact} value={contact} placeholder='Any (phone or whatsapp or email or insta)' style={{backgroundColor:Colors.primary,elevation:10,borderRadius:10,padding: 10,marginVertical:10}}  />  
        <Text style={{color:'red',fontFamily:Colors.Medium,marginVertical:10,display : warn ? 'flex' :'none',textAlign:'center'}} >Submittion not completed</Text>
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginVertical:10,textAlign:'center',padding: 10,}} >{note}</Text>
        <View style={{flex: 1,}} ></View>
        <TouchableOpacity onPress={handleSend}  style={{borderRadius:50,backgroundColor:Colors.primary,elevation:10,padding:10,marginVertical:10}} >
            <Text style={{color:Colors.white,fontFamily:Colors.Medium,textAlign:'center'}} >Send Message</Text>
        </TouchableOpacity>
        <View style={{height:50}} ></View>
        <HomePageFootor navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  background:{
    flex:1,
    padding: 10,
  },
});

export default SendMessage;
