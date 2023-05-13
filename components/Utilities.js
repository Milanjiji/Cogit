import React from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Colors from '../colors.json'
import { faClock, faNoteSticky } from "@fortawesome/free-regular-svg-icons";
const Utilities = ({navigation}) =>{
    return(
        <View style={styles.body} >
            <View style={styles.utility_align_container_1} >
                <TouchableOpacity onPress={()=>navigation.navigate('Focus')} style={styles.container} >
                    <FontAwesomeIcon size={30} color={Colors.white} icon={faClock} />
                    <Text style={styles.text} >Focus Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('NoteCreator_Classification')} style={styles.container} >
                    <FontAwesomeIcon size={30} color={Colors.white} icon={faNoteSticky} />
                    <Text style={styles.text} >Notes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles=  StyleSheet.create({
    body:{
        margin:3,
        borderRadius:10,
        marginRight:100,
        width:110
    },
    title:{
        marginTop:10,
        color:Colors.primary,
        marginLeft:10,
        fontFamily:Colors.ExtraBold
    },
    utility_align_container_1:{
        justifyContent:'space-around',
        padding:5
    },
    container:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.primary,
        padding:15,
        borderRadius:10,
        width:100,
        height:100,
        marginVertical:10,
        elevation:10
    },
    text:{
        color:Colors.white,
        padding:6,
        fontFamily:Colors.ExtraBold,
        textAlign:'center'
    }
})
export default Utilities;