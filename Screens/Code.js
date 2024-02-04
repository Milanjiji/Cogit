import React,{useEffect,useState} from "react";
import { View,Text, Image } from "react-native";
import { WebView } from 'react-native-webview';
import { storage } from "../Storage";
const Code = () =>{
    const [Colors,setColors] = useState([]);
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
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
                    <Text style={{fontSize:20}} >Loading...</Text>{"\n"}(please wait)
                </Text>
                <View style={{alignItems:'center',justifyContent:'space-around',marginVertical:10}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:16}} >Before you go!</Text>

                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >To write code :</Text>
                    <Image style={{width:300,height:100,marginVertical:10}}  source={{uri:'https://firebasestorage.googleapis.com/v0/b/fir-e4bcf.appspot.com/o/code.png?alt=media&token=94746ef6-26a5-41b5-9137-a225046c0041'}} />
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:12}} >To execute code :</Text>
                    <Image style={{width:300,height:100,marginVertical:10}} source={{uri:'https://firebasestorage.googleapis.com/v0/b/fir-e4bcf.appspot.com/o/excute.png?alt=media&token=119fb6e4-dda9-40b6-a868-345b17e52ed2'}} />
                </View>

            </View>
        <WebView
                    style={{backgroundColor:Colors.Background,display:loading ? 'none':'flex' }}
                    source={{ uri: 'https://www.tutorialspoint.com/compile_cpp_online.php' }}

                    onLoadEnd={handleWebViewLoad}
                />
            
        </View>
    )
}
export default Code;