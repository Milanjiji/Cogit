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
import Notes from '../components/Notes';
import Greetings from '../components/Greetings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePageBar from '../components/HomePageBar';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import SideBar from '../components/SideBar';
import NextUpdate from '../components/NextUpdate';

// ted ed classes
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3471464164746532/1876191748';

const Homepage = ({navigation,route}) =>{
    const width = Dimensions.get('window').width;
    const [prevSectionDisplay,setPrevSectionDisplay] = useState();
    const [Achivemenet,setAchivement] = useState();
    const [notes,setNotes] = useState();
    const [Colors,setColors] = useState([]);
    const [cStage,setCStage] = useState(false);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
            console.log(colors);
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
        const getStage = async() =>{
            const stage = JSON.parse(await AsyncStorage.getItem('LevelC'));
            if(stage !== null){
                setCStage(true);
            }
        }
        getStage();
    },[])
    return(
            <View  style={[styles.background,{backgroundColor:Colors.Background,flexDirection:'row'}]} >

                <SideBar navigation={navigation} page="Cogit" />

                <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:Colors.Background,paddingBottom:150,flex: 1,}}  >
                <Greetings navigation={navigation} />

                <View style={{marginHorizontal:10}} >
                    <HomePageBar  height={120} navigation={navigation} title={'Learn C++ without pc'}  navigate={"ClassificationC"}  disc={'Embark on an empowering coding journey with our free, on-the-go app featuring an integrated C++ code editor, available in Malayalam, allowing you to learn and practice C++ anytime, anywhere!'} />
                </View>
                <View style={{flexDirection:'row',paddingHorizontal:10}} >
                    <HomePageBar  height={120} navigation={navigation} title={'Focus'}  navigate={'Focus'}  disc={'Neuro science mixed music,helps students to get more focus'} />
                    <HomePageBar  height={120} navigation={navigation} title={'Re:Cycle'}  navigate={'ReCycle'}  disc={'Group of students who like some recycling,just join them do some good.'} />
                </View>  
                
                <View style={{flexDirection:'row',paddingHorizontal:10}} >
                    <HomePageBar height={120} navigation={navigation} title={'Skills'}  navigate={'Skills'}  disc={'This is where students show what they can do other than studies'} />
                    <HomePageBar height={120} navigation={navigation} title={'Notes'}  navigate={'NoteCreator_Classification'}  disc={'Make your own Notes, these will not go missing.'} />
                </View>
                <View style={{marginHorizontal:10}} >
                    <HomePageBar  height={120} navigation={navigation} title={'Learn'}  navigate={'Notes'}  disc={'Lets learn something'} />
                </View>
                    

                

                    <View style={{display:notes ? 'flex' : 'none'}} >
                        <Notes navigation={navigation} />
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
                
                        
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginVertical:10}} > Copyright © 2023 Cogit</Text>
                   
                   
                </ScrollView>
                
                
            </View>
    );
}
const styles = StyleSheet.create({
    background:{
        flex:1,
    },
})
export default Homepage;