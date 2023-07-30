import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import Colors from '../colors.json'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import Clipboard from '@react-native-clipboard/clipboard';
const Code = (props) =>{

const Copy = () =>{
    Clipboard.setString('hellow rodl');
}

return(
    <View style={{backgroundColor:'black',borderRadius:10,elevation:10,marginBottom:10}} >
        
        <View style={{borderTopLeftRadius:10,borderTopRightRadius:10,flexDirection:'row',justifyContent:'space-between',padding: 10,backgroundColor:'#FFFFFF25',paddingHorizontal:20,alignItems:'center'}} >
            <Text style={{color:'white',fontFamily:Colors.Medium}} >{props.title}</Text>
            <TouchableOpacity onPress={Copy}  style={{backgroundColor:'#FFFFFF20',flexDirection:'row',padding: 5,borderRadius:5}} >
                <Text style={{color:'white',fontFamily:Colors.Medium}} >Copy </Text>
                <FontAwesomeIcon icon={faCopy} color='white'  />
            </TouchableOpacity>
        </View>
        <Text style={{color:'white',fontFamily:'monospace',padding: 10,paddingHorizontal:20,display:props.inst ? 'flex' : 'none'}} >//copy this code and paste in the c++ {"\n"}//compiler below.</Text>
        <Text style={{color:'white',fontFamily:'monospace',padding: 10,paddingHorizontal:20}} >{props.code}{"\n"}</Text>
    </View>
)
}

export default Code;