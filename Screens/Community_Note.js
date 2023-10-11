import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React,{useEffect,useState} from 'react'
import {FlatList, StyleSheet, Text,TouchableOpacity,View} from 'react-native'
import Header from '../components/Header';
import HomePageFootor from '../components/HomePageFootor';
import Colors from '../colors.json'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faEllipsisV, faHamburger, faListDots, faUser } from '@fortawesome/free-solid-svg-icons';
import RenderCommunityArticle from '../components/RenderCommunity';

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
            const data = CommunityData.docs.map(doc => ({
                i:doc.id,
                ...doc.data()
              }))
            const sortedData = data.sort((a, b) => b.id - a.id);
            console.log(sortedData,"sorted data");
            setData(sortedData);
        }
        get();
        
      }, []);

      
      
    return(
        <View style={[styles.App,{backgroundColor:Colors.Background}]} >
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginVertical:10}} >
                <TouchableOpacity onPress={()=>navigation.navigate('Settings')} >
                    <FontAwesomeIcon icon={faUser} color={Colors.text} />
                </TouchableOpacity>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Community</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('AddArticle')} >
                    <FontAwesomeIcon icon={faPlusSquare} color={Colors.text} />
                </TouchableOpacity>
            </View>
            <View style={{flex:1}} >
                
                <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={ (i)=> <RenderCommunityArticle item={i} navigation={navigation} />}
                />
            </View>
            
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
        marginVertical:5,
        marginHorizontal:10,
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