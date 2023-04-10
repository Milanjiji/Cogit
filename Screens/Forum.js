import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, FlatList,Dimensions } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import colors  from '../colors.json'
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Forum = ({navigation}) =>{
    const [message,setMessage] = useState('');
    const [data,setData] = useState([{message:''}]);
    const [idCounter, setIdCounter] = useState(0);
    const [sender,setSender] = useState('otherUser');
    const [name,setName] = useState('')
    const [display,setDisplay] = useState(true)

    const height = Dimensions.get('window').height;
    const flatListRef = useRef(null);
    useEffect(() => {
        const fetchUserReply = async () =>{
            const ans = await AsyncStorage.getItem('UserReply_Ok');
            const name = await AsyncStorage.getItem('userName');
            console.log(name);
            setName(name);
            setDisplay(ans);
            
        }
        const unsubscribe = firestore()
            .collection('ChatData')
            .orderBy('id', 'asc')
            .onSnapshot((querySnapshot) => {
                const items = [];
                let counter = 0;
                querySnapshot.forEach((documentSnapshot) => {
                items.push(documentSnapshot.data());
                counter = documentSnapshot.data().id
                
                });
                setIdCounter(counter)
                setData(items);
            });
            fetchUserReply();
            return () => unsubscribe();
      }, []);

      const handleSend = () => {
        var newId = idCounter + 1;
        
        firestore()
          .collection('ChatData')
          .add({ id: newId, message,name:name })
          .then(() => {
            console.log('Message sent successfully');
            setMessage(''); 
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });
      }
    
      const renderItem = ({ item }) => {
        return (
            <View style={[styles.item,{
                alignSelf: item.name === name ? 'flex-end' :'flex-start'
                }]} key={item.id}>
                <Text style={{color:colors.white}} >{item.message}</Text>
            </View>
        );
      }
      const handleContentSizeChange = () => {
        flatListRef.current.scrollToEnd({ animated: true });
      };
      const handleUserReply = async () =>{
        setDisplay(false);
        await AsyncStorage.setItem('UserReply_Ok',false)
      }
    

    return(
        <View style={styles.background}  >
            <Header title="cogit" info="ellipsis" />
           <View style={{height:height,justifyContent:'space-around', display:display === true ? 'flex' : "none" }} >
                <View style={styles.warning} >
                    <Text style={styles.warningText} >
                    Welcome to our chat forum! This is a place for people to talk about different things openly. We want everyone to be kind and avoid posting anything mean or wrong. This includes saying things that hurt others, attacking them personally, or sending too many messages. If we see someone doing these things, we'll have to ban them from the forum. We want everyone to feel happy and safe here, so please follow these rules. We're excited to see you join the fun and talk about interesting things!
                    </Text>
                    <TouchableOpacity onPress={handleUserReply} >
                        <Text style={styles.reply} >OK I GOT IT!</Text>
                    </TouchableOpacity>
                </View>
            
           </View>
            
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={handleContentSizeChange}
                onLayout={handleContentSizeChange}
                />
            
            <View style={styles.Input} >
                <TextInput placeholderTextColor={colors.white} value={message} onChangeText={setMessage}  style={styles.textInput} placeholder="Type your message Here" />
                <TouchableOpacity onPress={handleSend} style={styles.Send} >
                    <FontAwesomeIcon size={25} color={colors.white} icon={faPaperPlane} />
                </TouchableOpacity>
            </View>
            <HomePageFootor navigation={navigation} />
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
        paddingLeft:10,
        color:colors.white
    },
    Send:{
        padding:12
    },
    item:{
        backgroundColor:colors.secondary,
        marginVertical:2,
        marginHorizontal:10,
        paddingVertical:7,
        paddingHorizontal:14,
        borderRadius:10,
    },
    warning:{
        margin:20,
        backgroundColor:colors.secondary,
        padding:10,
        
    },
    warningText:{
        color:colors.white,
        textAlign:'center',
        
    },
    reply:{
        backgroundColor:colors.primary,
        fontSize:20,
        fontFamily:colors.ExtraBold,
        color:colors.white,
        textAlign:'center',
        marginVertical:5,
        padding:10,
        borderRadius:10
    },
})

export default Forum;
