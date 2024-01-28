import React,{useState,useEffect} from "react";
import { View,FlatList, ScrollView,Dimensions,TouchableOpacity,Text} from "react-native";

import YoutubePlayer from "react-native-youtube-iframe";
import firestore from '@react-native-firebase/firestore';
import { storage } from "../Storage";


const TedEd = ({route,navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [data,setData] = useState([]);
    const [itemsToRender,setItemsToRender] = useState(0)
    const [loading,setLoading] = useState(false);
    const width = Dimensions.get('window').width;
    height = (width /16) * 9;

    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const fetchVideos = async () =>{
            try {
                const response = await fetch('https://firebasestorage.googleapis.com/v0/b/fir-e4bcf.appspot.com/o/tedrawFile.json?alt=media&token=8f7acb2a-91dd-4d46-95d1-074ee80cba0f');
                const data = await response.json();
                console.log(data);
                setData(data)
                const SortedData = data.sort((a,b)=> b.id - a.id)
                setItemsToRender(SortedData)
              } catch (error) {
                console.error('Error fetching JSON data:', error);
              }
        }
        fetchVideos();
    },[])
   
    const renderItem = ({item}) =>{
        console.log(item.link);
        return(
            <View style={{marginVertical:10,backgroundColor:Colors.primary,marginHorizontal:10,padding:10,borderRadius:10,borderColor:Colors.secondary,borderWidth:0.4}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:16,margin:10,marginBottom:20}} >{item.name}</Text>
                <YoutubePlayer        
                    height={height-10}
                    width={width-40}
                    play={false} 
                    videoId={item.link}  />
            </View>
            
        )
    }
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <View style={{flex: 1,marginTop:10}} >
                <Text style={{display:loading ? 'flex' : 'none',color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >Loading...</Text>
                <FlatList
                data={itemsToRender}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                />
            </View>
        </View>
    )
}


export default TedEd;