import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";


const Tasks = ({navigation,Colors}) =>{
    return(
        <View style={{marginHorizontal:20,marginVertical:5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
            <TouchableOpacity onPress={()=>navigation.navigate('TaskManager')} style={{backgroundColor:Colors.primary,flexDirection:'row',justifyContent: 'space-between',alignItems:'center',flex:1,padding: 10,borderRadius:10,marginRight:5}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Tasks</Text>
                <FontAwesomeIcon icon={faAngleRight} color={Colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Code')} style={{ backgroundColor:Colors.primary,flexDirection:'row',justifyContent: 'space-between',alignItems:'center',flex:1,padding: 10,borderRadius:10,marginLeft:5,borderColor:Colors.secondary,borderWidth:1}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Code</Text>
                <View style={{flexDirection:'row',alignItems:'center'}} >
                    <Text style={{color:'#f6d604',fontFamily:Colors.Medium}} >LE</Text>
                    <FontAwesomeIcon icon={faAngleRight} color={Colors.secondary} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Tasks;