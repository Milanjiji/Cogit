import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React,{useEffect,useState} from 'react'
import {FlatList, StyleSheet, Text,TouchableOpacity,View} from 'react-native'
import Header from '../components/Header';
import HomePageFootor from '../components/HomePageFootor';
import Colors from '../colors.json'
import firestore from '@react-native-firebase/firestore';

const Community = ({navigation}) =>{
    const [data,setData] = useState([])

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
            <TouchableOpacity style={styles.container} onPress={()=>goToView(item.Title,item.overView,item.content,item.id)} >
                <Text style={styles.Title}  >{item.Title}</Text>
                <Text style={styles.overView}  >{item.overView}</Text>
            </TouchableOpacity>
        )
      }
    return(
        <View style={styles.App} >
            <Header info="ellipsis" title={'Community'} />
            <View style={{flex:1}} >
                <View style={styles.header} >
                    <Text style={styles.header_Text} >Try to add one!</Text>
                    <TouchableOpacity style={styles.header_Btn} >
                        <FontAwesomeIcon color={Colors.white} size={30} icon={faPlusSquare} />
                    </TouchableOpacity>
                </View>

                <FlatList
                data={data}
                keyExtractor={(item)=>item.id}
                renderItem={renderItem}
                />
            </View>
            <HomePageFootor navigation={navigation} />
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