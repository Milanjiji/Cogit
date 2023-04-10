import React from "react";
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBookOpen, faMessage, faNoteSticky, faTrophy } from "@fortawesome/free-solid-svg-icons";
import Colors from '../colors.json'

const PrevSection = () =>{
    return(
        <View style={styles.body} >
           <TouchableOpacity style={styles.btn_container} >
                <FontAwesomeIcon size={30} sytle={styles.btn_Icon} icon={faBookOpen} color={Colors.black} />
           </TouchableOpacity>
           
           <TouchableOpacity style={styles.btn_container} >
                <FontAwesomeIcon size={30} sytle={styles.btn_Icon} icon={faNoteSticky} color={Colors.black} />
           </TouchableOpacity>

           <TouchableOpacity style={styles.btn_container} >
                <FontAwesomeIcon size={30} sytle={styles.btn_Icon} icon={faTrophy} color={Colors.black} />
           </TouchableOpacity>

           <TouchableOpacity style={styles.btn_container} >
                <FontAwesomeIcon size={30} sytle={styles.btn_Icon} icon={faMessage} color={Colors.black} />
           </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    body:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginVertical:10,
        marginTop:15
    },
    btn_container:{
        backgroundColor:Colors.white,
        padding:10,
        borderRadius:10
    }
})

export default PrevSection;