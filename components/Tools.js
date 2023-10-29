import { faCake, faHeadphonesSimple, faMessage, faQuestion, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { View,Text, TouchableOpacity } from 'react-native'
const Tools = ({navigation,colors}) =>{
    console.log(colors.Background);
    return (
        <View style={{flexDirection:'row',marginHorizontal:20,marginVertical:5,justifyContent:'space-between'}} >
            <TouchableOpacity onPress={()=>navigation.navigate('Focus')} style={{justifyContent:'center',borderTopRightRadius:-20,borderTopLeftRadius:10,borderBottomRightRadius:-10,borderBottomLeftRadius:10,backgroundColor:'#7300e6'}} >
                <Text style={{transform: [{ rotate: '-90deg' }],color:colors.text,fontFamily:colors.Medium, alignItems:'center',justifyContent:'center'}} >Focus Mode</Text>
            </TouchableOpacity >
            <View style={{flex: 1,marginLeft:10}} >
                <TouchableOpacity onPress={()=>navigation.navigate('ClassificationC')} style={{backgroundColor:colors.primary,borderRadius:5,paddingLeft:10,paddingVertical:7,marginBottom:5}} >
                    <Text style={{color:colors.text,fontFamily:colors.Medium}} >Learn C++ <Text style={{fontFamily:'monospace'}} >// Hello world</Text></Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',flex: 1}} >
                    <TouchableOpacity onPress={()=>navigation.navigate('Forum')} style={{backgroundColor:colors.primary,paddingHorizontal: 10,paddingVertical:3,borderRadius:5,flex: 1,margin:5,paddingVertical:9,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                        <Text style={{color:colors.text,fontFamily:colors.Medium,fontSize:11}} >Forum</Text>
                        <FontAwesomeIcon icon={faMessage} color={colors.text}   />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Skills')} style={{backgroundColor:colors.primary,paddingHorizontal: 10,paddingVertical:3,borderRadius:5,flex: 1,margin:5,paddingVertical:9,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                        <Text style={{color:colors.text,fontFamily:colors.Medium,fontSize:11}} >Skills</Text>
                        <FontAwesomeIcon icon={faCake} color={colors.text}   />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',flex: 1,justifyContent: 'space-around',}} >
                    <TouchableOpacity onPress={()=>navigation.navigate('ReCycle')} style={{backgroundColor:colors.primary,paddingHorizontal: 10,paddingVertical:3,borderRadius:5,flex: 1,margin:5,paddingVertical:9,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                        <Text style={{color:colors.text,fontFamily:colors.Medium,fontSize:11}} >Recycle</Text>
                        <FontAwesomeIcon icon={faTrash} color={colors.text}   />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('TedEd')} style={{backgroundColor:colors.primary,paddingHorizontal: 10,paddingVertical:3,borderRadius:5,flex: 1,margin:5,paddingVertical:9,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                        <Text style={{color:colors.text,fontFamily:colors.Medium,fontSize:11}} >Ted ED</Text>
                        <FontAwesomeIcon icon={faQuestion} color={colors.text}   />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Community')} style={{backgroundColor:colors.primary,borderRadius:5,paddingLeft:10,paddingVertical:7,marginTop:5}}  >
                    <Text style={{color:colors.text,fontFamily:colors.Medium}} >Community</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Tools