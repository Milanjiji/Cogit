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

const AddArticle = ({navigation}) =>{
    const [title,setTitle] = useState('');
    const [article,setArticle] = useState('');
    const [extra,setExtra] = useState('');
    const [overView,setOverView] = useState('');
    const [Colors,setColors] = useState([]);
    const [totalArticles,setTotalArticles] = useState();
    const [btnText,setBtnText] = useState('Preview');
    const [warn,setWarn] = useState(false)
    const [addPreviewToggler,setAddPreviewToggler] = useState(true);
    const [msgSuccess,setMsgSuccess] = useState(false);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        setMsgSuccess(false);
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const lastId = async() =>{
            const users = await firestore().collection('Community').get()
            setTotalArticles(users.size);
            console.log('totaol event => ',users.size);
        }
        lastId();
    },[])

    const Submit = async() =>{
        
            if(
                btnText === 'Preview' && title && article
            ){
                setAddPreviewToggler(false);
                setBtnText('Post');
                setWarn(false);
                console.log(title,article);
            
            }else if(btnText === 'Post' && title && article){
                setLoading(true);
                try{
                    firestore()
                        .collection('Community')
                        .add({
                               Title:title,
                               content:article,
                               overView:overView,
                               extra:extra,
                               id:totalArticles+1
                        })
                        .then(() => {
                        console.log('Message sent successfully');
                        setMsgSuccess(true);
                        setAddPreviewToggler(true);
                        setBtnText('Preview');
                        setTitle('');
                        setArticle('');
                        setOverView('');
                        setExtra('');
                        setLoading(false);
                        })
                        .catch((error) => {
                        console.log('Error sending message:', error);
                        });
                        
                        
                }catch(e){
                    console.log("error while adding data: ",e);
                }
            } else{
                setWarn(true);
            }
        }
        

    

    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background}} >
            <Header info="ellipsis" title={'Post'} />
            <View style={{flex:1}} >
                <ScrollView showsVerticalScrollIndicator={false} style={{display:addPreviewToggler ? 'flex' :'none'}} >
                    <View style={{marginHorizontal:20,marginTop:10}} >
                        <Text style={[styles.label,{color:Colors.text}]} >Title*:</Text>
                        <TextInput placeholder='Heading' value={title} onChangeText={setTitle} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                    </View>
                    <View style={{marginHorizontal:20}} >
                        <Text style={[styles.label,{color:Colors.text}]} >overView*:</Text>
                        <TextInput placeholder='overView' value={overView} onChangeText={setOverView} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                    </View>
                    <View style={{marginHorizontal:20}} >
                        <Text style={[styles.label,{color:Colors.text}]} >Article*:</Text>
                        <TextInput placeholder='Content' multiline={true} value={article} onChangeText={setArticle} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                    </View>
                    <View style={{marginHorizontal:20}} >
                        <Text style={[styles.label,{color:Colors.text}]} >Extra(optional):</Text>
                        <TextInput placeholder='ex: www.youtube.com' value={extra} onChangeText={setExtra} style={[styles.input,{backgroundColor:Colors.primary,color:Colors.text}]}  />
                    </View>
                   
                </ScrollView>
                <ScrollView showsVerticalScrollIndicator={false} style={{display : !addPreviewToggler ? 'flex': 'none',flex: 1,}} >
                    <PreviewArticle title={title} overView={overView} content={article} extra={extra}/>
                    <Text style={{fontFamily:Colors.Medium,color:Colors.text,textAlign:'center',display:loading ? 'flex' : 'none'}} >Posting Article</Text>
                </ScrollView>

                <Text style={{fontFamily:Colors.Medium,color:'red',textAlign:'center',display:warn ? 'flex' : 'none'}} >buddy, fill up the fields</Text>

                <Text style={{fontFamily:Colors.Medium,color:Colors.text,textAlign:'center',display:msgSuccess ? 'flex' : 'none'}} >Article posted successfully</Text>

                <Text style={{fontFamily:Colors.Medium,color:Colors.text,textAlign:'center',display:loading ? 'flex' : 'none'}} >posting...</Text>

                <TouchableOpacity onPress={Submit} style={[styles.postBtn,{backgroundColor:Colors.secondary}]} >
                    <Text style={[styles.postBtnText,{color:Colors.text}]} >{btnText}</Text>
                </TouchableOpacity>  
            </View>
            <HomePageFootor navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    label:{
        fontFamily:Colors.Medium,
        elevation:10,
        
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
export default AddArticle;