import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, FlatList,Dimensions } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faAngleUp, faArrowDownShortWide, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

const search = firestore().collection('Users');

const AccountSettings = ({navigation}) =>{
    const [updateUserName,setUpdateUserName] = useState(false);
    const [updateEmail,setUpdateEmail] = useState(false);
    const [updatePhone,setUpdatePhone] = useState(false);
    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState();
    const [status,setStatus] = useState('');
    const [errorType,setErrorType] = useState('');
    const [errorWarn,setErrorWarn] = useState(false);
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

    },[])


    const ChangeUserName = async() =>{
        setStatus('Uploading data...');
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');

        if(email && password && userName){
            search.where('email', '==', email)
            .get()
            .then(querySnapshot => {
                if(querySnapshot.empty){
                    setErrorType('GettingSome error ,Cheak the internet');
                }else{
                    querySnapshot.forEach(doc => {
                        
                        if(doc.data().passcode === password){
                            const updatedData = {
                                ...doc.data(),
                                name: userName, 
                              };
                              const setItem = async() =>{
                                await AsyncStorage.setItem('userName',userName);
                            }
                            setItem();

                            search.doc(doc.id).update(updatedData).then(() => {
                            console.log('updated the data');
                            setStatus('Data Uploaded')
                        }).catch(error => {
                            console.log('Error updating document: ', error);
                        });
                        }else{
                            setErrorType('GettingSome error ,Cheak the internet');
                            console.log('there is some problem');
                        }
                        
                        });
                }
                
            })
            .catch(error => {
                console.log('Error getting documents: ', error);
            });
        }else{
            
        }
    } 
    
    const ChangeEmail = async() =>{
        setStatus('Uploading data...');
        const Email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        console.log(Email,password);
        if(Email && password && email){
            search.where('email', '==', Email)
            .get()
            .then(querySnapshot => {
                if(querySnapshot.empty){
                    setErrorType('GettingSome error ,Cheak the internet');
                }else{
                    querySnapshot.forEach(doc => {
                        
                        if(doc.data().passcode === password){
                            console.log('got into sending part');
                            const updatedData = {
                                ...doc.data(),
                                email: email, 
                              };
                            const setItem = async() =>{
                                await AsyncStorage.setItem('email',email);
                            }
                            setItem();


                            search.doc(doc.id).update(updatedData).then(() => {
                            setStatus('Data Uploaded')
                        }).catch(error => {
                            console.log('Error updating document: ', error);
                        });
                        }else{
                            setErrorType('GettingSome error ,Cheak the internet');
                            console.log('there is some problem');
                        }
                        
                        });
                }
                
            })
            .catch(error => {
                console.log('Error getting documents: ', error);
            });
        }else{
            
        }
    }

    const ChangePhone = async() =>{
        setStatus('Uploading data...');
        const Email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');
        console.log(Email,password,phone);
        if(phone){
        if(Email && password){
            search.where('email', '==', Email)
            .get()
            .then(querySnapshot => {
                if(querySnapshot.empty){
                    setErrorType('GettingSome error ,Cheak the internet');
                }else{
                    querySnapshot.forEach(doc => {
                        
                        if(doc.data().passcode === password){
                            const updatedData = {
                                ...doc.data(),
                                phone: phone, 
                              };
                            const setItem = async() =>{
                                await AsyncStorage.setItem('phone',phone);
                            }
                            setItem();


                            search.doc(doc.id).update(updatedData).then(() => {
                            setStatus('Data Uploaded')
                        }).catch(error => {
                            console.log('Error updating document: ', error);
                        });
                        }else{
                            setErrorType('GettingSome error ,Cheak the internet');
                            console.log('there is some problem');
                        }
                        
                        });
                }
                
            })
            .catch(error => {
                console.log('Error getting documents: ', error);
            });
        }else{
            console.log('he hge');
        }
    }
    }
    
    return(
        <View style={{backgroundColor:Colors.primary,padding: 10,margin:3,borderRadius:10,elevation:10}}>

            <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20}} >Account</Text>

            <TouchableOpacity onPress={()=>{setUpdateUserName(!updateUserName)}} style={{marginTop:10}} >
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Change User name</Text>
                    <FontAwesomeIcon color={Colors.text} style={{marginRight:10}} icon={updateUserName ? faAngleUp : faAngleDown} />
                </View>
                <View style={{marginVertical:10 ,display:updateUserName ? 'flex':'none'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >New User name</Text>
                    <TextInput value={userName} onChangeText={setUserName} style={[styles.input,{backgroundColor:Colors.secondary,color:Colors.text,fontFamily:Colors.Medium}]} />
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >{status ? status : ''}</Text>
                    <TouchableOpacity onPress={ChangeUserName} style={[styles.update,{backgroundColor:Colors.secondary}]} >
                        <Text style={{color:userName ? Colors.text : Colors.primary,fontFamily:Colors.Medium,textAlign:'center'}} >Update</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setUpdateEmail(!updateEmail)}} style={{marginTop:10}} >
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Change Email</Text>
                    <FontAwesomeIcon color={Colors.text} style={{marginRight:10}} icon={updateEmail ? faAngleUp : faAngleDown} />
                </View>
                <View style={{marginVertical:10 ,display:updateEmail ? 'flex':'none'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >New Email</Text>
                    <TextInput value={email} onChangeText={setEmail} style={[styles.input,{backgroundColor:Colors.secondary,color:Colors.text,fontFamily:Colors.Medium}]} />
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >{status ? status : ''}</Text>
                    <TouchableOpacity onPress={ChangeEmail} style={[styles.update,{backgroundColor:Colors.secondary}]} >
                        <Text style={{color:email ? Colors.text : Colors.primary,fontFamily:Colors.Medium,textAlign:'center'}} >Update</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setUpdatePhone(!updatePhone)}} style={{marginTop:10}} >
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Change Phone</Text>
                    <FontAwesomeIcon color={Colors.text} style={{marginRight:10}} icon={updatePhone ? faAngleUp : faAngleDown} />
                </View>
                <View style={{marginVertical:10 ,display:updatePhone ? 'flex':'none'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >New Email</Text>
                    <TextInput keyboardType={'phone-pad'} value={phone} onChangeText={setPhone} style={[styles.input,{backgroundColor:Colors.secondary,color:Colors.text,fontFamily:Colors.Medium}]} />
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >{status ? status : ''}</Text>
                    <TouchableOpacity onPress={ChangePhone} style={[styles.update,{backgroundColor:Colors.secondary}]} >
                        <Text style={{color:phone ? Colors.text : Colors.primary,fontFamily:Colors.Medium,textAlign:'center'}} >Update</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        
        </View>
    );
}

const styles = StyleSheet.create({
    Top:{
        borderRadius:10,
        margin:3,
        padding: 10,
        
    },
    
})

export default AccountSettings;
