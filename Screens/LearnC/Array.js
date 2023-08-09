import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Code from '../../components/Code';



const Array = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [lang,setLang] = useState(true);  

    
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        const getLang = async() =>{
            const lang = JSON.parse(await AsyncStorage.getItem("C++Lang"));
            console.log("lang",lang);
            if(lang !== null){
                setLang(lang)
            }else{
                setLang(false);
                await AsyncStorage.setItem("C++Lang",JSON.stringify(false))
            }
          }
          getLang()
    },[])
    

   
    
    const NormalText = ({eng,mal,bold,fontSize}) =>{
        return(
            <View style={{marginVertical:10}} >
                <Text style={{color:Colors.text,fontFamily:bold ? Colors.Bold: Colors.Medium,display:lang ? 'flex' :'none',fontSize : fontSize ? 22 : 14}} >{mal}</Text>
                <Text style={{color:Colors.text,fontFamily:bold ? Colors.Bold: Colors.Medium,display:!lang ? 'flex' :'none',fontSize : fontSize ? 22 : 14}} >{eng}</Text>
            </View>
        )
    }

    
    
 
  
  return (
    <View
      style={{backgroundColor:Colors.Background,flex: 1,}} >
          <Header navigation={navigation} title='Array' info=''  />    
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10,}} >
            
            <View>
            
            <NormalText fontSize={true} eng={"Arrays"} />

            <NormalText eng={"In this chapter, we'll explore arrays in C++. Arrays allow you to store multiple values of the same data type in a single variable. We'll cover one-dimensional and two-dimensional arrays, how to read and store values, perform basic operations, and their significance in programming."} />

            <NormalText fontSize={true} eng={"Introduction to Arrays"} />
            <NormalText eng={"An array is a collection of elements of the same data type, accessed using an index. Arrays provide a way to store and manage multiple related values efficiently."} />

            <NormalText fontSize={true} eng={"One-Dimensional Arrays"} />
            <NormalText eng={"A one-dimensional array is a linear collection of elements. Elements are accessed using their index, which starts from 0."} />
            <Code title="string" code={"int numbers[5];\n// Declare an integer array of size 5\nnumbers[0] = 10;\n// Assign value\nnumbers[1] = 20;\n// ..."} />

            <NormalText fontSize={true} eng={"Reading and Storing Array Values"} />
            <NormalText eng={"You can read and store values in an array using loops or directly by referencing the index."} />
            <Code title="string" code={"for (int i = 0; i < 5; i++) {\n    cout << \"Enter a number: \";\n    cin >> numbers[i];\n// Store input in the array\n}"} />

            <NormalText fontSize={true} eng={"Two-Dimensional Arrays"} />
            <NormalText eng={"A two-dimensional array is a matrix-like collection of elements organized in rows and columns. Elements are accessed using two indices."} />
            <Code title="string" code={"int matrix[3][3];\n// Declare a 3x3 integer matrix\nmatrix[0][0] = 1;\n// Assign value to first element\nmatrix[1][2] = 5;\n// Assign value to second row, third column"} />

            <NormalText fontSize={true} eng={"Array Operations"} />
            <NormalText eng={"Arrays support various operations, such as finding the sum, average, maximum, and minimum values."} />
            <Code title="string" code={"int sum = 0;\nfor (int i = 0; i < 5; i++) {\n    sum += numbers[i];\n}\ndouble average = static_cast<double>(sum) / 5;  // Calculate average\n\nint max = numbers[0];\nint min = numbers[0];\nfor (int i = 1; i < 5; i++) {\n    if (numbers[i] > max) {\n        max = numbers[i];\n    }\n    if (numbers[i] < min) {\n        min = numbers[i];\n    }\n}"} />

            <NormalText fontSize={true} eng={"Conclusion"} />
            <NormalText eng={"Arrays are essential data structures that enable you to work with collections of values efficiently. This chapter covered one-dimensional and two-dimensional arrays, reading and storing values, and basic array operations. By mastering arrays, you can create programs that handle and manipulate multiple values seamlessly."} />

            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Struct')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Array;
