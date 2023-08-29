import React,{useEffect,useState} from "react";
import { View,Text,TouchableOpacity } from "react-native";
import Color from '../colors.json'
import AsyncStorage from "@react-native-async-storage/async-storage";


const SideBar  =  ({navigation,page}) =>{
    const [Colors,setColors] = useState([]);
    const [min,setMin] = useState(0);
    const [sec,setSec] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (running) {
          intervalId = setInterval(() => {
            setSec(prevTime => prevTime + 1);
            
          }, 1000);
        }
        return () => clearInterval(intervalId);
      }, [running]);
  
      if(sec == 60){
        setSec(0);
        setMin(min+1)
      }
      const updateFocusModeInfo = async () =>{
        try {
            await AsyncStorage.setItem('isFocus',{state:running,min:min,sec:sec})
        } catch (error) {
            console.log(error);
        }
      }
      useEffect(() => {
        const intervalId = setInterval(() => {
        //   UpdateTrackInfo();
        }, 1000); 
        return () => {
          clearInterval(intervalId);
        };
      }, []);
      console.log(min,sec);

    useEffect(()=>{
        
        
        //   getFocusTime();
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
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Settings" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20}} >Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Forum')}} >
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Forum" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20}} >Forum</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Focus')}} >
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Focus" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20}} >Focus</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Notes')}} >
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Notes" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20}} >Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Code')}} >
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Code" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20}} >Code</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('Home')}} >
                <Text style={{transform: [{ rotate: '-90deg' }],width:100,color:page == "Cogit" ? Colors.text : `${Colors.text}99`,fontFamily:Color.Bold,marginRight:-20,fontSize:20}} >Cogit</Text>
            </TouchableOpacity>

            </View>
    );
}

export default SideBar;