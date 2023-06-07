import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React,{useEffect,useState} from 'react'
import {FlatList, StyleSheet, Text,TouchableOpacity,View} from 'react-native'
import Header from '../components/Header';
import HomePageFootor from '../components/HomePageFootor';
import Colors from '../colors.json'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faCopy, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Clipboard from '@react-native-clipboard/clipboard';

const Skills = ({navigation}) =>{
    const [data,setData] = useState([])
    const [Colors,setColors] = useState([]);

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        
    },[])

    useEffect(() => {
        const get = async () =>{
            const CommunityData = await firestore().collection('Skills').get();
            const data = CommunityData.docs.map(doc => doc.data())
            setData(data);
        }
        get();
        
      }, []);

      const goToView = (title,overView,content,id)=>{
        navigation.navigate('ViewArticle',{title,overView,content,id})
      }
      const Copy = (text) =>{
        Clipboard.setString(text);
      }
      const renderItem = ({item}) =>{
        return(
            <View style={{backgroundColor:Colors.primary,margin:10,borderRadius:10,elevation:10,padding: 8,}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20,marginVertical:3}} >{item.title}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginVertical:3}} >{item.userName}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginVertical:3}} >{item.more}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginVertical:3}} >See More at : (Click the link's to copy )</Text>
                    {
                        item.seeMore ? 
                            <TouchableOpacity onPress={()=> Copy(item.seeMore)} style={{flexDirection:'row',alignItems:'center',marginVertical:3}} >
                                <FontAwesomeIcon color={Colors.text} icon={faCopy} />
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >{item.seeMore}</Text>
                            </TouchableOpacity>     
                             : ''                        
                    }
                    {
                        item.yt ? 
                            <TouchableOpacity onPress={()=> Copy(item.yt)} style={{flexDirection:'row',alignItems:'center',marginVertical:3}} >
                                <FontAwesomeIcon color={Colors.text} icon={faYoutube} />
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >{item.yt}</Text>
                            </TouchableOpacity>     
                             : ''                        
                    }
                    {
                        item.insta ? 
                            <TouchableOpacity onPress={()=> Copy(item.insta)} style={{flexDirection:'row',alignItems:'center',marginVertical:3}} >
                                <FontAwesomeIcon color={Colors.text} icon={faInstagram} />
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >{item.insta}</Text>
                            </TouchableOpacity>     
                             : ''                        
                    }
                    {
                        item.face ? 
                            <TouchableOpacity onPress={()=> Copy(item.face)} style={{flexDirection:'row',alignItems:'center',marginVertical:3}} >
                                <FontAwesomeIcon color={Colors.text} icon={faFacebook} />
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >{item.face}</Text>
                            </TouchableOpacity>     
                             : ''                        
                    }
                    {
                        item.tweet ? 
                            <TouchableOpacity onPress={()=> Copy(item.tweet)} style={{flexDirection:'row',alignItems:'center',marginVertical:3}} >
                                <FontAwesomeIcon color={Colors.text} icon={faTwitter} />
                                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >{item.tweet}</Text>
                            </TouchableOpacity>     
                             : ''                        
                    }
                
            </View>
        )
      }
    return(
        <View style={[styles.App,{backgroundColor:Colors.Background}]} >
            <Header navigation={navigation} info="" title={'Skills'} />
            <View style={{flex:1}} >
                <TouchableOpacity onPress={()=>navigation.navigate('PostSkills')} >
                    <View style={[styles.header,{backgroundColor:Colors.primary}]} >
                        <Text style={[styles.header_Text,{color:Colors.text}]} >Show others what you can do</Text>
                        <TouchableOpacity style={styles.header_Btn} >
                            <FontAwesomeIcon color={Colors.text} size={20} icon={faPlus} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={renderItem}
                />
            </View>
            <HomePageFootor navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    App:{
        flex:1,
        backgroundColor:Colors.Background
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:8,
        margin:8,
        backgroundColor:Colors.primary,
        elevation:10,
        borderRadius:10,
        alignItems:'center',
        marginVertical:5
    },
    header_Text:{
        fontFamily:Colors.Regular,
        fontSize:18,
        color:Colors.white
    },
    container:{
        margin:10,
        padding:8,
        backgroundColor:Colors.primary,
        borderRadius:10,
        elevation:10
    },
    Title:{
        color:Colors.white,
        fontSize:24,
        fontFamily:Colors.Bold
    },
    overView:{
        color:Colors.white,

    },
})
export default Skills;