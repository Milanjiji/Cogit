import React,{useState,useEffect} from "react";
import { View,Text, TouchableOpacity, StyleSheet, ImageBackground,KeyboardAvoidingView, Image,Linking } from "react-native";
import SideBar from "../../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import firestore from '@react-native-firebase/firestore';
import CutomTextInput from "../../components/CutomTextInput";
import { storage } from "../../Storage";
import background from '../../assets/images/background.png'

const Classification = ({navigation,route}) =>{
    const [Colors,setColors] = useState([])
    const [title,setTitle] = useState('')
    const [noteToggle,setNoteToggle] = useState(false);
    const [message,setMessage] = useState('');
    const [noMesgWarn,setNoMsgWarn] = useState(false);
    const [lastId,setLastId] = useState();
    const [phone,setPhone] = useState('');
    const [name,setName] = useState('');
    const [clas,setClass] = useState(false);
    const {sub} = route.params;
    const image = {uri: 'https://firebasestorage.googleapis.com/v0/b/fir-e4bcf.appspot.com/o/background.png?alt=media&token=1d4c61d7-9b63-43a4-a485-9c3674eb442e'};
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        console.log(sub);
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
        const fetchClass = () =>{
            const clas = storage.getString('class')
            if(clas === '10') {
                setClass(true)
            }else{
                setClass(false)
            }
        }
        fetchClass();
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

    const openWebsite = () => {
        const websiteUrl = 'https://maps.app.goo.gl/BeybUjNsUX2DvWNM7'; // Replace with the URL you want to open
    
        Linking.canOpenURL(websiteUrl).then((supported) => {
          if (supported) {
            // The URL can be opened
            Linking.openURL(websiteUrl);
          } else {
            console.error('Cannot open URL');
          }
        }).catch((err) => console.error('An error occurred', err));
      };
    

    return(
        <ImageBackground source={image} resizeMode="cover" style={{flex:1,backgroundColor:Colors.Backgorund}} >
        <KeyboardAvoidingView style={{flex: 1,justifyContent:'space-around',flexDirection:'row'}} >
            
           <SideBar navigation={navigation} page={"Notes"} />

            <View style={{flex: 1,paddingHorizontal:10,justifyContent: 'center',}} >
                <TouchableOpacity onPress={()=>{navigation.navigate('CmapClassification',{sub:sub})}} style={{backgroundColor:Colors.hashWhite,padding: 10,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',display:clas ? 'none' :'flex'}} >
                    <View>
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18,marginLeft:10}} >Concept Map</Text>
                        <TouchableOpacity onPress={openWebsite} >
                             <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:11,marginLeft:10,marginTop:5,textDecorationStyle:"solid",textDecorationLine:'underline',textDecorationColor:Colors.text}}  >Credits to {"\n"}FTS Entrance acdmy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
                        <Image style={{width:100,height:100,marginLeft:10}} source={require('../../assets/images/concept.png')} />
                        <Text style={{color:'#f6d604',fontFamily:Colors.Medium,transform: [{ rotate: '-90deg' }],fontSize:11}} >LE</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.grid} >
                    
                    <TouchableOpacity onPress={()=>{navigation.navigate('DeepClassfication',{sub:sub})}} style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Explanation</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Explaination and definition of topics.This notes does not contain diagrams </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{navigation.navigate('VideoClassification',{sub:sub})}} style={[styles.btn,{backgroundColor:Colors.primary,flex:1}]} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Explantion video from yt</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Embeded best video classes by main yt educational channels in mal</Text>
                    </TouchableOpacity>
                </View>
                
                

                {
                  sub == 'math' ?  
                  <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary}]} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Complete Equations</Text>
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
        </ImageBackground>
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