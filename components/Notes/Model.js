import React from "react";
import { Text,View,StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Header from "../Header";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { faMehBlank } from "@fortawesome/free-solid-svg-icons";

const primary = "#04103a"
const secondry = "#283459"

const black = "black"
const white = "white"
const Bold = "Montserrat-Bold"
const Regular = 'Montserrat-Regular';
const BoldItalic = 'Montserrat-BoldItalic';
const ExtraBold = 'Montserrat-ExtraBold';
const ExtraBoldItalic = 'Montserrat-ExtraBoldItalic';
const Medium = 'Montserrat-Medium';
const MediumItalic = 'Montserrat-MediumItalic';


const Model = ({navigation,route,...props}) =>{
    return(
        <SafeAreaView style={styles.background} >
            <ScrollView>
                {props.num ?<Header title={`chapter ${props.num}`} info={'#'}  /> :''}
                {props.name ? <Text style={styles.chapter} >{props.name}</Text>:''}
                {props.chapterSummary ?  <Text style={styles.summary} >{props.chapterSummary} </Text> : '' }
                
                {props.sub1title ? 
                <View>
                <Text style={styles.subtitle}>{props.sub1title}</Text>
                <Text style={styles.subnote} >{props.sub1summary}</Text>
                <Text style={styles.subnote} >{props.sub1ex}</Text>
                </View> : ''
                }
                {props.sub2title ? 
                <View>
                <Text style={styles.subtitle}>{props.sub2title}</Text>
                <Text style={styles.subnote} >{props.sub2summary}</Text>
                <Text style={styles.subnote} >{props.sub2ex}</Text>
                </View> : ''
                }
                
                {props.sub3title ? 
                <View>
                <Text style={styles.subtitle}>{props.sub3title}</Text>
                <Text style={styles.subnote} >{props.sub3summary}</Text>
                <Text style={styles.subnote} >{props.sub3ex}</Text>
                </View> : ''
                }
                {props.sub4title ? 
                <View>
                <Text style={styles.subtitle}>{props.sub4title}</Text>
                <Text style={styles.subnote} >{props.sub4summary}</Text>
                <Text style={styles.subnote} >{props.sub4ex}</Text>
                </View> : ''
                }
                {props.sub5title ? 
                <View>
                <Text style={styles.subtitle}>{props.sub5title}</Text>
                <Text style={styles.subnote} >{props.sub5summary}</Text>
                <Text style={styles.subnote} >{props.sub5ex}</Text>
                </View> : ''
                }
                {props.sub6title ? 
                <View>
                <Text style={styles.subtitle}>{props.sub6title}</Text>
                <Text style={styles.subnote} >{props.sub6summary}</Text>
                <Text style={styles.subnote} >{props.sub6ex}</Text>
                </View> : ''
                }
                {props.sub7title ? 
                <View>
                <Text style={styles.subtitle}>{props.sub7title}</Text>
                <Text style={styles.subnote} >{props.sub7summary}</Text>
                <Text style={styles.subnote} >{props.sub7ex}</Text>
                </View> : ''
                }
                {props.sub8title ? 
                <View>
                <Text style={styles.subtitle}>{props.sub8title}</Text>
                <Text style={styles.subnote} >{props.sub8summary}</Text>
                <Text style={styles.subnote} >{props.sub8ex}</Text>
                </View> : ''
                }
                {props.sub9title ? 
                <View>
                <Text style={styles.subtitle}>{props.sub9title}</Text>
                <Text style={styles.subnote} >{props.sub9summary}</Text>
                <Text style={styles.subnote} >{props.sub9ex}</Text>
                </View> : ''
                }
                {props.sub10title ? 
                <View>
                <Text style={styles.subtitle}>{props.sub2title}</Text>
                <Text style={styles.subnote} >{props.sub10summary}</Text>
                <Text style={styles.subnote} >{props.sub10ex}</Text>
                </View> : ''
                }   
                
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    background:{
        
        flex:1,
    },
    chapter:{
        color:black,
        textAlign:'center',
        fontSize:40,
        fontFamily:ExtraBold
    },
    summary:{
        color:black,
        textAlign:'center',
        fontFamily:Bold,
        marginHorizontal:10
    },
    subtitle:{
        color:black,
        textAlign:'center',
        marginVertical:5,
        marginHorizontal:10,
        fontFamily:BoldItalic,
        fontSize:20
    },
    subnote:{
        color:black,
        textAlign:'center',
        marginVertical:5,
        marginHorizontal:10,
        fontFamily:Regular,
    }
})

export default Model;