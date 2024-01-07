import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, FlatList,Dimensions, Modal } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faInfoCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import colors  from '../colors.json'
import SideBar from "../components/SideBar";
import { useIsFocused } from '@react-navigation/native';
import { storage } from "../Storage";


const Forum = ({navigation}) =>{
    const [message,setMessage] = useState('');
    const [data,setData] = useState([{message:'Loading...'}]);
    const [name,setName] = useState('')
    const [display,setDisplay] = useState(true);
    const [Colors,setColors] = useState([]);
    const [lastIdSNP,setLastIdSNP] = useState(0);
    const [groundState,setGroundState] = useState(true);
    const [reason,setReason] = useState('technical Issue')
    const [newIdStatus,setnewIdStatus] = useState(false);
    const isFocused = useIsFocused();

    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const forumState = async () =>{
            try {
                const CommunityData = await firestore().collection('ForumState').get();
                const data = CommunityData.docs.map(doc => ({
                i:doc.id,
                ...doc.data()
              }));
              console.log(data[0].state);
              setGroundState(data[0].state);
              setReason(data[0].reason);
            } catch (error) {
                
            }
        }
        forumState();
    },[])

    const height = Dimensions.get('window').height;
    const flatListRef = useRef(null);
    useEffect(() => {
        const fetchUserReply = async () =>{
            const name = storage.getString('userName')
            setName(JSON.parse(name));
            console.log("name of the candidate " );
        }
        
        fetchUserReply();
        const setLastId = () => {
            storage.set('LastMsgId',lastIdSNP)
        }
        
      }, []);

      useEffect(()=>{
        if(isFocused){
        const unsubscribe = firestore()
            .collection('ChatData')
            .orderBy('id', 'desc')
            .limit(30)
            .onSnapshot((querySnapshot) => {
                const items = [];
                let counter = 0;
                querySnapshot.forEach((documentSnapshot) => {
                const dataWithId = {
                    i: documentSnapshot.id,
                    ...documentSnapshot.data(),
                };
                items.push(dataWithId);
                counter = documentSnapshot.data().id
                });
                const sortedData = items.sort((a, b) => a.id - b.id);
                setData(sortedData);
            
                if(sortedData.length > 0){
                    const ids = sortedData.map(obj => {return obj.id})
                    const lastId = Math.max(...ids)
                    console.log(ids," largest id : ",lastId);
                    storage.set('LastMsgId',lastId)
                }
            });
            console.log("Forum is Focued")
            return () => unsubscribe();
        }
      },[isFocused])
      
      const handleSend = async () => {
        const chatdata = await firestore().collection('ChatData').get()
        if(message){
        
            firestore()
              .collection('ChatData')
              .add({ id: chatdata.size+1, message,name:name })
              .then(() => {
                console.log('Message sent successfully');
                setMessage(''); 
              })
              .catch((error) => {
                console.log('Error sending message:', error);
              });
        }else{
        }
        
      }
      
      const deleteMsg = async (messageId,Name) =>{
        console.log("trying to delete the document");
        if(name == Name){
            console.log("deletinf the docueme");
            try {
                console.log("deleting");
                firestore()
                    .collection('ChatData') 
                    .doc(messageId)
                    .delete()
                    .then(() => {
                        console.log('Message deleted successfully.');
                    })
                    .catch((error) => {
                        console.error('Error deleting message: ', error);
                    });
            } catch (error) {
                console.log(error);
            }
        }
      }
      const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={item.name === name ? 0.5 : 1} onLongPress={()=>deleteMsg(item.i,item.name)} style={[styles.item,{
                alignSelf: item.name === name ? 'flex-end' :'flex-start',
                backgroundColor:Colors.primary,
                elevation:10
                }]} key={item.id}>
                <Text style={{color:Colors.text,alignSelf: item.name === name ? 'flex-end' :'flex-start',fontSize:9}} >{item.name}</Text>
                <Text style={{color:Colors.text,textAlign : item.name === name ? 'right' :'left'}} >{item.message}</Text>
            </TouchableOpacity>
        );
      }
      
      const handleContentSizeChange = () => {
        flatListRef.current.scrollToEnd({ animated: true });
      };
      const handleUserReply = async () =>{
        setDisplay(false);
      }

      
    

    return(
        <View style={[styles.background,{backgroundColor:Colors.Background,flexDirection:'row'}]}  >

            <SideBar navigation={navigation} page={"Forum"} />
            
                <View style={{backgroundColor:Colors.Background,flex: 1,alignItems:'center',justifyContent: 'center',paddingHorizontal:10,display : groundState ? 'none' :'flex'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >Sorry, ground will be closed for some period due to some techincal reason</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginTop:10}} ><Text style={{fontFamily:Colors.Bold}} >reason: </Text>{reason}</Text>
                </View>
        
            <View style={{flex: 1,display:groundState ? 'flex' :'none'}} >
                <View style={{height:height,justifyContent:'space-around', display:display === true ? 'flex' : "none",elevation:10 }} >
                        <View style={[styles.warning,{backgroundColor:Colors.primary}]} >
                            <Text style={[styles.warningText,{color:Colors.text}]} >
                            Welcome to our chat forum! This is a place for people to talk about different things openly. We want everyone to be kind and avoid posting anything mean or wrong. This includes saying things that hurt others, attacking them personally, or sending too many messages. If we see someone doing these things, we'll have to ban them from the forum. We want everyone to feel happy and safe here, so please follow these rules. We're excited to see you join the fun and talk about interesting things!
                            </Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,justifyContent:'center',marginVertical:10}} >
                                <FontAwesomeIcon color={Colors.text} icon={faInfoCircle} />
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >Delete msg : Touch and hold until it delete</Text>
                            </View>
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
                        <FontAwesomeIcon size={25} color={message ? '#7300e6' : '#ffffff10'} icon={faPaperPlane} />
                    </TouchableOpacity>
                </View>
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
