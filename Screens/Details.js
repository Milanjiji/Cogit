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
import SplashScreen from 'react-native-splash-screen';
import CutomTextInput from '../components/CutomTextInput';


const primary = "#12156c"
const secondry = "#283459"
const background = "#2b1499";
const white = "white"
const Bold = "Montserrat-Bold"
const Regular = 'Montserrat-Regular';
const Medium = 'Montserrat-Medium';

  
const Details = ({navigation,route}) =>{
    const [userName,setUserName] = useState('');
    const [phone,setPhone] = useState()
    const [clas, setClass] = useState('10');
    const [modelVisible,setModalVisible] = useState(false);
    const [detailWarn,setDetailWarn] = useState(false);
    const [LoginType,setLoginType] = useState(true);
    const [loginWarn,setLoginWarn] = useState(true);
    const [errorType,setErrorType] = useState('');
    const [loading,setLoading] = useState(false);
    const [accountExists,setAccountExists] = useState(false);

    const search = firestore().collection('Users');
    
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    
   useEffect(()=>{
    SplashScreen.hide();
    setLoading(false);
   },[])

   

   
    const Submit = async () =>{
        
        if(
            userName &&  phone && clas 
        ){  
            setLoading(true); 
            setAccountExists(false);
            search.where('phone', '==', phone )
            search.where('name', '==', userName )
            .get()
            .then(querySnapshot => {
                if(querySnapshot.empty){
                    const create = async () =>{
                        setLoading(true);
                        console.log(userName,clas,phone);
                        try{
                            await AsyncStorage.setItem('userName',JSON.stringify(userName));
                            await AsyncStorage.setItem('phone', JSON.stringify(phone));
                            await AsyncStorage.setItem('class', JSON.stringify(clas));
                                    
                                firestore()
                                    .collection('Users')
                                    .add({
                                        name:userName,
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
                                    setLoading(false)
                            }catch(e){
                                console.log("error while adding data: ",e);
                                setLoading(false);
                            }
                            setDetailWarn(false);
                            setLoading(false);
                    }
                    create()
                }else{
                    querySnapshot.forEach(doc => {  
                        console.log("a account exists");
                        setLoading(false)
                        setAccountExists(true);
                        });
                }
            })
            .catch(error => {
                console.log('Error getting documents: ', error);
            });
            }else{
            setDetailWarn(true);
            console.log(userName);
            console.log(clas);
            console.log(phone);
            setLoading(false);
        }
        
        
    }
    const loginTypeToggler = () =>{
        setLoginType(!LoginType);
        setUserName('');
        setPhone('');
    }

    const uploadData = async(userName,phone,clas) =>{
        try{
            await AsyncStorage.setItem('userName',JSON.stringify(userName));
            await AsyncStorage.setItem('phone', JSON.stringify(phone));
            await AsyncStorage.setItem('class', JSON.stringify(clas));
        }catch(e){
            console.log('err');
        }
    }
    const Login = () =>{
        setLoading(true);
        if(userName && phone){
            
            search.where('phone', '==', phone)
            .get()
            .then(querySnapshot => {
                if(querySnapshot.empty){
                    setLoginWarn(true);
                    setErrorType('Wrong Credinals')
                }else{
                    querySnapshot.forEach(doc => {
                        
                        if(doc.data().name === userName){
                            uploadData(doc.data().name,doc.data().phone,doc.data().class)
                            setLoginWarn(false);
                            setLoading(false)
                            navigation.navigate('Allset')
                        }else{
                            setErrorType('Wrong Credinals')
                            setLoginWarn(true);
                            setLoading(false);
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

    console.log(userName,phone);


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
                <Text style={{color:white,fontWeight:600}} >You are now in</Text> 
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

            <CutomTextInput keyboardType="email-address" label="User Name" borderColor={white} horizontal={30} marginTop={20} value={userName} onTextChange={setUserName} color="white" textColor="white" />
            <CutomTextInput keyboardType="phone-pad" label="Contact" borderColor={white} horizontal={30} marginTop={10} value={phone} onTextChange={setPhone} color="white" textColor="white" />
            
            <Text style={styles.inputLabe} >Class</Text>
            <View style={{borderRadius:10,overflow: 'hidden',borderWidth:1,borderColor:white,marginHorizontal:30}} >
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
        
        
 
        
        <Text style={[styles.fullDetailsWarning,{display : detailWarn ? "flex" : "none"}]} >Enter full details</Text>
        <Text style={[styles.fullDetailsWarning,{display : loading ? "flex" : "none",color:white}]} >creating account</Text>
        <Text style={[styles.fullDetailsWarning,{display : accountExists ? "flex" : "none",color:white}]} >Account with same name or phone already exists.</Text>
        
        <TouchableOpacity onPress={Submit} >
            <Text style={[styles.btn,{backgroundColor:!loading ? '#12156c' : '#12156c50',color:!loading ? '#ffffff' : '#ffffff50'}]} >Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={loginTypeToggler} >
            <Text style={{color:white,textAlign:'center',marginBottom:20}} >Already have an account? Login</Text>
        </TouchableOpacity>
    </View>

    <View style={{display: !LoginType ? 'flex' : 'none',flex:1}} >
        <Text style={styles.reg} >Login</Text>

        
        
        <CutomTextInput 
            keyboardType="email-address" 
            label="User Name" 
            borderColor={white} 
            horizontal={30} 
            marginTop={10} 
            value={userName} 
            onTextChange={setUserName}
            color="white" 
            textColor="white" />
        <CutomTextInput keyboardType="phone-pad" label="Contact" borderColor={white} horizontal={30} marginTop={10} value={phone} onTextChange={setPhone} color="white" textColor="white"  />
        
        <Text style={{color:'red',textAlign:'center',display:loginWarn ? 'flex' :'none'}} >{errorType}</Text>
        
        <TouchableOpacity style={{}} onPress={Login} >
            <Text style={[styles.btn,{backgroundColor:!loading ? '#12156c' : '#12156c50',color:!loading ? '#ffffff' : '#ffffff50'}]} >Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={loginTypeToggler} >
            <Text style={{color:white,textAlign:'center'}} >Create new account</Text>
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
        paddingVertical:10 ,
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
        marginTop:10,
        backgroundColor:background,
        alignSelf:'flex-start',
        marginBottom:3
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
        justifyContent:'space-around',
        alignItems:'center',
        elevation:10
    },
    next:{
        borderColor:white,
        borderWidth:1,
        paddingHorizontal:30,
        paddingVertical:5,
        color:white,
        borderRadius:10
    },
    fullDetailsWarning:{
        color:'red',
        textAlign:'center',
        marginTop:10
    }
    
})
export default Details;