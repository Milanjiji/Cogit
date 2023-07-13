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
    const [name,setName] = useState('')
    const [display,setDisplay] = useState(true);
    const [warn,setWarn] = useState(true);
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

    const height = Dimensions.get('window').height;
    const flatListRef = useRef(null);
    useEffect(() => {
        const fetchUserReply = async () =>{
            const name = await AsyncStorage.getItem('userName');
            setName(name);
            
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
        if(message){
            setWarn(false);
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
        }else{
            setWarn(true)
        }
        
      }
    
      const renderItem = ({ item }) => {
        return (
            <View style={[styles.item,{
                alignSelf: item.name === name ? 'flex-end' :'flex-start',
                backgroundColor:Colors.primary,
                elevation:10
                }]} key={item.id}>
                <Text style={{color:Colors.text,alignSelf: item.name === name ? 'flex-end' :'flex-start',fontSize:9}} >{item.name}</Text>
                <Text style={{color:Colors.text}} >{item.message}</Text>
            </View>
        );
      }
      const handleContentSizeChange = () => {
        flatListRef.current.scrollToEnd({ animated: true });
      };
      const handleUserReply = async () =>{
        setDisplay(false);
      }
    

    return(
        <View style={[styles.background,{backgroundColor:Colors.Background}]}  >
            <Header navigation={navigation} title="cogit" info="ellipsis" />
           <View style={{height:height,justifyContent:'space-around', display:display === true ? 'flex' : "none",elevation:10 }} >
                <View style={[styles.warning,{backgroundColor:Colors.primary}]} >
                    <Text style={[styles.warningText,{color:Colors.text}]} >
                    Welcome to our chat forum! This is a place for people to talk about different things openly. We want everyone to be kind and avoid posting anything mean or wrong. This includes saying things that hurt others, attacking them personally, or sending too many messages. If we see someone doing these things, we'll have to ban them from the forum. We want everyone to feel happy and safe here, so please follow these rules. We're excited to see you join the fun and talk about interesting things!
                    </Text>
                    <TouchableOpacity onPress={handleUserReply} >
                        <Text style={[styles.reply,{color:Colors.text,backgroundColor:Colors.secondary}]} >OK I GOT IT!</Text>
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
            
            <View style={[styles.Input,{backgroundColor:Colors.primary}]} >
                <TextInput placeholderTextColor={colors.white} value={message} onChangeText={setMessage}  style={styles.textInput} placeholder="Type your message Here" />
                <TouchableOpacity onPress={handleSend} style={styles.Send} >
                    <FontAwesomeIcon size={25} color={message ? Colors.text : Colors.secondary} icon={faPaperPlane} />
                </TouchableOpacity>
            </View>
            <HomePageFootor marginTop={true} navigation={navigation} />
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
        padding:10,
        borderRadius:10
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
