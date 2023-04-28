import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Dimensions
  } from 'react-native';
import Ai from './Ai'
import Header from '../components/Header';
import Notes from '../components/Notes';
import HomePageFootor from '../components/HomePageFootor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '../components/Profile';
import Events from '../components/Events';
import Utilities from '../components/Utilities';
import Achievement from '../components/Achivements';
import PrevSection from '../components/PrevSection';
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
    const width = Dimensions.get('window').width
    console.log(width-100);
    return(
            <View  style={styles.background} >
                
                <Header info={'info'} letterpacing={'y'} title={'Cogit'} />
                <ScrollView>
                    <Events />
                    <PrevSection navigation={navigation} />
                    <View style={{flexDirection:'row',width:width,padding:10}} >
                        <Achievement />
                        <Utilities/>
                    </View>
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