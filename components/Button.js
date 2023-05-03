import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'

const Button = ({navigation,...props}) =>{
    return(
        <View>
            <TouchableOpacity style={props.btn_Container}  >
                <Text onPress={props.onPress} style={props.btn_Text}  >{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Button;