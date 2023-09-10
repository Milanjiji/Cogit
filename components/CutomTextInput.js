import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { TextInput, View,Text, Button } from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    Easing,
    useAnimatedStyle,
    interpolate,
  } from 'react-native-reanimated';

const CutomTextInput = (props) =>{
    const [focused,setFocused] = useState(false);
    const top = useSharedValue(28);
    const fontSize = useSharedValue(14)

    const toggle = () =>{
        if(!focused){
            top.value = withTiming(top.value === 28 ? 12 : 25, {
                duration: 250,
                easing: Easing.linear,
              });
            fontSize.value = withTiming(fontSize.value === 14 ? 10 : 14, {
                duration: 250,
                easing: Easing.linear,
              });
              setFocused(!focused);
              console.log("animation worked");
        }
    }
    const handleTextChange = (text) =>{
        props.onTextChange(text)
    }
    const heightAnimatedStyle = useAnimatedStyle(()=>{
        return {
          top: top.value,
          fontSize:fontSize.value
        }
      })
    return(
        <View style={{borderColor:props.borderColor,borderWidth:1,borderRadius:10,paddingHorizontal:10,marginHorizontal:props.horizontal,marginVertical:props.marginVertical,marginTop:props.marginTop}} >
            <Animated.Text style={[heightAnimatedStyle,{marginTop:-10,position:'relative'}]} >{props.label}</Animated.Text>
            <TextInput 
                style={{marginTop:-2}}
                value={props.value} 
                onFocus={toggle}
                keyboardType={props.keyboardType}
                onChangeText={handleTextChange} />
        </View>
    )
}

export default CutomTextInput;