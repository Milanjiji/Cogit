import React,{useState,useEffect} from "react";
import { View,Text} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { storage } from "../../Storage";

const VideoClass = ({route,navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [loading,setLoading] = useState(true);
    const {link,name} = route.params;

    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        console.log(link);
    },[])
    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <Text style={{color:Colors.text,textAlign:'center',fontFamily:Colors.Medium}} >{name}</Text>  
            <Text style={{color:Colors.text,textAlign:'center',fontFamily:Colors.Medium,display:loading?'flex':'none',fontSize:11}} >Loading please wait</Text>  
            <YoutubePlayer
            height={150}
            play={playing} 
            onReady={setLoading(false)}              
            videoId={link} />       
        </View>
    )
}


export default VideoClass;