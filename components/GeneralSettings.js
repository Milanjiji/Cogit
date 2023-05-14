import React,{useState,useEffect,useRef} from "react";
import {View,Text,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from '../colors.json'


const ScreenWidth = Dimensions.get('window').width

const GeneralSetting = () =>{

    const [Colors,setColors] = useState([]);
    const [border,setBorder] = useState(0);
    const [reload,setReload] = useState(false);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])
    
      
    
    const changeColor = async(theme) =>{
        const data = await AsyncStorage.getItem('Colors');
        const colors = JSON.parse(data);

        if(theme === 'normal'){
            colors.Background = "#2b1499";
            colors.primary = "#12156c";
            colors.secondary = "#0e1158";
            colors.text = "white";
            AsyncStorage.setItem('Colors',JSON.stringify(colors));
            setBorder(1);
            setReload(true);
        }else if(theme === 'dark'){
            colors.Background = "#0d0d0d";
            colors.primary = "#333333";
            colors.secondary = "#262626";
            colors.text = "white";
            AsyncStorage.setItem('Colors',JSON.stringify(colors))
            setReload(true);
            setBorder(2);
        }else if(theme === 'light'){
            colors.Background = "#ffffff";
            colors.primary = "#bfbfbf";
            colors.secondary = "#595959";
            colors.text = "black";
            AsyncStorage.setItem('Colors',JSON.stringify(colors))
            setReload(true);
            setBorder(3);
        }else{

        }
        
        
        
    }

    return(
        <View style={[styles.body,{backgroundColor:Colors.primary}]} >
            <Text style={styles.title} >General</Text>

            <View style={styles.themeContainer} >
                <Text style={styles.themeTitle} >Use Theme:</Text>
                <View style={styles.themeSelectionContainer} >
                    <TouchableOpacity onPress={() => changeColor('normal')} >
                        <View style={[styles.theme,{backgroundColor:'#2b1499',borderWidth:border === 1 ? 2 : 0}]} >
                            <View style={[styles.boxInside1,{backgroundColor:'#12156c'}]} ></View>
                            <View style={[styles.boxInside2,{backgroundColor:'#0e1158'}]}  ></View>
                            <View style={styles.boxInside2} ></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => changeColor('dark')} >
                        <View style={[styles.theme,{backgroundColor:'#0d0d0d',borderWidth:border === 2 ? 2 : 0}]} >
                            <View style={[styles.boxInside1,{backgroundColor:'#333333'}]} ></View>
                            <View style={[styles.boxInside2,{backgroundColor:'#262626'}]} ></View>
                            <View style={styles.boxInside2} ></View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => changeColor('light')} >
                        <View style={[styles.theme,{backgroundColor:'#ffffff',borderWidth:border === 3 ? 3 : 0,borderColor:'black'}]} >
                            <View style={[styles.boxInside1,{backgroundColor:'#bfbfbf'}]} ></View>
                            <View style={[styles.boxInside2,{backgroundColor:'#595959'}]} ></View>
                            <View style={styles.boxInside2} ></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={[styles.reload,{color:Colors.text,display : reload ? 'flex' :'none' }]} >Reload Application to take effect</Text>

        </View>
    );
    
}
const styles = StyleSheet.create({
    body:{
        borderRadius:10,
        elevation:10,
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