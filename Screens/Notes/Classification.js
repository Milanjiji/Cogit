import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet, ScrollView,KeyboardAvoidingView } from "react-native";
import SideBar from "../../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import firestore from '@react-native-firebase/firestore';
import CutomTextInput from "../../components/CutomTextInput";
import { storage } from "../../Storage";


const Classification = ({navigation,route}) =>{
    const [Colors,setColors] = useState([])
    const [title,setTitle] = useState('')
    const [noteToggle,setNoteToggle] = useState(false);
    const [message,setMessage] = useState('');
    const [noMesgWarn,setNoMsgWarn] = useState(false);
    const [lastId,setLastId] = useState();
    const [phone,setPhone] = useState('');
    const [name,setName] = useState('');
    const {sub} = route.params;
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        console.log(sub);
        if(sub=='math'){
            setTitle('Maths')
        }else if(sub=='chem'){
            setTitle('Chemistry')
        }else if(sub=='phy'){
            setTitle('Physics')
        }else if(sub=='bio'){
            setTitle('Biology')
        }
        const fetchId = async () =>{
            const users = await firestore().collection('UserReq').get()
            setLastId(users.size);
            console.log(users.size);
            
        }
        fetchId();
        const fetchDetails = async () =>{
            const name = storage.getString('userName')
            const phone = storage.getString('phone')
            setName(name);
            setPhone(phone);
          }
          fetchDetails();
    },[])

    const NoteToggler = () =>{
        setNoteToggle(!noteToggle);
    }
    const sendMessage = () =>{
        if(message && name && phone){
            console.log("sending message");
            firestore()
              .collection('UserReq')
              .add({ id: lastId+1, message:message,name:name })
              .then(() => {
                console.log('Message sent successfully');
                setMessage(''); 
              })
              .catch((error) => {
                console.log('Error sending message:', error);
              });

        }else{
            setNoMsgWarn(true);
            console.log("we got a problem");
        }
    }

    return(
        <KeyboardAvoidingView style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around',flexDirection:'row'}} >
           <SideBar navigation={navigation} page={"Notes"} />

            <View style={{flex: 1,paddingHorizontal:10,justifyContent: 'center',}} >
                <TouchableOpacity onPress={()=>{navigation.navigate('VeryShortNoteClassification',{sub:sub})}} style={{backgroundColor:Colors.hashWhite,padding: 10,borderRadius:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Walk Through</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Just main topics from chapters</Text>
                </TouchableOpacity>
                <View style={styles.grid} >
                    <TouchableOpacity onPress={()=>{navigation.navigate('BriefClassfication',{sub:sub})}} style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Chapter Explained Briefly</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Chapter explained briefly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Explantion video of core topics</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Each Topic explained induvidually</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.grid} >
                    <TouchableOpacity onPress={()=>{navigation.navigate('DeepClassfication',{sub:sub})}} style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Explanation</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Explaination and definition of topics.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('VideoClassification',{sub:sub})}}  style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Video Class</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Video Classes</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.grid} >
                    <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Mock Text</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Simple Mock tests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Mock Text</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Advanced Mock tests</Text>
                    </TouchableOpacity>
                </View>

                {
                  sub == 'math' ?  
                  <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary}]} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Complete Equations</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Complete Equations with uses and definition</Text>
                  </TouchableOpacity> : ''     
                }
                <View style={{backgroundColor:Colors.hashWhite,margin:5,borderRadius:10,marginBottom:20}} >
                    <TouchableOpacity onPress={NoteToggler} style={{backgroundColor:Colors.primary,padding: 10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderTopRightRadius:10,borderTopLeftRadius:10,borderBottomRightRadius:noteToggle ? 0 : 10,borderBottomLeftRadius:noteToggle ? 0 : 10}} >
                        <Text style={{color:noteToggle ? Colors.text : `${Colors.text}50`,fontFamily:Colors.Medium}} >Hey user</Text>
                        <FontAwesomeIcon color={noteToggle ? Colors.text : `${Colors.text}50`}  icon={noteToggle ? faAngleUp : faAngleDown} />
                    </TouchableOpacity>
                    <View style={{padding: 10,display:noteToggle ? 'flex' :'none'}} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Note: If you come across anything that might not be necessary or if you feel something is missing, please don't hesitate to send us a message.</Text>
                        {/* <TextInput
                            placeholder="Feel free to type your message, and if you prefer, kindly include your preferred method of communication for the response." 
                            multiline
                            value={message}
                            onChangeText={setMessage}
                            textAlignVertical="top"
                            style={{color:Colors.text,backgroundColor:Colors.secondary,borderRadius:10,elevation:10,marginVertical:10,paddingHorizontal:10,lineHeight:2,}}
                            numberOfLines={6} /> */}

                    <CutomTextInput 
                            keyboardType="email-address" 
                            label="Feel free to type your message" 
                            borderColor={Colors.text} 
                            horizontal={5} 
                            marginTop={10} 
                            value={message} 
                            textColor={Colors.text}
                            color={Colors.text}
                            onTextChange={setMessage} />   
                        <Text style={{color:'red',textAlign:'center',fontFamily:Colors.Medium,fontSize:12,display : noMesgWarn ? 'flex' :'none',marginTop:10}} >Type any message!</Text>
                        <TouchableOpacity onPress={sendMessage} style={{backgroundColor:Colors.primary,padding: 10,justifyContent:'center',alignItems:'center',borderRadius:10,elevation:10,marginTop:10}} >
                            <FontAwesomeIcon icon={faPaperPlane} color={Colors.white}  />
                        </TouchableOpacity>
                    </View>
                </View>    

                

            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    btn:{
        margin:3,
        borderRadius:10,
        elevation:10,
        marginTop:10,
        padding: 15,
    },
    grid:{
        flexDirection:'row'
    }
})

export default Classification;