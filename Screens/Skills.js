import { faComment, faHeart as faHeartFree, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React,{useEffect,useState} from 'react'
import {FlatList, StyleSheet, Text,TouchableOpacity,View} from 'react-native'
import Header from '../components/Header';
import HomePageFootor from '../components/HomePageFootor';
import Colors from '../colors.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {  faCopy, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Clipboard from '@react-native-clipboard/clipboard';
import firestore from '@react-native-firebase/firestore';



const search = firestore().collection('Skills');

const Skills = ({navigation}) =>{
    const [data,setData] = useState([])
    const [Colors,setColors] = useState([]);
    const [likeLimit,setLikeLimit] = useState(false);
    const [liked,setLiked] = useState([]) 
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        
        
    },[])
    console.log(liked);
    useEffect(() => {
        const get = async () =>{
            const CommunityData = await firestore().collection('Skills').get();
            const data = CommunityData.docs.map(doc => ({
                i:doc.id,
                ...doc.data()
              }));
              
            setData(data);
        }
        get();
        
      }, []);

      
      const Copy = (text) =>{
        Clipboard.setString(text);
      }
      
      const liketext = async(id,totalLikes) =>{
        
            try {
            
                const documentRef = search.doc(id);
            
                await documentRef.update({
                  likes: totalLikes+1,
                });
            
                console.log('Document field updated successfully');
              } catch (error) {
                console.error('Error updating document field:', error);
              }
              setLiked([...liked,{id:id}])
              
        }
        
        const filter = (id) =>{
            const fil = liked.filter((item) => item.id === id);
            if(fil){
                return true;
            }else{
                return false;
            }
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
                <View style={{flexDirection:'row',marginVertical:5 }} >
                    <TouchableOpacity onPress={()=> liketext(item.i,item.likes)} >
                        <FontAwesomeIcon icon={faHeartFree}  size={22} color={Colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faComment} size={22} style={{marginLeft:30}}  color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:30}} >{filter(item.i) ? item.likes+1 : item.likes} Likes</Text>
                </View>    
                
            </View>
        )
      }
    return(
        <View style={[styles.App,{backgroundColor:Colors.Background}]} >
            <Header navigation={navigation} info="" title={'Skills'} />
            <View style={{flex:1}} >
                
                <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={renderItem}
                />
            </View>
            <HomePageFootor navigation={navigation} add={true} goto={'PostSkills'} />
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