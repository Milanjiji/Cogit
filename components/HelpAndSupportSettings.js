import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, Linking } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faAngleRight, faAngleUp, faArrowDownShortWide, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { storage } from "../Storage";

const search = firestore().collection('Users');

const HelpAndSupport = ({navigation}) =>{
    const [updateHelp,setHelpUpdate] = useState(false);
    const [help,setHelp] = useState('');
    const [updateSupport,setSupportUpdate] = useState(false);
    const [support,setSupport] = useState('');
    const [updateFeedback,setFeedbackUpdate] = useState(false);
    const [feedback,setFeedback] = useState('');
    
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

    },[])

    const SubmitHelp = async() =>{
        const encoded = encodeURIComponent(help);
        Linking.openURL(`whatsapp://send?text=${encoded}`);
    }
    const SubmitSupport = async() =>{
        const encoded = encodeURIComponent(support);
        Linking.openURL(`whatsapp://send?text=${encoded}`);
    }

    const SubmitFeedback = async() =>{
        const encoded = encodeURIComponent(feedback);
        Linking.openURL(`whatsapp://send?text=${encoded}`);
    }

    return(
        <View style={{padding: 10,margin:3,borderRadius:10}}>

            <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20}} >Help and Support</Text>
            <TouchableOpacity onPress={()=>{setHelpUpdate(!updateHelp)}} style={{marginTop:10}} >
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Help</Text>
                    <FontAwesomeIcon color={Colors.text} style={{marginRight:10}} icon={updateHelp ? faAngleUp : faAngleDown} />
                </View>
                <View style={{marginVertical:10 ,display:updateHelp ? 'flex':'none'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Submit your questions</Text>
                    <TextInput value={help} onChangeText={setHelp} style={[styles.input,{backgroundColor:Colors.secondary,color:Colors.text,fontFamily:Colors.Medium}]} />
                    <TouchableOpacity onPress={SubmitHelp} style={[styles.update,{backgroundColor:Colors.secondary}]} >
                        <Text style={{color:help ? Colors.text : Colors.primary,fontFamily:Colors.Medium,textAlign:'center'}} >Submit</Text>
                    </TouchableOpacity>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >You will get reponse in 1 or 2 days(you will be directed to whatsapp for sending message)</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>{setSupportUpdate(!updateSupport)}} style={{marginTop:10}} >
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Support</Text>
                    <FontAwesomeIcon color={Colors.text} style={{marginRight:10}} icon={updateSupport ? faAngleUp : faAngleDown} />
                </View>
                <View style={{marginVertical:10 ,display:updateSupport ? 'flex':'none'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Submit what kind of support you like to give.</Text>
                    <TextInput value={support} onChangeText={setSupport} style={[styles.input,{backgroundColor:Colors.secondary,color:Colors.text,fontFamily:Colors.Medium}]} />
                    <TouchableOpacity onPress={SubmitSupport} style={[styles.update,{backgroundColor:Colors.secondary}]} >
                        <Text style={{color:support ? Colors.text : Colors.primary,fontFamily:Colors.Medium,textAlign:'center'}} >Submit</Text>
                    </TouchableOpacity>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >You will get reponse in 1 or 2 days(you will be directed to whatsapp for sending message)</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=>{setFeedbackUpdate(!updateFeedback)}} style={{marginTop:10}} >
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Feedback</Text>
                    <FontAwesomeIcon color={Colors.text} style={{marginRight:10}} icon={updateFeedback ? faAngleUp : faAngleDown} />
                </View>
                <View style={{marginVertical:10 ,display:updateFeedback ? 'flex':'none'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Submit your feedback</Text>
                    <TextInput value={feedback} onChangeText={setFeedback} style={[styles.input,{backgroundColor:Colors.secondary,color:Colors.text,fontFamily:Colors.Medium}]} />
                    <TouchableOpacity onPress={SubmitFeedback} style={[styles.update,{backgroundColor:Colors.secondary}]} >
                        <Text style={{color:feedback ? Colors.text : Colors.primary,fontFamily:Colors.Medium,textAlign:'center'}} >Submit</Text>
                    </TouchableOpacity>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >You will get reponse in 1 or 2 days(you will be directed to whatsapp for sending message)</Text>
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
    input:{
        borderRadius:10,
        paddingHorizontal:10,
        elevation:10,
        marginVertical:10
    },
    update:{
        paddingHorizontal:20 ,
        paddingVertical:10,
        borderRadius:10,
        elevation:10,
        width:'30%',
        textAlign:'center',
        alignSelf:'center',
        marginVertical:10
    }
    
})

export default HelpAndSupport;
