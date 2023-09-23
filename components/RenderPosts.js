import { faAngleUp, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { React,useState,useEffect } from "react";
import { View,Text,TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import firestore from '@react-native-firebase/firestore';



const RenderPosts = ({item}) =>{
    const [Colors,setColors] = useState([])
    const [more,setMore] = useState(false);
    const [deletez,setDelete] = useState(false);
    const [conform,setConform] = useState(false);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        console.log("the component");
        console.log(item.item.Id,"id for each component");
    },[])

    const deletePost = async () =>{
      if(conform){
        try {
          await firestore().collection('Skills').doc(item.item.Id).delete()
          .then(()=>{
            console.log('successfully delted the docuemtn');
            setDelete(true);
          })
        } catch (error) {
          console.log("error deleting the dosucment");
        }
      }
      setConform(true);
    }
    
    return(
        <View style={{backgroundColor:Colors.primary,borderRadius:10,marginVertical:5,elevation:10,marginHorizontal:5,padding: 10,display:deletez ? 'none' : 'flex'}} >
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
            <Text style={{color:Colors.text,fontFamily:Colors.Medium,maxWidth:'80%'}} >{item.item.title}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}} >
              <FontAwesomeIcon size={12} color={Colors.text} icon={faHeart} />
              <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12,marginLeft:10}} >{item.item.likes}</Text>
            </View>
          </View>
          <TouchableOpacity style={{display:more ? 'none' :'flex'}} onPress={() => setMore(!more)} >
            <Text style={{color:`${Colors.text}70`,fontFamily:Colors.Medium,fontSize:12,marginTop:0}} >More...</Text>
          </TouchableOpacity>
          <View style={{display:more ? 'flex' : 'none'}} >
            <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >{item.item.more}</Text>
            <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >{item.item.seeMore}</Text>
            <View style={{marginVertical:5}} >
              <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'space-around',marginVertical:5}} >
                <View style={{flexDirection:'row',alignItems:'center'}} >
                  <FontAwesomeIcon icon={faInstagram} color={Colors.text} />
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12,marginLeft:10}} >{item.item.insta ? item.item.insta : 'none'}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}} >
                  <FontAwesomeIcon icon={faFacebook} color={Colors.text} />
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12,marginLeft:10}} >{item.item.face ? item.item.face : 'none'}</Text>
                </View>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'space-around',}} >
                <View style={{flexDirection:'row',alignItems:'center'}} >
                  <FontAwesomeIcon icon={faTwitter} color={Colors.text} />
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12,marginLeft:10}} >{item.item.tweet ? item.item.tweet : 'none'}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}} >
                  <FontAwesomeIcon icon={faYoutube} color={Colors.text} />
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12,marginLeft:10}} >{item.item.yt ? item.item.yt : 'none'}</Text>
                </View>
              </View>
            </View>

            < View style={{display:conform ? 'flex' : 'none'}} >
              <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12,textAlign:'center'}}>Are you sure want to delete the post?</Text>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'space-around',marginVertical:10}} >
                <TouchableOpacity onPress={deletePost} style={{backgroundColor:'#ff3333',borderRadius:10,marginHorizontal:10,paddingHorizontal:30,paddingVertical:10}} >
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:Colors.hashWhite,borderRadius:10,marginHorizontal:10,paddingHorizontal:30,paddingVertical:10}}   >
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >No</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={deletePost} style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:5}} >
              <FontAwesomeIcon icon={faTrash} color={Colors.text} />
              <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12,marginLeft:10}} >Delete Post</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setMore(!more)} style={{alignItems:'center',justifyContent:'center',display:'flex'}} >
              <FontAwesomeIcon icon={faAngleUp} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      )
}
export default RenderPosts