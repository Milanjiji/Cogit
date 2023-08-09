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
        
    },[])


  const handleWebViewLoad = async () => {
    setLoading(false);
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
                    onLoadEnd={handleWebViewLoad}
                />
            
        </View>
    )
}
export default Code;