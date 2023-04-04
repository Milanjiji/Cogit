import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import Ai from './Ai'
  import Header from '../components/Header';
  import Notes from '../components/Notes';
  import HomePageFootor from '../components/HomePageFootor';
import MainSection from '../components/MainSection';
const primary = "#04103a"
const secondry = "#283459"

const black = "black"
const white = "white"
const Regular = 'Roboto-Regular';
const BoldItalic = 'Montserrat-BoldItalic';
const ExtraBold = 'Montserrat-ExtraBold';
const ExtraBoldItalic = 'Montserrat-ExtraBoldItalic';
const Medium = 'Montserrat-Medium';
const MediumItalic = 'Montserrat-MediumItalic';


const Homepage = ({navigation,route}) =>{
    return(
            <View  style={styles.background} >
                
                <Header info={'info'} letterpacing={'y'} title={'Cogit'} />
                <ScrollView>
                    <MainSection/>
                    <Notes />
                </ScrollView>
                <HomePageFootor navigation={navigation} />
            </View>
    );
}
const styles = StyleSheet.create({
    background:{
        // backgroundColor:'#2b1499',
        backgroundColor:"#12156c",
        flex:1,
        
    },
})
export default Homepage;