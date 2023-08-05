import React,{useEffect,useState} from "react";
import { View,Text } from "react-native";
import { WebView } from 'react-native-webview';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Code = () =>{
    const [Colors,setColors] = useState([]);
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getWebData = async () =>{
            const data = await AsyncStorage.getItem('websiteData');
            if(data){
                console.log(data,"web data");
            }else{
                console.log("not got the wedata");
            }
        }
    },[])
    const handleMessage = async (event) => {
        try {
          const htmlContent = event.nativeEvent.data;
          await AsyncStorage.setItem('websiteData', htmlContent);
          console.log('Website data stored successfully.');
        } catch (error) {
          console.error('Error storing website data:', error);
        }
      };
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background}} >
            <View style={{flex: 1,alignItems:'center',justifyContent:'center',display : loading ? 'flex' :'none'}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold,textAlign:'center'}} >
                    <Text style={{fontSize:20}} >Loading...</Text>{"\n"}(wait uses internet to load page)
                </Text>
            </View>
        <WebView
                    style={{backgroundColor:Colors.Background,display:loading ? 'none':'flex' }}
                    source={{ uri: 'https://www.online-cpp.com/' }}
                    onLoadEnd={()=>setLoading(false)}
                    onMessage={handleMessage} 
                    originWhitelist={['*']}
                />
            
        </View>
    )
}
export default Code;