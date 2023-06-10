import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React,{useEffect,useState} from 'react'
import {FlatList, ScrollView, StyleSheet, Text,TouchableOpacity,View,TextInput} from 'react-native'
import Header from '../components/Header';
import HomePageFootor from '../components/HomePageFootor';
import Colors from '../colors.json'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreviewArticle from '../components/PreviewArticle';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const PostSkill = ({navigation}) =>{
    const [title,setTitle] = useState('');
    const [disc,setDisc] = useState('');
    const [link,setLink] = useState('');
    const [face,setFace] = useState('');
    const [insta,setInsta] = useState('');
    const [tweet,setTweet] = useState('');
    const [yt,setYt] = useState('');


    const [Colors,setColors] = useState([]);

    const [totalArticles,setTotalArticles] = useState();
    const [warn,setWarn] = useState(false)
    const [msgSuccess,setMsgSuccess] = useState(false);
    const [loading,setLoading] = useState(false);
    const [name,setName] = useState('')
    useEffect(()=>{
        setMsgSuccess(false);
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const lastId = async() =>{
            const users = await firestore().collection('Skills').get()
            setTotalArticles(users.size);
            console.log('totaol event => ',users.size);
        }
        lastId();
        const getName = async() =>{
            const name = await AsyncStorage.getItem('userName');
            setName(name);
            console.log(name);
        }   
        getName();
    },[])

    const Submit = async() =>{
        
            if(
                title && disc 
            ){
                if(insta || face || tweet || yt){
                    setLoading(true);
                    setWarn(false);
                    console.log(title,disc);
                    try{
                        firestore()
                            .collection('Skills')
                            .add({
                                title:title,
                                more:disc,                               
                                id:totalArticles+1,
                                insta:insta,
                                face:face,
                                tweet:tweet,
                                yt:yt,
                                seeMore:link,
                                userName:name,
                                like:0,
                                comment:0
                            })
                            .then(() => {
                            console.log('Message sent successfully');
                            setMsgSuccess(true);
                            setTitle('');
                            setDisc('');
                            setLink('');
                            setFace('');
                            setInsta('');
                            setTweet('');
                            setYt('');
                            setLoading(false);
                            navigation.navigate('Skills')
                            })
                            .catch((error) => {
                            console.log('Error sending message:', error);
                            });
                            
                            
                    }catch(e){
                        console.log("error while adding data: ",e);
                    }
                }else{
                    setWarn(true);
                }
            } else{
                setWarn(true);
            }
        }
        

    

    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background}} >
            <Header navigation={navigation} info="ellipsis" title={'Post'} />
            <View style={{flex:1}} >

                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{marginHorizontal:20,marginTop:10}} >
                        <Text style={[styles.label,{color:Colors.text}]} >Title*:</Text>
                        <TextInput placeholder='What you can do' value={title} onChangeText={setTitle} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text,}]}  />
                    </View>

                    <View style={{marginHorizontal:20}} >
                        <Text style={[styles.label,{color:Colors.text}]} >Discription*:</Text>
                        <TextInput placeholder='More about your skill' value={disc} onChangeText={setDisc} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                    </View>

                    <View style={{marginHorizontal:20}} >
                        <Text style={[styles.label,{color:Colors.text}]} >External Links:</Text>
                        <TextInput placeholder='eg: www.youtube.com' multiline={true} value={link} onChangeText={setLink} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                    </View>

                    <Text style={{color:Colors.text,textAlign:'center',fontFamily:Colors.Medium}} >Must include any medium to see your skill</Text>

                    <View style={{marginHorizontal:20}} >
                        <FontAwesomeIcon style={{marginLeft:10,marginBottom:5}} icon={faInstagram} color={Colors.text} />
                        <TextInput placeholder='ex: @userName (optional)' value={insta} onChangeText={setInsta} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                    </View>

                    <View style={{marginHorizontal:20}} >
                        <FontAwesomeIcon style={{marginLeft:10,marginBottom:5}} icon={faFacebook} color={Colors.text} />
                        <TextInput placeholder='ex: /userName (optional)' value={face} onChangeText={setFace} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                    </View>

                    <View style={{marginHorizontal:20}} >
                        <FontAwesomeIcon style={{marginLeft:10,marginBottom:5}} icon={faTwitter} color={Colors.text} />
                        <TextInput placeholder='ex: userName (optional)' value={tweet} onChangeText={setTweet} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                    </View>

                    <View style={{marginHorizontal:20}} >
                        <FontAwesomeIcon style={{marginLeft:10,marginBottom:5}} icon={faYoutube} color={Colors.text} />
                        <TextInput placeholder='ex: channel name (optional)' value={yt} onChangeText={setYt} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                    </View>
                   
                </ScrollView>
                

                <Text style={{fontFamily:Colors.Medium,color:'red',textAlign:'center',display:warn ? 'flex' : 'none'}} >buddy, fill up the fields</Text>

                <Text style={{fontFamily:Colors.Medium,color:Colors.text,textAlign:'center',display:msgSuccess ? 'flex' : 'none'}} >Posted successfully</Text>

                <Text style={{fontFamily:Colors.Medium,color:Colors.text,textAlign:'center',display:loading ? 'flex' : 'none'}} >posting...</Text>

                <TouchableOpacity onPress={Submit} style={[styles.postBtn,{backgroundColor:Colors.secondary}]} >
                    <Text style={[styles.postBtnText,{color:Colors.text}]} >Post</Text>
                </TouchableOpacity>  
            </View>
            <HomePageFootor navigation={navigation}  />
        </View>
    )
}
const styles = StyleSheet.create({
    label:{
        fontFamily:Colors.Medium,
        elevation:10,
        marginLeft:10,
        marginBottom:3
    },
    input:{
        borderRadius:10,
        elevation:10,
        padding: 10,
        marginBottom:10
    },
    postBtn:{
        alignItems:'center',
        borderRadius:10,
        elevation:10,
        marginTop:10,
        marginHorizontal:20,
        marginBottom:10
    },
    postBtnText:{
        padding: 10,
        fontFamily:Colors.Bold,
        
    }
})
export default PostSkill;