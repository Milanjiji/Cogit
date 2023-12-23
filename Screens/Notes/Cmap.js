import React,{useEffect,useState} from "react";
import { Text, View } from "react-native";
import PDFView from 'react-native-pdf';
import { storage } from "../../Storage";
const Cmap = ({route,navigation}) =>{
    const [Colors,setColors] = useState([]);

    const {path} = route.params;

    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        console.log(path);
    },[])
    return(
        <View style={{backgroundColor:Colors.Background,flex:1,justifyContent:'center',alignItems:'center'}} >
            {
              path?
                <PDFView
                    source={{uri:`file://${path}`}}
                    style={{ flex: 1,backgroundColor:Colors.Background,width:'100%' }}
                    onError={(e)=>console.log("error from pdfView",e)}
                    />
            :   <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Loading please wait</Text>  
            }
        </View>
    )
}

export default Cmap