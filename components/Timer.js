import React,{useState,useEffect} from "react";
import { View,Text } from "react-native";
import { useTimer } from '../components/TimerContext';
import { storage } from "../Storage";
import Animated, {
    useSharedValue,
    withTiming,
    Easing,
    useAnimatedStyle,
  } from 'react-native-reanimated';

const Timer = () =>{
    const [Colors,setColors] = useState([]);
    const {  isRunning,leftStudyTime,leftIntTime,State } = useTimer();

    const marginTop = useSharedValue(-50);

    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

    if(isRunning){
        marginTop.value = withTiming(10,{
            duration:200,
            easing: Easing.linear
          })
    }else{
        marginTop.value = withTiming(-50,{
            duration:200,
            easing: Easing.linear
          })
    }
    const marginTopAnimatedValue = useAnimatedStyle(()=>{
        return{
          marginTop : marginTop.value
        }
      })

    return(
        <Animated.View style={[marginTopAnimatedValue,{backgroundColor:Colors.secondary,borderRadius:10,margin:5,padding: 10,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:20}]} >
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >remaining: </Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >{Math.floor( State ?  leftIntTime : leftStudyTime / 60)}:{State ?  leftIntTime : leftStudyTime % 60}</Text>
            </View>
        </Animated.View>
    )
}

export default Timer;