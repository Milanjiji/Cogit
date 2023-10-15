import React,{useEffect,useState} from "react";
import { View,Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import firestore from '@react-native-firebase/firestore';


const RenderArticle = ({item}) =>{
    const [Colors,setColors] = useState([])
    const [viewMore,setViewMore] = useState(false);
    const [del,setDel] = useState(false);
    const [delPost,setDelPost] = useState(true)
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

    const deleteArticle = async () =>{
        console.log("starting delete process");
        try {
            await firestore().collection('Community').doc(item.item.Id).delete()
            .then(()=>{
                console.log('successfully delted the document');
                setDel(false);
                setDelPost(false);
            })
        } catch (error) {
            console.log("error while updating documen",error``);   
        }
    }


    return(
        <View style={{backgroundColor:Colors.primary,padding: 10,borderRadius:10,marginHorizontal:5,marginTop:5,elevation:10,display:delPost ? 'flex' :'none'}} >
            <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >{item.item.Title}</Text>
            <TouchableOpacity style={{display:viewMore ? 'none' : 'flex'}} onPress={()=>setViewMore(true)} >
                <Text style={{color:`${Colors.text}70`,fontFamily:Colors.Medium,fontSize:12}} >More...</Text>
            </TouchableOpacity>
            <View style={{display:viewMore ? 'flex' : 'none'}} >

                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >{item.item.overView}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >{item.item.content}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >{item.item.extra}</Text>

                <TouchableOpacity onPress={()=>setDel(true)} style={{backgroundColor:Colors.hashWhite,borderRadius:10,marginHorizontal:5,marginVertical:5,justifyContent:'center',alignItems:'center',padding: 10,}} >
                    <FontAwesomeIcon icon={faTrash} color={Colors.text} />
                </TouchableOpacity>
                <View style={{padding: 10,justifyContent: 'space-around',alignItems:'center',flexDirection:'row',display:del ? 'flex' :'none'}} >
                    <TouchableOpacity onPress={deleteArticle} style={{padding: 10,borderRadius:10,elevation:10,backgroundColor:'#ff3333'}} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,paddingHorizontal:30,}} >Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setDel(false)} style={{padding: 10,borderRadius:10,elevation:10,backgroundColor:Colors.secondary}} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,paddingHorizontal:30}} >No</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={()=>setViewMore(false)} style={{backgroundColor:Colors.hashWhite,borderRadius:10,marginHorizontal:5,marginVertical:5,justifyContent:'center',alignItems:'center',padding: 10,}} >
                    <FontAwesomeIcon icon={faAngleUp} color={Colors.text} />
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default RenderArticle;