import React ,{useState,useEffect,useRef} from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, FlatList,Dimensions } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChalkboardTeacher, faEnvelope, faGear, faLock, faMessage, faPaperPlane, faSchoolFlag, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import colors  from '../colors.json'
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import AsyncStorage from "@react-native-async-storage/async-storage";


const User = ({navigation}) =>{
    const [data,setData] = useState([]);

    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getDetails = async() =>{
            const name = await AsyncStorage.getItem('userName');
            const email = await AsyncStorage.getItem('email');
            const clas = await AsyncStorage.getItem('class');
            const phone = await AsyncStorage.getItem('phone');
            const school = await AsyncStorage.getItem('school');
            const password = await AsyncStorage.getItem('password');
            const maskedPassword = password.slice(0, -2).replace(/./g, '*') + password.slice(-2);
            

            setData({
                name:name,
                email:email,
                clas:clas,
                phone:phone,
                school:school,
                password:maskedPassword
            })
        }
        getDetails();
    },[])

    
    return(
        <View style={{backgroundColor:Colors.Background,flex: 1,}}  >
            
                <View style={{flex: 1,}} >
                    <View style={[styles.Top,{backgroundColor:Colors.primary}]} >
                    <Header navigation={navigation} title="cogit" info="" />
                        <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:24,paddingHorizontal:20,paddingTop:10}} >hey {data.name}</Text>
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium,paddingHorizontal:20,paddingVertical:10}} >{data.email}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Settings')}} style={[styles.settingsIcon,{backgroundColor:Colors.primary}]} >
                        <FontAwesomeIcon color={Colors.text} icon={faGear} />
                        <Text style={{color:Colors.text,fontFamily:Colors.Medium}} > Settings</Text>
                    </TouchableOpacity>
                    <View style={{backgroundColor:Colors.primary,borderRadius:10,margin:3,padding: 10,}} >
                        <View style={{flexDirection:'row',alignItems:'center'}} >
                            <FontAwesomeIcon color={Colors.text} icon={faUser} />
                            <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:18}} > Personal Info</Text>
                        </View>
                        <View style={{justifyContent:'space-around'}} >

                            <View style={{flexDirection:'row',alignItems:'center',paddingTop:10}} >
                                <FontAwesomeIcon size={28} color={Colors.text} icon={faUserCircle} />
                                <View style={{marginLeft:10,}} >
                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >User name</Text>
                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >{data.name}</Text>
                                </View>
                            </View>

                            <View style={{flexDirection:'row',alignItems:'center',paddingTop:10}} >
                                <FontAwesomeIcon size={28} color={Colors.text} icon={faEnvelope} />
                                <View style={{marginLeft:10,}} >
                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Email</Text>
                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >{data.email}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',paddingTop:10}} >
                                <FontAwesomeIcon size={28} color={Colors.text} icon={faLock} />
                                <View style={{marginLeft:10,}} >
                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Password</Text>
                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >{data.password}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',paddingTop:10}} >
                                <FontAwesomeIcon size={28} color={Colors.text} icon={faSchoolFlag} />
                                <View style={{marginLeft:10,}} >
                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Email</Text>
                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >{data.school}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',paddingTop:10}} >
                                <FontAwesomeIcon size={28} color={Colors.text} icon={faChalkboardTeacher} />
                                <View style={{marginLeft:10,}} >
                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:18}} >Class</Text>
                                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >{data.clas}</Text>
                                </View>
                            </View>
                        </View>
                        
                    </View>
                </View>
            <HomePageFootor navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    settingsIcon:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',
        marginVertical:7,
        borderRadius:10,
        padding: 10,
    }
})

export default User;
