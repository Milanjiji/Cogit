import { React,useState,useEffect } from "react";
import {View,Text,TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisV, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import firestore from '@react-native-firebase/firestore';


const search = firestore().collection('Community');


const RenderCommunityArticle = ({item,navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [report,setReport] = useState(false);
    const [liked,setLiked] = useState(false);
    const [likedData,setLikedData] = useState([]);
    const [likes,setLikes] = useState(0);

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
            setLikes(item.item.like)
        }
        getColors();
    },[])

    useEffect(()=>{
        const getLikedData = async () =>{
            try {
                const fetch = JSON.parse(await AsyncStorage.getItem('LikedCommunityData'))
                if(fetch !== null){
                    setLikedData(fetch);
                    const idExists = fetch.some(data => data.id == item.item.id);
                    setLiked(idExists);
                }else{
                    setLikedData([{id:'2131234'}])
                    await AsyncStorage.setItem('LikedCommunityData',JSON.stringify([{id:4}]))
                }
            } catch (error) {
                console.log("error getting liked data",error);
            }

        }
        getLikedData();
    },[])


    const goToView = (title,overView,content,id)=>{
        navigation.navigate('ViewArticle',{title,overView,content,id})
      }

    
    const Likedata = async () =>{
        if(!liked){
            try {
                
                const documentRef = search.doc(item.item.i);
            
                await documentRef.update({
                  like: item.item.like+1,
                });
                setLiked(true);
                setLikes(item.item.like + 1)

                const StringifiedData = JSON.stringify([...likedData,{id:item.item.id}])
                AsyncStorage.setItem('LikedCommunityData',StringifiedData);
              } catch (error) {
                console.error('Error updating document field:', error);
              }
        }else{
            
        }
    }
    return(
        <TouchableOpacity style={{backgroundColor:Colors.primary,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:5,marginHorizontal:10,padding:8,backgroundColor:Colors.primary,borderRadius:10,elevation:10}} onPress={()=>goToView(item.item.Title,item.item.overView,item.item.content,item.item.id)} >
                <View style={{width:'70%'}} >
                    <Text style={{color:Colors.text,color:Colors.white,fontSize:24,fontFamily:Colors.Bold}}  >{item.item.Title}</Text>
                    <Text style={{color:Colors.text}}  >{item.item.overView}</Text>

                    <View style={{marginVertical:5,marginLeft:5,flexDirection:'row',alignItems:'center'}} >
                        <TouchableOpacity onPress={Likedata} >
                            <FontAwesomeIcon size={20} color={Colors.text} icon={liked ? faHeartSolid : faHeart} />
                        </TouchableOpacity>
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >likes {likes}</Text>
                    </View>

                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                    <TouchableOpacity onPress={()=> navigation.navigate('Report',{page:'Community',id:item.item.i})} style={{backgroundColor:Colors.hashWhite,padding: 10,display:report ? 'flex': 'none'}} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => setReport(!report)} >
                        <FontAwesomeIcon icon={faEllipsisV} color={Colors.text} />
                    </TouchableOpacity>
                </View>
                
                
        </TouchableOpacity>
    )
}

export default RenderCommunityArticle;