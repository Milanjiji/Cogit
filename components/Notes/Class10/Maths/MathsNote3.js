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
            num={'3'} 
            name={'Pair of Linear Equations in Two Variables'} 
            chapterSummary={'In this chapter, you will learn about pairs of linear equations in two variables, their graphical and algebraic methods of solutions, and equations reducible to a pair of linear equations.'}
            sub1num={'3.1'}
            sub1title={'Introduction'}
            sub1summary={'The chapter introduces the concept of a pair of linear equations in two variables, their solutions, and their graphical representation.'}
        
            sub2num={'3.2'}
            sub2title={'Pair of Linear Equations in Two Variables'}
            sub2summary={'A pair of linear equations in two variables can be represented as ax + by = c and dx + ey = f, where a, b, c, d, e, and f are constants and x and y are variables.'}
        
            sub3num={'3.3'}
            sub3title={'Graphical Method of Solution of a Pair of Linear Equations'}
            sub3summary={'The graphical method of solution involves plotting the graphs of two linear equations in a coordinate plane and finding their point of intersection to obtain the solution.'}
            sub3ex={'For example, the solution of the pair of equations x + y = 4 and x - y = 2 is (3,1) as the graphs of the two equations intersect at the point (3,1).'}
        
            sub4num={'3.4'}
            sub4title={'Algebraic Methods of Solving a Pair of Linear Equations'}
            sub4summary={'There are three algebraic methods of solving a pair of linear equations: substitution method, elimination method, and cross-multiplication method.'}
        
            sub5num={'3.4.1'}
            sub5title={'Substitution Method'}
            sub5summary={'In the substitution method, one of the equations is solved for one variable and the resulting expression is substituted into the other equation to obtain the value of the second variable.'}
            sub5ex={'For example, the solution of the pair of equations x + y = 4 and x - y = 2 using substitution method is (3,1) as we can solve the second equation for x to get x = y + 2, and then substitute this expression for x in the first equation to get 2y + 2 = 4, which gives y = 1, and then substituting y = 1 in the expression for x, we get x = 3.'}
        
            sub6num={'3.4.2'}
            sub6title={'Elimination Method'}
            sub6summary={'In the elimination method, one of the variables is eliminated by adding or subtracting the two equations.'}
            sub6ex={'For example, the solution of the pair of equations x + y = 4 and x - y = 2 using elimination method is (3,1) as we can add the two equations to get 2x = 6, which gives x = 3, and then substituting x = 3 in either of the equations, we get y = 1.'}

            sub7num={'3.4.3'}
            sub7title={'Cross-Multiplication Method'}
            sub7summary={'This subtopic explains how to solve a pair of linear equations using the cross-multiplication method.'}
            sub7ex={'For example, Solve the following pair of linear equations by the cross-multiplication method x/2 + y/3 = 1 , x/3 + y/2 = 2'}

            sub8num={'3.5'}
            sub8title={'Equations Reducible to a Pair of Linear Equations in Two Variables'}
            sub8summary={'This subtopic discusses how some equations can be reduced to a pair of linear equations in two variables.'}
            sub8ex={'For example,  Solve the following equation by reducing it to a pair of linear equations in two variables: (x + 2)/(x - 1) + (x - 1)/(x + 2) = 4'}

             />
             <Questions link={'https://youtube.com'} />
             <Footor navigation={navigation} nextChapter={'MathsNote4'}  />
             
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