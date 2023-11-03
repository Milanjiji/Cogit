import React, { useEffect } from "react";
import { View,Text, StyleSheet, TouchableOpacity } from "react-native";
import  Colors  from "../colors.json";
import SplashScreen from "react-native-splash-screen";

const AllSet  = ({navigation}) =>{
    useEffect(()=>{
        SplashScreen.hide()
    },[])
    const skip = () =>{
        navigation.navigate('Home');
        
    }
    const Card = ({marginLeft,marginRight,text,subText,flex}) =>{
        return(
            <View style={{backgroundColor:Colors.primary,borderRadius:10,borderColor:Colors.hashWhite,borderWidth:1,elevation:10,marginLeft:marginLeft ? marginLeft : 0,marginRight:marginRight ? marginRight : 0,paddingVertical:10,flex: flex,marginHorizontal:20}} >
                <Text style={{color:Colors.white,fontFamily:Colors.Medium,paddingHorizontal: 10,paddingBottom:8,textAlign:'center'}} >{text}</Text>
                <Text style={{color:Colors.white,fontFamily:Colors.Medium,paddingHorizontal: 10,fontSize:10,textAlign:'center',display:subText ? 'flex' : 'none'}} >{subText}</Text>
            </View>
        )
    }
    return(
        <View style={styles.body} >
            <Text style={styles.AllSet} > You are all set!</Text>
            <View style={{flex:1 ,paddingHorizontal:10 }} >
            <Text style={{color:Colors.white,fontFamily:Colors.Medium}} >Thank you for installing Cogit. It would be really helpful if you shared a review or share this app to someone.</Text>
            <View style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,alignSelf:'center'}} >
                <Text style={{color:Colors.white,fontFamily:Colors.Medium}} >
                    <Text style={{fontSize:16,}} >Special Limited Time Offer!{"\n"}{"\n"}</Text>
                    Dear User,{"\n"}{"\n"}
                    Great news! Until September 10, we're offering all our users free access to our premium features. Take this chance to make the most of Cogit without any costs or subscriptions!{"\n"}
                    Don't miss out - upgrade your experience today!
                </Text>
                
                    <View style={{}} >
                        <View style={{backgroundColor:Colors.secondary,borderRadius:10,borderColor:Colors.hashWhite,borderWidth:1,alignSelf:'flex-start'}} >
                            <Text style={{color:Colors.white,padding: 10,fontFamily:'monospace'}} >#include {"<iostream>"} {"\n"} using namespace std; {"\n"}{"\n"} int main() {"{... "} </Text>
                        </View>
                        <View style={{backgroundColor:Colors.secondary,borderRadius:10,borderColor:Colors.hashWhite,borderWidth:1,alignSelf:'flex-end',marginTop:-40,marginLeft:-20}} >
                            <Text style={{color:Colors.white,padding: 10,fontFamily:Colors.Medium}} ><Text style={{fontFamily:Colors.Bold}} >Gravity:</Text>{"\n"}  The force that attracts{"\n"} two bodies towards each {"\n"}other due to their mass, </Text>
                        </View>
                        <View style={{backgroundColor:Colors.secondary,borderRadius:10,borderColor:Colors.hashWhite,borderWidth:1,alignSelf:'flex-start',padding: 10,marginTop:-30,marginLeft:30,flexDirection:'row'}} >
                                <View style={{alignSelf:'center',padding: 10,}} >
                                    <Text style={{color:Colors.white,alignSelf:'center',fontFamily:Colors.Medium}} >Focus</Text>
                                </View>
                                <View style={{backgroundColor:Colors.primary,padding: 10,borderRadius:50}} >
                                    <View style={{borderRadius:50,backgroundColor:Colors.secondary,padding:20,width:74,height:74,alignItems:'center',justifyContent:'space-around'}} >
                                        <Text style={{color:Colors.white,fontFamily:Colors.Medium}} >45:12</Text>
                                    </View>
                                </View>
                        </View>
                        <View style={{backgroundColor:Colors.secondary,borderRadius:10,borderColor:Colors.hashWhite,borderWidth:1,alignSelf:'flex-end',marginTop:-20,marginRight:20}} >
                            <Text style={{color:Colors.white,padding: 10,textAlign:'right',fontFamily:Colors.Bold}} >6 myths about{"\n"} the Middle Ages that {"\n"}everyone believes</Text>
                        </View>
                    </View>
                    <Text style={{color:Colors.white,fontFamily:Colors.Medium,textAlign:'center'}} >Ready to explore!</Text>
            </View>
            </View>
            <TouchableOpacity onPress={skip} style={styles.finish} >
                <Text style={styles.finishBtn} >Finish</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:Colors.Background
    },
    AllSet:{
        color:Colors.white,
        fontFamily:Colors.Bold,
        fontSize:20,
        marginHorizontal:5,
        marginTop:20,
        marginBottom:0,
    },
    tour:{
        color:Colors.white,
        fontFamily:Colors.Medium,
        fontSize:18,
        marginHorizontal:30,
    },
    go:{
        backgroundColor:Colors.white,
        width:100,
        marginHorizontal:30,
        paddingRight:40,
        marginTop:10,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:"center",
        padding:10
    },
    btnText:{
        color:Colors.primary,
        fontFamily:Colors.Medium,
    },
    finish:{
        backgroundColor:Colors.primary,
        borderRadius:10,
        marginHorizontal:30,
        marginVertical:10
    },
    finishBtn:{
        color:Colors.white,
        textAlign:'center',
        paddingVertical:10,
        fontFamily:Colors.Medium,
    }
})

export default AllSet;