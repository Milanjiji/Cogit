import React,{useState,useEffect} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Dimensions
  } from 'react-native';
import Header from '../components/Header';
import Notes from '../components/Notes';
import HomePageFootor from '../components/HomePageFootor';
import Events from '../components/Events';
import Utilities from '../components/Utilities';
import Achievement from '../components/Achivements';
import PrevSection from '../components/PrevSection';
import Colors from '../colors.json'
import Greetings from '../components/Greetings';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Homepage = ({navigation,route}) =>{
    const width = Dimensions.get('window').width;
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
    return(
            <View  style={[styles.background,{backgroundColor:Colors.Background}]} >
                
                <Header navigation={navigation} info={'info'} letterpacing={'y'} title={'Cogit'} />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Greetings/>
                    <Events navigation={navigation} />
                    <PrevSection navigation={navigation} />
                    <View style={{flexDirection:'row',width:width,padding:10}} >
                        <Achievement />
                        <Utilities navigation={navigation} />
                    </View>
                    <Notes />
                </ScrollView>
                
                <HomePageFootor navigation={navigation} />
            </View>
    );
}
const styles = StyleSheet.create({
    background:{
        flex:1,
        
    },
})
export default Homepage;