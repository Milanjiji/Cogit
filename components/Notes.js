import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ImageBackground
  } from 'react-native';
import Colors from '../colors.json'
import { storage } from '../Storage';


const Notes = ({navigation,route,...props}) =>{
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

    const goTo = (place,sub) =>{
        navigation.navigate(place,{sub:sub});
    }
    return(
            <View style={{marginBottom:10,marginHorizontal:10}} >
                    
                    <View style={{flexDirection:'row',flex: 1,justifyContent:'space-around',marginVertical:10}} >
                        <TouchableOpacity style={{width:'50%'}} onPress={()=>goTo('Classification','math')} >
                            <Text style={[styles.basic,{backgroundColor:Colors.primary,borderRadius:10,textAlign:'center',color:Colors.text}]} >Maths</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'50%'}} onPress={()=>goTo('Classification','chem')} >
                            <Text style={[styles.basic,{backgroundColor:Colors.primary,borderRadius:10,textAlign:'center',color:Colors.text}]} >Chemistry</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{flexDirection:'row',flex: 1,justifyContent:'space-around'}} >
                        <TouchableOpacity style={{width:'50%'}} onPress={()=>goTo('Classification','phy')} >
                            <Text style={[styles.basic,{backgroundColor:Colors.primary,borderRadius:10,textAlign:'center',color:Colors.text}]} >Physics</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'50%'}} onPress={()=>goTo('Classification','bio')} >
                            <Text style={[styles.basic,{backgroundColor:Colors.primary,borderRadius:10,textAlign:'center',color:Colors.text}]} >Biology</Text>
                        </TouchableOpacity>
                    </View>
                </View>
          
    );
}
const styles = StyleSheet.create({
    grid:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    btn:{
        width:160,
        height:100,
        borderRadius:10,
        justifyContent:'flex-end',
        marginVertical:15,
        marginHorizontal:2,
        backgroundColor:Colors.primary,
        elevation:10
    },
    btnText:{
        color:Colors.white,
        fontSize:20,
        fontFamily:Colors.Bold,
        textAlign:'right',
        padding:20,
        height:100,
        marginTop:40
    },
    btnContainer:{
        flexDirection:'row' ,
    },
    container: {
        margin:10,
        height:200,
        borderRadius:10,
        backgroundColor:'rgba(0,0,0,0.5)',
        overflow:'hidden',
        padding:10
      },
      basic:{
        color:Colors.text,
        fontFamily:Colors.Medium,
        padding: 14,
        marginHorizontal:10,
        fontSize:12
      }
    
})
export default Notes;