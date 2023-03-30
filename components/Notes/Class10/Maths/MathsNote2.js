import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView
  } from 'react-native';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import Pdf from 'react-native-pdf';
import Model from '../Model';
import Footor from '../../Footor';
import Questions from '../../Questions';

  const primary = "#04103a"
const secondry = "#283459"

const black = "black"
const white = "white"
const Bold = "Montserrat-Bold"
const Regular = 'Montserrat-Regular';
const BoldItalic = 'Montserrat-BoldItalic';
const ExtraBold = 'Montserrat-ExtraBold';
const ExtraBoldItalic = 'Montserrat-ExtraBoldItalic';
const Medium = 'Montserrat-Medium';
const MediumItalic = 'Montserrat-MediumItalic';


const MathsNote10Chapter2 = ({navigation,route}) =>{

    return(
        <ScrollView style={styles.background} >
            <Model 
                num={'2'} 
                name={''} 
                chapterSummary={''}
                sub1num={'2.1'}
                sub1title={''}
                sub1summary={''}
                sub1ex={''}

                sub2num={'2.2'}
                sub2title={''}
                sub2summary={''}
                sub2ex={''}

                sub3num={'2.3'}
                sub3title={''}
                sub3summary={''}
                sub3ex={''}

                sub4num={'2.4'}
                sub4title={''}
                sub4summary={''}
                sub4ex={''}

                sub5num={'2.5'}
                sub5title={''}
                sub5summary={''}
                sub5ex={''}    
                 />
             <Questions link={'https://youtube.com'} />
             <Footor navigation={navigation} nextChapter={'MathsNote3'}  />
             
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:'#faf0e6',
        flex:1
    },
    
});
export default MathsNote10Chapter2;