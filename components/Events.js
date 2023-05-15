import React,{useState,useEffect,useRef} from "react";
import { View,Text,StyleSheet,ImageBackground, Linking, FlatList, Button,Dimensions, Touchable, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import colors from '../colors.json'
import { Colors } from "react-native/Libraries/NewAppScreen";


const Events = () =>{
    const [docNumber,setDocNumber] = useState(0)
    const [data,setData] = useState([]) 
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
            console.log("Colors => ",colors);
        }
        getColors();
    },[])

        useEffect(() => {
            const get = async () =>{
                const users = await firestore().collection('Events').get()
                const events = users.docs.map(doc => doc.data())
                const size = users.docs.map(doc => doc.data())
                setDocNumber(users.size)
                setData(events);

            }
            get();
          }, []);
        

        const renderItem = ({item}) =>{
            return(
               
                <View style={styles.event_container} >

                {/* <ImageBackground  borderRadius={10} source={{ uri: item.imageSource }}  >
                    <View style={{height:item.height}} >
                    <Text style={[styles.title,{color:item.color,width:item.titleWidth}]} >{item.title}</Text>
                    <Text style={[styles.disc,{marginTop:item.marginTop,width:item.width,color:item.color}]} >{item.disc}</Text>
                    <Text style={[styles.link,{color:item.color}]} onPress={()=> Linking.openURL(item.link)} >Learn more</Text>
                    </View>
                </ImageBackground> */}
            </View> 
            )
        }
        
        return(
        <View style={[styles.body,{backgroundColor:Colors.primary}]}  >
            <Text style={styles.title} >Events</Text>
            <Text style={styles.disc} >Cheak what is going happen</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    body:{
        borderRadius:10,
        margin:5,
        elevation:10
    },
    title:{
        marginLeft:10,
        marginTop:10,
        fontSize:20,
        fontFamily:colors.ExtraBold
    },
    disc:{
        marginLeft:10,
        marginTop:5,
        fontFamily:Colors.Medium,
        marginBottom:10
    }

})
export default Events;