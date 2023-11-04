import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React,{useEffect,useState} from 'react'
import {FlatList, ScrollView, StyleSheet, Text,TouchableOpacity,View,TextInput} from 'react-native'
import Colors from '../colors.json'
import firestore from '@react-native-firebase/firestore';
 
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
            const name = JSON.parse(await AsyncStorage.getItem('userName'));
            setName(name);
            console.log(name);
        }   
        getName();
    },[])
    const setItemToAsync = async ({title,more,id,insta,face,tweet,yt,seeMore}) =>{
        const getLastData = JSON.stringify(await AsyncStorage.getItem('Posts'))
        try {
            if(getLastData !== null){
                await AsyncStorage.setItem('Posts',JSON.stringify([...getLastData,{title:title,more:more,id:id,insta:insta ? insta : '',face:face ? face : '',tweet:tweet ? tweet : '',yt:yt ? yt : '',seeMore:seeMore ? seeMore : ''}]));
            }else{
                await AsyncStorage.setItem('Posts',JSON.stringify({title:title,more:more,id:id,insta:insta ? insta : '',face:face ? face : '',tweet:tweet ? tweet : '',yt:yt ? yt : '',seeMore:seeMore ? seeMore : ''}));
            }
            
            console.log("successfully set post to async");
        } catch (error) {
            console.log("error from async storage while setting post to async",error);
        }
        
    }
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
                                likes:0,
                                comment:0
                            })
                            .then(() => {
                            console.log('Message sent successfully');
                            setItemToAsync(title,disc,totalArticles+1,insta ? insta : '',face ? face : '',tweet ? tweet : '',yt ? yt : '',link ? link :'')
                            setMsgSuccess(true);
                            setTitle('');
                            setDisc('');
                            setLink('');
                            setFace('');
                            setInsta('');
                            setTweet('');
                            setYt('');
                            setLoading(false);
                            navigation.navigate('Skills',{reload : true})
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
            <View style={{flex:1}} >

                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{marginHorizontal:20,marginTop:10}} >
                        <Text style={[styles.label,{color:Colors.text}]} >Title*:</Text>
                        <TextInput placeholderTextColor={Colors.hashWhite} placeholder='What you can do'  value={title} onChangeText={setTitle} style={[styles.input,{borderBottomColor:Colors.text,borderBottomWidth:0.5,color:Colors.text,}]}  />
                    </View>

                    <View style={{marginHorizontal:20}} >
                        <Text style={[styles.label,{color:Colors.text}]} >Discription*:</Text>
                        <TextInput placeholderTextColor={Colors.hashWhite} placeholder='More about your skill' value={disc} onChangeText={setDisc} style={[styles.input,{borderBottomColor:Colors.text,borderBottomWidth:0.5,color:Colors.text}]}  />
                    </View>

                    <View style={{marginHorizontal:20}} >
                        <Text style={[styles.label,{color:Colors.text}]} >External Links:</Text>
                        <TextInput placeholderTextColor={Colors.hashWhite} placeholder='eg: www.youtube.com' multiline={true} value={link} onChangeText={setLink} style={[styles.input,{borderBottomColor:Colors.text,borderBottomWidth:0.5,color:Colors.text}]}  />
                    </View>

                    <Text style={{color:Colors.text,textAlign:'center',fontFamily:Colors.Medium}} >Must include any medium to see your skill</Text>

                    <View style={{marginHorizontal:20}} >
                        <FontAwesomeIcon style={{marginLeft:10,marginBottom:5}} icon={faInstagram} color={Colors.text} />
                        <TextInput placeholderTextColor={Colors.hashWhite} placeholder='ex: @userName (optional)' value={insta} onChangeText={setInsta} style={[styles.input,{borderBottomColor:Colors.text,borderBottomWidth:0.5,color:Colors.text}]}  />
                    </View>

                    <View style={{marginHorizontal:20}} >
                        <FontAwesomeIcon style={{marginLeft:10,marginBottom:5}} icon={faFacebook} color={Colors.text} />
                        <TextInput placeholderTextColor={Colors.hashWhite} placeholder='ex: /userName (optional)' value={face} onChangeText={setFace} style={[styles.input,{borderBottomColor:Colors.text,borderBottomWidth:0.5,color:Colors.text}]}  />
                    </View>

                    <View style={{marginHorizontal:20}} >
                        <FontAwesomeIcon style={{marginLeft:10,marginBottom:5}} icon={faTwitter} color={Colors.text} />
                        <TextInput placeholderTextColor={Colors.hashWhite} placeholder='ex: userName (optional)' value={tweet} onChangeText={setTweet} style={[styles.input,{borderBottomColor:Colors.text,borderBottomWidth:0.5,color:Colors.text}]}  />
                    </View>

                    <View style={{marginHorizontal:20}} >
                        <FontAwesomeIcon style={{marginLeft:10,marginBottom:5}} icon={faYoutube} color={Colors.text} />
                        <TextInput placeholderTextColor={Colors.hashWhite} placeholder='ex: channel name (optional)' value={yt} onChangeText={setYt} style={[styles.input,{borderBottomColor:Colors.text,borderBottomWidth:0.5,color:Colors.text}]}  />
                    </View>
                   
                </ScrollView>
                

                <Text style={{fontFamily:Colors.Medium,color:'red',textAlign:'center',display:warn ? 'flex' : 'none'}} >buddy, fill up the fields</Text>

                <Text style={{fontFamily:Colors.Medium,color:Colors.text,textAlign:'center',display:msgSuccess ? 'flex' : 'none'}} >Posted successfully</Text>

                <Text style={{fontFamily:Colors.Medium,color:Colors.text,textAlign:'center',display:loading ? 'flex' : 'none'}} >posting...</Text>

                <TouchableOpacity onPress={Submit} style={[styles.postBtn,{backgroundColor:Colors.secondary}]} >
                    <Text style={[styles.postBtnText,{color:Colors.text}]} >Post</Text>
                </TouchableOpacity>  
            </View>
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
        padding: 10,
        marginBottom:15,
        marginTop:-10
    },
    postBtn:{
        alignItems:'center',
        borderRadius:50,
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