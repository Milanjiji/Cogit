import { faCogs, faFlask, faSuperscript } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
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
    const [std,setStd] = useState(true);

    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const stdlevel = async () =>{
            const data = storage.getString('class');
            console.log(data);
            if(data === 'nStd'){
                setStd(false);
                console.log("not a student");
            }else{
                setStd(true)
            }
        }
        stdlevel();
    },[])

    const goTo = (place,sub) =>{
        navigation.navigate(place,{sub:sub});
    }
    return(
            <View style={{marginBottom:10,marginHorizontal:10,display:std ? 'flex' :'none'}} >
                    
                    <View style={{flexDirection:'row',flex: 1,justifyContent:'space-around',marginVertical:10,marginHorizontal:10}} >
                        <TouchableOpacity style={{width:'30%',backgroundColor:Colors.primary,padding:10,borderRadius:5,flexDirection:'column',justifyContent:'space-around',alignItems:'center',paddingVertical:15}} onPress={()=>goTo('Classification','math')} >
                            <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:11,marginBottom:10}} >Maths</Text>
                            <FontAwesomeIcon icon={faSuperscript} color={Colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'30%',backgroundColor:Colors.primary,padding:10,borderRadius:5,flexDirection:'column',justifyContent:'space-around',alignItems:'center',paddingVertical:15}} onPress={()=>goTo('Classification','chem')} >
                            <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:11}} >Chemistry</Text>
                            <FontAwesomeIcon icon={faFlask} color={Colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:'30%',backgroundColor:Colors.primary,padding:10,borderRadius:5,flexDirection:'column',justifyContent:'space-around',alignItems:'center',paddingVertical:15}} onPress={()=>goTo('Classification','phy')} >
                            <Text style={{color:Colors.text,fontFamily:Colors.Medium,fontSize:11}} >Physics</Text>
                            <FontAwesomeIcon icon={faCogs} color={Colors.text} />
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
        padding: 8,
        marginHorizontal:10,
        fontSize:12
      }
    
})
export default Notes;