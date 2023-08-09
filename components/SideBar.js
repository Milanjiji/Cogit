import React,{useEffect,useState} from "react";
import { View,Text,TouchableOpacity } from "react-native";
import Color from '../colors.json'


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

            <TouchableOpacity onPress={()=>{navigation.navigate('Settings')}} >
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Settings" ? '#ffffff' : '#ffffff99',fontFamily:Color.Bold,marginRight:-20}} >Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Forum')}} >
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Forum" ? '#ffffff' : '#ffffff99',fontFamily:Color.Bold,marginRight:-20}} >Forum</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Focus')}} >
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Focus" ? '#ffffff' : '#ffffff99',fontFamily:Color.Bold,marginRight:-20}} >Focus</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Notes')}} >
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Notes" ? '#ffffff' : '#ffffff99',fontFamily:Color.Bold,marginRight:-20}} >Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Code')}} >
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Code" ? '#ffffff' : '#ffffff99',fontFamily:Color.Bold,marginRight:-20}} >Code</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} >
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Cogit" ? '#ffffff' : '#ffffff99',fontFamily:Color.Bold,marginRight:-20,fontSize:20}} >Cogit</Text>
            </TouchableOpacity>

            </View>
    );
}

export default SideBar;