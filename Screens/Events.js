import React,{useState,useEffet, useEffect} from "react";
import { View,Text, FlatList,StyleSheet, Touchable, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import firestore from '@react-native-firebase/firestore';
import Colors from '../colors.json'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope, faPaperPlane, faPhone } from "@fortawesome/free-solid-svg-icons";


const Events = ({navigation}) =>{
    const [events,setEvents] = useState([]);
    const [totalEvent,setTotalEvent] = useState();
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

    useEffect(()=>{
        const getEvents = async () =>{
            const users = await firestore().collection('Events').get()
            const events = users.docs.map(doc => doc.data())
            setTotalEvent(users.size)
            setEvents(events);
            console.log("Events => ",events," total=> ", users.size);
        }
        getEvents();
    },[])
    const renderItem = ({item}) =>{
        return(
            <View style={[styles.item,{backgroundColor:Colors.primary}]} >
                <Text style={[styles.itemTitle,{color:Colors.text}]} >{item.title}</Text>
                <Text style={[styles.itemdisc,{color:Colors.text}]} >{item.disc}</Text>
                <Text style={[styles.itemdisc,{color:Colors.text,display:!item.phone && !item.email ? 'none' : 'flex'  }]} >Know more:</Text>
                <View style={{flexDirection:'row',display:item.phone ? 'flex':'none'}} >
                    <FontAwesomeIcon color={Colors.text}  icon={faPhone} />
                    <Text style={[styles.itemdisc,{color:Colors.text}]} >  +91 {item.phone}</Text>
                </View>
                <View style={{flexDirection:'row',display:item.email ? 'flex':'none'}} >
                    <FontAwesomeIcon color={Colors.text} icon={faEnvelope}  />
                    <Text style={[styles.itemdisc,{color:Colors.text}]} >  {item.email}</Text>
                </View>
            </View>
        )
    }

    return(
        <View style={{flex: 1,backgroundColor:Colors.Background}} >
            <Header navigation={navigation} title="Events" info='' />
            <View style={{flex: 1,}} >
                <TouchableOpacity onPress={()=>navigation.navigate('AddEvent')} >
                    <View style={{backgroundColor:Colors.secondary,borderRadius:10,elevation:10,margin:3,flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,}} >
                        <View>
                            <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Anyone can tell about Events</Text>
                            <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Tell users what's going to happen</Text>
                        </View>
                        <FontAwesomeIcon size={34} style={{marginRight:10,transform: [{ rotateY: '180deg' }]}} icon={faPaperPlane} color={Colors.text} />
                    </View>
                </TouchableOpacity>
                <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                />
            </View>
            <HomePageFootor navigation={navigation} />
        </View>
    )
}
const styles = StyleSheet.create({
    item:{
        borderRadius:10,
        elevation:10,
        margin:3,
        padding: 10,
    },
    itemTitle:{
        fontFamily:Colors.Bold,
        fontSize:24,
        
    },
    itemdisc:{
        fontFamily:Colors.Medium,
        
        
    }
})
export default Events;