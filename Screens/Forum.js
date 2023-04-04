import React ,{useState,useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity,ScrollView,SafeAreaView,StyleSheet, DynamicColorIOS } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import colors  from '../colors.json'


const Forum = () =>{
    const [message,setMessage] = useState('');
    const [data,setData] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('ChatData')
            .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
                console.log(documentSnapshot.data());
                setData([...data,documentSnapshot.data()])
            });
            });

        return () => unsubscribe();
    }, []);

    const Send = () =>{
        firestore()
            .collection('ChatData')
            .add({messages: message})
            .then(()=>{
                console.log("message send successfully");
            }).catch((err)=>{
                console.log("Message send error :",err);
            });
    }
    
    const show = () =>{
        console.log(data);
    }
    

    return(
        <View style={styles.background}  >
            <View>
                <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nisi animi sunt molestiae iusto dolore corrupti explicabo expedita at. Architecto earum eveniet aut laborum fugit ut ullam provident quisquam est?
                </Text>
            </View>
            <View>
                {data.map((message,index)=>{
                    <Text key={index} >{message}kjsdbfvjk</Text>
                })}
            </View>
            <View style={styles.Input} >
                <TextInput onChangeText={setMessage}  style={styles.textInput} placeholder="Type your message Here" />
                <TouchableOpacity onPress={show} style={styles.Send} >
                    <FontAwesomeIcon size={25} color={colors.white} icon={faPaperPlane} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background:{
        backgroundColor:colors.primary,
        flex:1
    },
    Input:{
       flexDirection:'row',
       backgroundColor:colors.secondary,
       margin:10,
       borderRadius:10 
    },
    textInput:{
        flex:1,
        paddingLeft:10
    },
    Send:{
        padding:12
    }
})

export default Forum;
