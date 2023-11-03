import { faHeart as faHeartFree} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React,{useEffect,useState} from 'react'
import {FlatList, StyleSheet, Text,TouchableOpacity,View,ScrollView} from 'react-native'
import Colors from '../colors.json'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {  faCopy,faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import Clipboard from '@react-native-clipboard/clipboard';
import firestore from '@react-native-firebase/firestore';
import { storage } from '../Storage';



const search = firestore().collection('Skills');

const OwnPosts = ({navigation,route}) =>{
    const [data,setData] = useState([])
    const [Colors,setColors] = useState([]);
    const [likedData,setLikedData] = useState([{id:20}]);
    const [loading,setLoading] = useState(false);
    

    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
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
            const CommunityData = await firestore().collection('Skills').get();
            const data = CommunityData.docs.map(doc => ({
                i:doc.id,
                ...doc.data()
              }));
            const name = storage.getString('userName')
            console.log(name);
            const own = data.filter(item => name === item.userName)
            console.log(own);
            setData(data);
            setLoading(false);
            console.log('false');
            console.log(data);
        }
        get();
        const getLikedData = async () =>{
            const data = storage.getString('likedContents');
            const value = JSON.parse(data);
            if(value){
                setLikedData(value)
            }
            console.log(value,'helo');
            
        }
        getLikedData();
      }, []);

      
      const Copy = (text) =>{
        Clipboard.setString(text);
      }


      const liketext = async(id,totalLikes) =>{
        console.log("hello");
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
                      storage.set('likedContents',StringifiedData);
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
        let warning = false;
        const deletePost = async() =>{
            warning = !warning;
            if(warning){
                console.log("hello Deleting");
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
                        storage.set('likedContents',StringifiedData);
                        console.log('Document field updated successfully');
                    } catch (error) {
                        console.error('Error updating document field:', error);
                    }
                    
                }else{
                    console.log('its alreaddy liked');
                }
            }
        }
        return(
            <View  style={{backgroundColor:Colors.primary,marginHorizontal:3,marginVertical:3,borderRadius:10,elevation:10,padding: 8,}} >
                
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
                        <FontAwesomeIcon icon={CheackIfLiked(item.i) ? faHeartSolid : faHeartFree }  size={22} color={Colors.text} />
                    </TouchableOpacity>
                    
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:30}} >{item.likes} Likes</Text>
                    
                </View>  
                <Text></Text>
                <TouchableOpacity  style={{borderRadius:10,padding: 10,backgroundColor:Colors.hashWhite}} >
                    
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >Delete Post</Text>
                </TouchableOpacity> 
                
                
            </View>
        )
      }

      
    return(
        <ScrollView showsVerticalScrollIndicator={false} style={[styles.App,{backgroundColor:Colors.Background}]} >
        
            <View style={{flex:1}} >
                <Text style={{ display:loading ? 'flex' : 'none' , color:Colors.text,textAlign:'center',fontFamily:Colors.Medium}} >Loading...</Text>
                <FlatList
                data={data}
                keyExtractor={(item)=>item.i}
                renderItem={renderItem}
                />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    App:{
        flex:1,
        backgroundColor:Colors.Background
    },
   
})
export default OwnPosts;