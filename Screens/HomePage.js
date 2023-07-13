import React,{useState,useEffect} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Dimensions,
    Text,
    Image,
    ImageBackground
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
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import focus from '../assets/images/focus.png'
import recycle from '../assets/images/recycle.png'
import community from '../assets/images/community.png'
import Background from '../assets/images/Background.png'
import NextUpdate from '../components/NextUpdate';

// ted ed classes
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3471464164746532/1876191748';

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
                    

                <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:Colors.Background,paddingBottom:150}}  >
                <Greetings navigation={navigation} />

                <View style={{flexDirection:'row',paddingHorizontal:10}} >
                    <HomePageBar src={focus} height={120} navigation={navigation} title={'Focus'}  navigate={'Focus'}  disc={'Neuro science mixed music,helps students to get more focus'} />
                    <HomePageBar src={recycle} height={120} navigation={navigation} title={'Re:Cycle'}  navigate={'ReCycle'}  disc={'Group of students who like some recycling,just join them do some good.'} />
                </View>  
                
                <View style={{flexDirection:'row',paddingHorizontal:10}} >
                    <HomePageBar height={120} navigation={navigation} title={'Skills'}  navigate={'Skills'}  disc={'This is where students show what they can do other than studies'} />
                    <HomePageBar height={120} navigation={navigation} title={'Notes'}  navigate={'NoteCreator_Classification'}  disc={'Make your own Notes, these will not go missing.'} />
                </View>
                    

                

                    <View style={{display:notes ? 'flex' : 'none'}} >
                        <Notes navigation={navigation} />
                    </View>
                    <View style={{display: !prevSectionDisplay ? 'flex':'none'}} >
                        <PrevSection navigation={navigation} />
                    </View>


                    {/* <View style={{flexDirection:'row',width:width,padding:10}} >
                        <View style={{display :Achivemenet ?'none' :'flex'}} >
                            <Achievement />
                        </View>
                    </View> */}

                    
                    <View style={{display:notes ? 'none' : 'flex'}} >
                        <Notes navigation={navigation} />
                    </View>
                    <View style={{flexDirection:'row',paddingHorizontal:10}} >
                        <HomePageBar height={120} navigation={navigation} title={'Community'}  navigate={'Community'}  disc={'This is where students share their Notes and other News like tips'} />
                    </View>
                    <NextUpdate navigation={navigation} />
                
                        
                   
                   <View style={{height:50}} ></View>
                   <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginVertical:10}} ><Text style={{fontSize:20}} >©</Text> at South</Text>
                </ScrollView>
                <HomePageFootor  navigation={navigation} />  
                
                
            </View>
    );
}
const styles = StyleSheet.create({
    background:{
        flex:1,
        
    },
})
export default Homepage;