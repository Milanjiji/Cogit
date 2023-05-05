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
import Events from '../components/Events';
import Utilities from '../components/Utilities';
import Achievement from '../components/Achivements';
import PrevSection from '../components/PrevSection';
import Colors from '../colors.json'
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
    const width = Dimensions.get('window').width;
    return(
            <View  style={styles.background} >
                
                <Header info={'info'} letterpacing={'y'} title={'Cogit'} />
                <ScrollView showsVerticalScrollIndicator={false} >
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
        backgroundColor:Colors.Background,
        flex:1,
        
    },
})
export default Homepage;