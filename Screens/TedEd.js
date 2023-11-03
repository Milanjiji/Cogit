import React,{useState,useEffect} from "react";
import { View,FlatList, ScrollView,Dimensions,TouchableOpacity,Text} from "react-native";

import YoutubePlayer from "react-native-youtube-iframe";
import firestore from '@react-native-firebase/firestore';
import { storage } from "../Storage";


const TedEd = ({route,navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [data,setData] = useState([]);
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
            setLoading(true);
            console.log('true');
            const CommunityData = await firestore().collection('TedEd').get();
            const data = CommunityData.docs.map(doc => ({
                i:doc.id,
                ...doc.data()
              }));
            setData(data);
            setLoading(false);
            console.log('false');
            console.log(data);
        }
        fetchVideos();
    },[])
    
    const renderItem = ({item}) =>{
        
        return(
            <View style={{marginVertical:5,backgroundColor:Colors.primary,marginHorizontal:10}} >
                <YoutubePlayer        
                    height={height-10}
                    width={width-20}
                    play={false} 
                    videoId={item.Vid}  />
            </View>
            
        )
    }
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <View style={{flex: 1,marginTop:10}} >
                <Text style={{display:loading ? 'flex' : 'none',color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >Loading...</Text>
                <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                />

                

            </View>
        </View>
    )
}


export default TedEd;