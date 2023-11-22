import React,{useState,useEffect,useRef} from "react";
import {View,Text,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import Colors from '../colors.json'
import { storage } from "../Storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";


const ScreenWidth = Dimensions.get('window').width

const GeneralSetting = () =>{

    const [Colors,setColors] = useState([]);
    const [border,setBorder] = useState(0);
    const [reload,setReload] = useState(false);
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])
    
      
    
    const changeColor = async(theme) =>{
        const data = storage.getString('Colors')
        const colors = JSON.parse(data);

        if(theme === 'normal'){
            colors.Background = "#2b1499";
            colors.primary = "#12156c";
            colors.secondary = "#ffa500";
            colors.text = "#ffffff";
            storage.set('Colors',JSON.stringify(colors));
            setBorder(1);
            setReload(true);
        }else if(theme === 'dark'){
            colors.Background = "#000000";
            colors.primary = "#1a1a1a";
            colors.secondary = "#7300e6";
            colors.text = "#ffffff";
            storage.set('Colors',JSON.stringify(colors))
            setReload(true);
            setBorder(2);
        }else{
        console.log("No color");
        }
        
        
        
    }

    return(
        <View style={[styles.body,{}]} >
            <Text style={[styles.title,{color:Colors.text}]} >General</Text>

            <View style={styles.themeContainer} >
                <Text style={[styles.themeTitle,{color:Colors.text}]} >Use Theme:</Text>
                <View style={styles.themeSelectionContainer} >
                    <TouchableOpacity onPress={() => changeColor('normal')} style={{elevation:20}} >
                        <View style={[styles.theme,{backgroundColor:'#2b1499',borderWidth:border === 1 ? 2 : 0}]} >
                            <View style={[styles.boxInside1,{backgroundColor:'#12156c'}]} ></View>
                            <View style={[styles.boxInside2,{backgroundColor:'#0e1158'}]}  ></View>
                            <View style={styles.boxInside2} ></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => changeColor('dark')} style={{elevation:20}} >
                        <View style={[styles.theme,{backgroundColor:'#0d0d0d',borderWidth:border === 2 ? 2 : 0}]} >
                            <View style={[styles.boxInside1,{backgroundColor:'#333333'}]} ></View>
                            <View style={[styles.boxInside2,{backgroundColor:'#262626'}]} ></View>
                            <View style={styles.boxInside2} ></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,marginTop:5,display : reload ? 'flex' :'none' }} >
                <FontAwesomeIcon color='yellow' icon={faExclamationTriangle} />
                <Text style={{marginHorizontal:5,color:Colors.text,fontFamily:Colors.Medium,marginTop:5}} >Reload required to take effect</Text>
              </View>
        </View>
    );
    
}
const styles = StyleSheet.create({
    body:{
        borderRadius:10,
        margin:5,
        padding:10
    },
    title:{
        color:Colors.white,
        fontFamily:Colors.Bold,
        fontSize:20
    },
    themeContainer:{
        marginVertical:5
    },
    themeTitle:{
        color:Colors.white,
        fontFamily:Colors.Medium
    },
    themeSelectionContainer:{
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row'
    },
    theme:{
        width:(ScreenWidth/3) - 30,
        height:100,
        justifyContent:'space-around',
        alignItems:'center',
        borderRadius:10,
        marginTop:5,
        elevation:10,
        borderColor:'white'
    },
    boxInside1:{
        backgroundColor:'white',
        width:'80%',
        height:30,
        borderRadius:10,
        elevation:10
    },
    boxInside2:{
        width:'80%',
        height:10,
        backgroundColor:'white',
        borderRadius:10,
        elevation:10
    },
    reload:{
        fontFamily:Colors.Medium
    }
})

export default GeneralSetting;