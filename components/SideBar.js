import React,{useEffect,useState} from "react";
import { View,Text,TouchableOpacity } from "react-native";
import Color from '../colors.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBullseye, faChartArea, faFileCode, faGear, faHome, faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";


const SideBar  =  ({navigation,page}) =>{
    const [Colors,setColors] = useState([]);

  
      

    useEffect(()=>{
        
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
    
        getColors();
    },[])
    return(
        <View style={{height:'95%',width:20,justifyContent: 'space-around',alignItems:'center',marginRight:10}} >

            <TouchableOpacity style={{marginBottom:page == "Settings" ? -50 : 0}} onPress={()=>{navigation.navigate('Settings')}} >
                <Text style={{display:page == "Settings" ? "none" : "flex",transform: [{ rotate: '-90deg' }],width:100,color:page == "Settings" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20,fontSize:12}} >Settings</Text>
                <FontAwesomeIcon color={Colors.text} size={18} style={{marginLeft:20,display:page != "Settings" ? "none" : "flex"}} icon={faGear} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:page == "Forum" ? -50 : 0}} onPress={()=>{navigation.navigate('Forum')}} >
                <Text style={{display:page == "Forum" ? "none" : "flex",transform: [{ rotate: '-90deg' }],width:100,color:page == "Forum" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20,fontSize:12}} >Forum</Text>
                <FontAwesomeIcon color={Colors.text} size={18} style={{marginLeft:20,display:page != "Forum" ? "none" : "flex"}} icon={faMessage} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:page == "Focus" ? -60 : 0}} onPress={()=>{navigation.navigate('Focus')}} >
                <Text style={{display:page == "Focus" ? "none" : "flex",transform: [{ rotate: '-90deg' }],width:100,color:page == "Focus" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20,fontSize:12}} >Focus</Text>
                <FontAwesomeIcon color={Colors.text} size={18} style={{marginLeft:20,display:page != "Focus" ? "none" : "flex"}} icon={faBullseye} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginBottom:page == "Notes" ? -70 : 0}} onPress={()=>{navigation.navigate('Notes')}} >
                <Text style={{display:page == "Notes" ? "none" : "flex",transform: [{ rotate: '-90deg' }],width:100,color:page == "Notes" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20,fontSize:12}} >Notes</Text>
                <FontAwesomeIcon color={Colors.text} size={18} style={{marginLeft:page == "Notes" ? 15 : 20,display:page != "Notes" ? "none" : "flex",marginBottom:-10}} icon={faStickyNote} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Code')}} >
                <Text style={{display:page == "Code" ? "none" : "flex",transform: [{ rotate: '-90deg' }],width:100,color:page == "Code" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20,fontSize:12}} >Code</Text>
                <FontAwesomeIcon color={Colors.text} size={18} style={{marginLeft:20,display:page != "Code" ? "none" : "flex"}} icon={faFileCode} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} >
                <Text style={{display:page == "Cogit" ? "none" : "flex",transform: [{ rotate: '-90deg' }],width:100,color:page == "Cogit" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20,fontSize:12,fontSize:20}} >Cogit</Text>
                <FontAwesomeIcon color={Colors.text} size={18} style={{marginLeft:20,display:page != "Cogit" ? "none" : "flex"}} icon={faHome} />
            </TouchableOpacity>

            </View>
    );
}

export default SideBar;