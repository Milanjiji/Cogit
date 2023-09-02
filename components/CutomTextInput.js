import React from "react";
import { TextInput, View } from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    Easing,
    useAnimatedStyle,
    interpolate,
  } from 'react-native-reanimated';

const CutomTextInput = (props) =>{

    const top = useSharedValue(0);
    const handleTextChange = (text) =>{
        props.onTextChange(text)
    }
    return(
        <View>
            <TextInput placeholder="Text1" onChangeText={handleTextChange} />
        </View>
    )
}

export default CutomTextInput;