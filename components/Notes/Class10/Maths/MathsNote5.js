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


const MathsNote10 = ({navigation,route}) =>{

    return(
        <ScrollView style={styles.background} >
            <Model 
            num={'1'} 
            name={'Real Numbers'} 
            chapterSummary={'In this chapter, you will learn about real numbers and their properties. You will also learn how to find the HCF and LCM of given numbers and solve some problems based on the Euclid s division lemma.'}
            sub1num={'1.1'}
            sub1title={'Introduction to Real Numbers'}
            sub1summary={'Real numbers include all rational and irrational numbers. Rational numbers can be expressed as p/q where p and q are integers, and q is not equal to zero. Irrational numbers cannot be expressed as p/q.'}

            sub2num={'1.2'}
            sub2title={'Euclid s Division Lemma'}
            sub2summary={'Given two positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 ≤ r < b.'}
            sub2ex={'For example, if we divide 17 by 5, we get 17 = 5 x 3 + 2, where 3 is the quotient and 2 is the remainder.'}

            sub3num={'1.3'}
            sub3title={'HCF and LCM'}
            sub3summary={'HCF or Highest Common Factor is the largest number that divides two or more given numbers without leaving a remainder. LCM or Least Common Multiple is the smallest number that is a multiple of two or more given numbers.'}
            sub3ex={'For example, the HCF of 12 and 18 is 6 as it is the largest number that can divide both 12 and 18 without leaving a remainder. The LCM of 12 and 18 is 36 as it is the smallest number that is a multiple of both 12 and 18.'}

            sub4num={'1.4'}
            sub4title={'Revisiting Irrational Numbers'}
            sub4summary={'Irrational numbers cannot be expressed as p/q. Some examples of irrational numbers are √2, √3, and π.'}
            sub4ex={'For example, if we try to express √2 as a fraction, we get a never-ending decimal, which means it is irrational.'}

            sub5num={'1.5'}
            sub5title={'Summary'}
            sub5summary={'Real numbers include all rational and irrational numbers. Euclid s division lemma helps us find the quotient and remainder when dividing two numbers. HCF is the largest number that can divide two or more numbers without leaving a remainder, while LCM is the smallest number that is a multiple of two or more numbers. Irrational numbers cannot be expressed  p/q.'}
            sub5ex={'I hope this summary and explanation of Chapter 1 of Mathematics was helpful. Let me know if you have any further questions.'}

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