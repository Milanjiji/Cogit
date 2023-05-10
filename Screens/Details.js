import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    Modal,
    ScrollView
  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import firestore from '@react-native-firebase/firestore';


const primary = "#04103a"
const secondry = "#283459"

const white = "white"
const Bold = "Montserrat-Bold"
const Regular = 'Montserrat-Regular';
const Medium = 'Montserrat-Medium';

  
const Details = ({navigation,route}) =>{
    const [userName,setUserName] = useState('');
    const [Password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [school,setSchool] = useState('')
    const [phone,setPhone] = useState()
    const [clas, setClass] = useState();
    const [modelVisible,setModalVisible] = useState(false)
    const [detailWarn,setDetailWarn] = useState(false)
    
    

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    
       
    const Submit = async () =>{
        if(
            userName && Password && email && school && phone && clas 
        ){
            console.log(userName,Password,email,school,clas,phone);
        try{
            await AsyncStorage.setItem('userName',userName);
            await AsyncStorage.setItem('email', email)
            await AsyncStorage.setItem('password', Password)
            await AsyncStorage.setItem('school', school);
            await AsyncStorage.setItem('phone', phone);
            await AsyncStorage.setItem('class', clas);
            
            firestore()
                .collection('Users')
                .add({
                    name:userName,
                    email:email,
                    passcode:Password,
                    school:school,
                    phone:phone,
                    class:clas})
                .then(() => {
                console.log('Message sent successfully');
                })
                .catch((error) => {
                console.log('Error sending message:', error);
                });
                console.log("items saved successfully");
                setModalVisible(true)
        }catch(e){
            console.log("error while adding data: ",e);
        }
        setDetailWarn(false);
        }else{
            setDetailWarn(true)
        }
        
        
    }
    

    return(
       <ScrollView style={styles.background} >
        <Modal
        animationType="fade"
        transparent={true}
        visible={modelVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modelbackground} >
            <View style={[styles.modalContainer,{
                width:width/2,
                height:height/4
            }]}>
                <Text style={{color:white,fontWeight:600}} >Sign Up Successfull</Text> 
                <FontAwesomeIcon size={60} color={white} icon={faCheckCircle} />
                <TouchableOpacity>
                    <Text onPress={()=>{navigation.navigate('Home');setModalVisible(false)}} style={styles.next} >Next</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
        <Text style={[styles.signup,{
            marginTop:height/50
            }]} >Sign Up</Text>
        <Text style={styles.reg} >Let's get you signed up first</Text>
        <Text style={styles.inputLabe} >User Name</Text>
        <TextInput style={styles.input} onChangeText={setUserName}  placeholder='Name in the id card' />
        <Text style={styles.inputLabe} >Email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} autoCapitalize={'none'} keyboardType={'email-address'} placeholder='Email' />
        <Text style={styles.inputLabe} >Password</Text>
        <TextInput style={styles.input} onChangeText={setPassword} keyboardType={'visible-password'} placeholder='Password'/>
        
        <Text style={styles.inputLabe} >Class</Text>
            <Picker 
                style={styles.picker} 
                selectedValue={clas}
                onValueChange={(itemValue, itemIndex) =>
                setClass(itemValue)}>

                <Picker.Item style={styles.items}  label="10" value="10" />
                <Picker.Item style={styles.items} label="+1" value="+1" />
                <Picker.Item style={styles.items} label="+2" value="+2" />
                <Picker.Item style={styles.items} label="others" value="others" />
            </Picker>

        <Text style={styles.inputLabe} >School</Text>
        <TextInput style={styles.input} onChangeText={setSchool} placeholder='School'/>  
        <Text style={styles.inputLabe} >Contact</Text>
        <TextInput style={styles.input} keyboardType={'phone-pad'} onChangeText={setPhone} placeholder='+91 : '/>    
        
        <Text style={[styles.fullDetailsWarning,{display : detailWarn ? "flex" : "none"}]} >Enter full details</Text>

        <TouchableOpacity onPress={Submit} >
            <Text style={styles.btn} >Register</Text>
        </TouchableOpacity>
       </ScrollView>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:primary,
        flex:1,
        
    },
    signup:{
        color:white,
        fontSize:50,
        marginBottom:10,
        fontFamily:Medium,
        textAlign:'center'
    },
    reg:{
        color:white,
        fontSize:18,
        fontFamily:Regular,
        textAlign:'center'
    },
    input:{
        color:white,
        backgroundColor:secondry,
        marginHorizontal:30,
        borderRadius:10,
        paddingHorizontal:20
    },
    picker:{
        color:white,
        backgroundColor:secondry,
        marginHorizontal:30,
        borderRadius:30,
    },
    items:{
        color:white,
        backgroundColor:secondry,

    },
    btn:{
        fontSize:25,
        color:white,
        fontFamily:Bold,
        backgroundColor:secondry,
        margin:20,
        textAlign:'center',
        padding:10,
        borderRadius:10,
        marginHorizontal:'10%',
        width:'80%',
        alignSelf:'flex-end'
    },
    inputLabe:{
        marginLeft:40,
        marginTop:10,
        color:white
    },
    modelbackground:{
        backgroundColor:'#04103a99',
        flex:1,
        justifyContent:'space-around',
        alignItems:'center'
    },
    modalContainer:{
        backgroundColor:primary,
        borderRadius:20,
        borderColor:white,
        borderWidth:1,
        justifyContent:'space-around',
        alignItems:'center'
    },
    next:{
        borderColor:white,
        borderWidth:1,
        paddingHorizontal:30,
        paddingVertical:5,
        color:white
    },
    fullDetailsWarning:{
        color:'red',
        textAlign:'center',
        marginTop:10
    }
    
})
export default Details;