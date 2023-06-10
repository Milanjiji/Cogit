import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React,{useEffect,useState} from 'react'
import {FlatList, StyleSheet, Text,TouchableOpacity,View} from 'react-native'
import Header from '../components/Header';
import HomePageFootor from '../components/HomePageFootor';
import Colors from '../colors.json'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Community = ({navigation}) =>{
    const [data,setData] = useState([])
    const [Colors,setColors] = useState([]);


    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
    },[])

    useEffect(() => {
        const get = async () =>{
            const CommunityData = await firestore().collection('Community').get();
            const data = CommunityData.docs.map(doc => doc.data())
            setData(data);
        }
        get();
        
      }, []);

      const goToView = (title,overView,content,id)=>{
        navigation.navigate('ViewArticle',{title,overView,content,id})
      }
      const renderItem = ({item}) =>{
        return(
            <TouchableOpacity style={[styles.container,{backgroundColor:Colors.primary}]} onPress={()=>goToView(item.Title,item.overView,item.content,item.id)} >
                <Text style={[styles.Title,{color:Colors.text}]}  >{item.Title}</Text>
                <Text style={[styles.overView,{color:Colors.text}]}  >{item.overView}</Text>
            </TouchableOpacity>
        )
      }
    return(
        <View style={[styles.App,{backgroundColor:Colors.Background}]} >
            <Header navigation={navigation} info="" title={'Community'} />
            <View style={{flex:1}} >
                
                <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={renderItem}
                />
            </View>
            <HomePageFootor navigation={navigation} add={true} goto={'AddArticle'}/>
        </View>
    )
}
const styles = StyleSheet.create({
    App:{
        flex:1,
        backgroundColor:Colors.Background
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:8,
        margin:10,
        backgroundColor:Colors.primary,
        elevation:10,
        borderRadius:10
    },
    header_Text:{
        fontFamily:Colors.Regular,
        fontSize:18,
        color:Colors.white
    },
    container:{
        margin:10,
        padding:8,
        backgroundColor:Colors.primary,
        borderRadius:10,
        elevation:10
    },
    Title:{
        color:Colors.white,
        fontSize:24,
        fontFamily:Colors.Bold
    },
    overView:{
        color:Colors.white,

    },
})
export default Community;