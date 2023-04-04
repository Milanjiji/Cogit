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
import Model from '../../Model';
import Footor from '../../../../components/Footor';
import Questions from '../../../../components/Questions';
import note from './mathsNotes.json'
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


const MathsNote10 = ({navigation,route}) =>{
    console.log(note.chapter1.chapterIntro);

    return(
        <ScrollView style={styles.background} >
            <Model 
            num={'1'} 
            name={'Real Numbers'} 
            chapterSummary={note.chapter1.chapterIntro}
            sub1title={'dfgndf'}
            sub1summary={'dfgndfg'}

            
            sub2title={'dfgndfgn'}
            sub2summary={'dfgndfgn'}
            sub2ex={''}

            
            sub3title={''}
            sub3summary={''}
            sub3ex={''}

            
            sub4title={''}
            sub4summary={''}
            sub4ex={''}

            
            sub5title={''}
            sub5summary={''}
            sub5ex={''}

             />
             <Questions link={'https://youtube.com'} />
             <Footor navigation={navigation} nextChapter={'MathsNote2'}  />
             
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:'#faf0e6',
        flex:1
    },
    
});
export default MathsNote10;