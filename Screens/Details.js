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
import { useState,useEffect,useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import firestore from '@react-native-firebase/firestore';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';


const primary = "#12156c"
const secondry = "#283459"
const background = "#2b1499";
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
    const [clas, setClass] = useState('10');
    const [modelVisible,setModalVisible] = useState(false)
    const [detailWarn,setDetailWarn] = useState(false);
    const [LoginType,setLoginType] = useState(true);
    const [loginWarn,setLoginWarn] = useState(true);
    const [errorType,setErrorType] = useState('')

    const search = firestore().collection('Users');
    
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    
   useEffect(()=>{
    SplashScreen.hide()
   },[])
    const Submit = async () =>{
        if(
            userName && Password && email && school && phone && clas 
        ){
            console.log(userName,Password,email,school,clas,phone);
        try{
            await AsyncStorage.setItem('userName',JSON.stringify(userName));
            await AsyncStorage.setItem('email', JSON.stringify(email))
            await AsyncStorage.setItem('password', JSON.stringify(Password))
            await AsyncStorage.setItem('school', JSON.stringify(school));
            await AsyncStorage.setItem('phone', JSON.stringify(phone));
            await AsyncStorage.setItem('class', JSON.stringify(clas));
            
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
            setDetailWarn(true);
            console.log(userName);
            console.log(Password);
            console.log(clas);
            console.log(school);
            console.log(phone);
        }
        
        
    }
    const loginTypeToggler = () =>{
        setLoginType(!LoginType);
    }
    // login

    const uploadData = async(userName,email,Password,school,phone,clas) =>{
        try{
            await AsyncStorage.setItem('userName',JSON.stringify(userName));
            await AsyncStorage.setItem('email', JSON.stringify(email))
            await AsyncStorage.setItem('password', JSON.stringify(Password))
            await AsyncStorage.setItem('school', JSON.stringify(school));
            await AsyncStorage.setItem('phone', JSON.stringify(phone));
            await AsyncStorage.setItem('class', JSON.stringify(clas));
        }catch(e){
            console.log('err');
        }
    }
    const Login = () =>{
        console.log('login');
        if(email && Password){
            
            search.where('email', '==', email)
            .get()
            .then(querySnapshot => {
                if(querySnapshot.empty){
                    setLoginWarn(true);
                    setErrorType('Wrong Credinals')
                }else{
                    querySnapshot.forEach(doc => {
                        
                        if(doc.data().passcode === Password){
                            uploadData(doc.data().name,doc.data().email,doc.data().passcode,doc.data().school,doc.data().phone,doc.data().class)
                            setLoginWarn(false);
                            navigation.navigate('Allset')
                        }else{
                            setErrorType('Wrong Credinals')
                            setLoginWarn(true);
                        }
                        
                        });
                }
                
            })
            .catch(error => {
                console.log('Error getting documents: ', error);
            });
        }else{
            setErrorType('enter Credinals');
            setLoginWarn(true);
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
            }]} >Get In</Text>

    <View style={{display: LoginType ? 'flex' :'none'}} >
        
        <Text style={styles.reg} >Let's get you signed up first</Text>
        <Text style={styles.inputLabe} >User Name</Text>
        <TextInput style={styles.input} placeholder='userName'  onChangeText={setUserName}  />
        <Text style={styles.inputLabe} >Email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} autoCapitalize={'none'} keyboardType={'email-address'} placeholder='Email' />
        <Text style={styles.inputLabe} >Password</Text>
        <TextInput style={styles.input} onChangeText={setPassword} keyboardType={'visible-password'} placeholder='Password'/>
        
        <Text style={styles.inputLabe} >Class</Text>
        <View style={{borderRadius:5,overflow: 'hidden',borderWidth:2,borderColor:primary,marginHorizontal:30}} >
            <Picker 
                style={styles.picker} 
                selectedValue={clas}
                onValueChange={(itemValue, itemIndex) =>
                setClass(itemValue)}
                >
                
                <Picker.Item style={styles.items}  label="10" value="10" />
                <Picker.Item style={styles.items} label="+1" value="+1" />
                <Picker.Item style={styles.items} label="+2" value="+2" />
                <Picker.Item style={styles.items} label="others" value="others" />
            </Picker>
        </View>

        <Text style={styles.inputLabe} >School</Text>
        <TextInput style={styles.input} onChangeText={setSchool} placeholder='School'/>  
        <Text style={styles.inputLabe} >Contact</Text>
        <TextInput style={styles.input} keyboardType={'phone-pad'} onChangeText={setPhone} placeholder='+91 : '/>    
        
        <Text style={[styles.fullDetailsWarning,{display : detailWarn ? "flex" : "none"}]} >Enter full details</Text>

        <TouchableOpacity onPress={Submit} >
            <Text style={styles.btn} >Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={loginTypeToggler} >
            <Text style={{color:Colors.white,textAlign:'center',marginBottom:20}} >Already have an account? Login</Text>
        </TouchableOpacity>
    </View>

    <View style={{display: !LoginType ? 'flex' : 'none',flex:1}} >
        <Text style={styles.reg} >Login</Text>

        
        <Text style={styles.inputLabe} >Email</Text>
        <TextInput style={[styles.input]} onChangeText={setEmail} keyboardType={'email-address'}  placeholder='     Email' />
        <Text style={styles.inputLabe} >Password</Text>
        <TextInput style={styles.input} onChangeText={setPassword} keyboardType={'visible-password'} placeholder='     Password'/>
        
        <Text style={{color:'red',textAlign:'center',display:loginWarn ? 'flex' :'none'}} >{errorType}</Text>
        
        <TouchableOpacity style={{}} onPress={Login} >
            <Text style={styles.btn} >Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={loginTypeToggler} >
            <Text style={{color:Colors.white,textAlign:'center'}} >Create new account</Text>
        </TouchableOpacity>
    </View>
        


       </ScrollView>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:background,
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
        fontFamily:Regular,
        textAlign:'center'
    },
    input:{
        color:white,
        marginHorizontal:30,
        borderRadius:5,
        paddingHorizontal:30,
        borderColor:primary,
        borderWidth:2,
        paddingVertical:5 ,
    },
    picker:{
        color:white,
        elevation:10,
        paddingVertical:5,
    },
    items:{
        color:white,
        backgroundColor:background,
    },
    btn:{
        color:white,
        fontFamily:Bold,
        backgroundColor:primary,
        margin:20,
        textAlign:'center',
        padding:10,
        borderRadius:50,
        marginHorizontal:30,
        elevation:10
    },
    inputLabe:{
        marginLeft:40,
        color:white,
        marginTop:3,
        backgroundColor:background,
        alignSelf:'flex-start'

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