import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";


const Tasks = ({navigation,Colors}) =>{
    return(
        <View style={{backgroundColor:Colors.primary,padding: 10,borderRadius:10,marginHorizontal:20,marginVertical:5}} >
            <TouchableOpacity onPress={()=>navigation.navigate('TaskManager')} style={{flexDirection:'row',justifyContent: 'space-between',alignItems:'center'}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Tasks</Text>
                <FontAwesomeIcon icon={faAngleRight} color={Colors.secondary} />
            </TouchableOpacity>
            <View>

            </View>
        </View>
    )
}

export default Tasks;