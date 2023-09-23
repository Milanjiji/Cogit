import { faHeart as faHeartFree, faPlusSquare} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React,{useEffect,useState} from 'react'
import {FlatList, StyleSheet, Text,TouchableOpacity,View,ScrollView} from 'react-native'
import Header from '../components/Header';
import Colors from '../colors.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {  faArrowDown, faCopy,faHeart as faHeartSolid, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Clipboard from '@react-native-clipboard/clipboard';
import firestore from '@react-native-firebase/firestore';



const search = firestore().collection('Skills');

const Skills = ({navigation,route}) =>{
    const [data,setData] = useState([])
    const [Colors,setColors] = useState([]);
    const [likedData,setLikedData] = useState([{id:20}]);
    const [loading,setLoading] = useState(false);
    const [startId,setStartId] = useState(21);
    const [lastId,setLastId] = useState(41);
    const [endReached,setEndReached] = useState(false);

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
            console.log(colors);
        }
        getColors();
            
    },[])
    useEffect(() => {
        const get = async () =>{
            setLoading(true);
            console.log('true');
            const CommunityData = await firestore().collection('Skills').orderBy('id', 'desc').limit(20).get();
            const data = CommunityData.docs.map(doc => ({
                i:doc.id,
                ...doc.data()
              }));
            setData(data);
            setLoading(false);
            console.log(data);
        }
        get();
        const getLikedData = async () =>{
            const data = await AsyncStorage.getItem('likedContents');
            const value = JSON.parse(data);
            if(value){
                setLikedData(value)
            }
            
        }
        getLikedData();
      }, []);

      const fetcLast10 = async () =>{
        try {
        
            const querySnapshot = await firestore()
              .collection('Skills')
              .where('id', '>=', startId)
              .where('id', '<=', lastId)
              .get();
        
            const documentsInRange = [];
        
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              documentsInRange.push({
                id: doc.id,
                ...data,
              });
            });
        
            console.log(documentsInRange.length)
            setEndReached(documentsInRange.length == 0 ? true : false);
            setData([...data,...documentsInRange])
            setStartId(startId + 20);
            setLastId(lastId + 20);
          } catch (error) {
            console.error('Error fetching documents in range:', error);
          }
      }

      const Copy = (text) =>{
        Clipboard.setString(text);
      }


      const liketext = async(id,totalLikes) =>{
            const idExists = likedData.some(item => item.id === id);
            if(!idExists){
                try {
                
                    const documentRef = search.doc(id);
                
                    await documentRef.update({
                      likes: totalLikes+1,
                    });
    
                    const updatedData = data.map(item => {
                        if (item.i === id) {
                          return { ...item, likes: totalLikes+1 };
                        }
                        return item;
                      });
                      setData(updatedData);
                      setLikedData([...likedData,{id:id}])
    
                      const StringifiedData = JSON.stringify([...likedData,{id:id}])
                      AsyncStorage.setItem('likedContents',StringifiedData);
                    console.log('Document field updated successfully');
                  } catch (error) {
                    console.error('Error updating document field:', error);
                  }
                  
            }else{
                console.log('its alreaddy liked');
            }      
        }
        
        
      const CheackIfLiked = (id) =>{
        if(likedData){
            const idExists = likedData.some(item => item.id === id);
            return idExists;
        }
        
      }

            
      const renderItem = ({item}) =>{

        return(
            <View  style={{backgroundColor:Colors.primary,marginHorizontal:10,marginVertical:3,borderRadius:10,elevation:10,padding: 8,}} >
                
                <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20,marginVertical:3}} >{item.title}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginVertical:3}} >{item.userName}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginVertical:3}} >{item.more}</Text>
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
                <View style={{flexDirection:'row',marginVertical:5 ,justifyContent:'space-between'}} >
                   <View style={{flexDirection:'row'}} >
                        <TouchableOpacity onPress={()=> liketext(item.i,item.likes)} >
                            <FontAwesomeIcon icon={CheackIfLiked(item.i) ? faHeartSolid : faHeartFree }   color={Colors.text} />
                        </TouchableOpacity>
                        
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:30}} >{item.likes} Likes</Text>

                   </View>
                    <TouchableOpacity onPress={()=> navigation.navigate('Report',{page:'skills',id:item.i})} style={{paddingHorizontal:10,marginLeft:10}} >
                        <Text style={{color:Colors.text}} >Report</Text>
                    </TouchableOpacity>
                </View>   
               
                
            </View>
        )
      }

      
    return(
        <ScrollView showsVerticalScrollIndicator={false} style={[styles.App,{backgroundColor:Colors.Background}]} >
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',height:40}} >
                <TouchableOpacity onPress={()=> navigation.navigate('Settings')} >
                    <FontAwesomeIcon color={Colors.text} size={20} icon={faUserCircle} />
                </TouchableOpacity>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Skills</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('PostSkills')} >
                    <FontAwesomeIcon color={Colors.text} size={20}  icon={faPlusSquare} />
                </TouchableOpacity>
            </View>
            <View style={{flex:1}} >
                <Text style={{ display:loading ? 'flex' : 'none' , color:Colors.text,textAlign:'center',fontFamily:Colors.Medium}} >Loading...</Text>
                <FlatList
                data={data}
                keyExtractor={(item)=>item.i}
                renderItem={renderItem}
                />
            </View>
            <View>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12,textAlign:'center',marginTop:10,marginBottom:5}} >{endReached ? "you reached the end..., go study mate." : "Load More"}</Text>
                <TouchableOpacity onPress={fetcLast10} style={{backgroundColor:Colors.hashWhite,borderRadius:10,marginHorizontal:50,padding:10,alignItems:'center',justifyContent: 'center',marginBottom:10}} >
                    <FontAwesomeIcon color={Colors.text} icon={faArrowDown} />
                </TouchableOpacity>
            </View>
        </ScrollView>
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