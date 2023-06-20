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
import Utilities from '../components/Utilities';
import Achievement from '../components/Achivements';
import PrevSection from '../components/PrevSection';
import Colors from '../colors.json'
import Greetings from '../components/Greetings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePageBar from '../components/HomePageBar';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds } from 'react-native-google-mobile-ads';


const Homepage = ({navigation,route}) =>{
    const width = Dimensions.get('window').width;
    const [prevSectionDisplay,setPrevSectionDisplay] = useState();
    const [Achivemenet,setAchivement] = useState();
    const [notes,setNotes] = useState();
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getSettings = async() =>{
            try {
                const prevDisplay = await AsyncStorage.getItem('SmallIconStatus');
                const value = JSON.parse(prevDisplay)
                setPrevSectionDisplay(value);
            } catch (error) {
                console.log(error);
            }
            
        }
        getSettings();
        const getSecondSettings = async() =>{
            try {
                const prevDisplay = await AsyncStorage.getItem('AchivementStatus');
                const value = JSON.parse(prevDisplay)
                setAchivement(value);
            } catch (error) {
                console.log(error);
            }
        }
        getSecondSettings();
        const getThirdSettings = async() =>{
            try {
                const prevDisplay = await AsyncStorage.getItem('NoteStatus');
                const value = JSON.parse(prevDisplay)
                setNotes(value);
            } catch (error) {
                console.log(error);
            }
        }
        getThirdSettings();
    },[])
    return(
            <View  style={[styles.background,{backgroundColor:Colors.Background}]} >
                <ScrollView showsVerticalScrollIndicator={false} >
                <Greetings navigation={navigation} />

                <BannerAd unitId={TestIds.BANNER} />
                
                <View style={{flexDirection:'row'}} >
                    <HomePageBar navigation={navigation} title={'Events'}  navigate={'Events'}  disc={'Cheak what is going happen,\nLet them know whats going to happen'} />
                    <HomePageBar navigation={navigation} title={'Community'}  navigate={'Community'}  disc={'This is where students share their \nNotes and other News like tips'} />
                </View>
                <View style={{flexDirection:'row'}} >
                    <HomePageBar navigation={navigation} title={'Skills'}  navigate={'Skills'}  disc={'This is where students show what they can \ndo other than studies'} />
                    <HomePageBar navigation={navigation} title={'Re:Cycle'}  navigate={'ReCycle'}  disc={'Group of students who like some recycling'} />
                </View>        
                    <View style={{display:notes ? 'flex' : 'none'}} >
                        <Notes navigation={navigation} />
                    </View>
                    <View style={{display: !prevSectionDisplay ? 'flex':'none'}} >
                        <PrevSection navigation={navigation} />
                    </View>
                    <View style={{flexDirection:'row',width:width,padding:10}} >
                        <View style={{display :Achivemenet ?'none' :'flex'}} >
                            <Achievement />
                        </View>
                        <Utilities status={Achivemenet} navigation={navigation} />
                    </View>
                    <View style={{display:notes ? 'none' : 'flex'}} >
                        <Notes navigation={navigation} />
                    </View>
                    
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