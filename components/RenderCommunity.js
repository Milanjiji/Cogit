import { React,useState,useEffect } from "react";
import {View,Text,TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RenderCommunityArticle = ({item,navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [report,setReport] = useState(false);

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])
    console.log(item.item.i);
    const goToView = (title,overView,content,id)=>{
        navigation.navigate('ViewArticle',{title,overView,content,id})
      }

    return(
        <TouchableOpacity style={{backgroundColor:Colors.primary,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:5,marginHorizontal:10,padding:8,backgroundColor:Colors.primary,borderRadius:10,elevation:10}} onPress={()=>goToView(item.item.Title,item.item.overView,item.item.content,item.item.id)} >
                <View style={{width:'70%'}} >
                    <Text style={{color:Colors.text,color:Colors.white,fontSize:24,fontFamily:Colors.Bold}}  >{item.item.Title}</Text>
                    <Text style={{color:Colors.text}}  >{item.item.overView}</Text>
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