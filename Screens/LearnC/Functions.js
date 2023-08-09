import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Code from '../../components/Code';



const Function = ({navigation}) => {
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
          <Header navigation={navigation} title='Functions' info=''  />    
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10,}} >
            
            <View>
            <NormalText fontSize={true} eng={"Functions"} />

            <NormalText eng={"In this chapter, we'll delve into functions in C++. Functions allow you to modularize your code by breaking it into smaller, reusable units. We'll cover function definition, parameters, return values, function overloading, and how functions enhance code organization."} />

            <NormalText fontSize={true} eng={"Introduction to Functions"} />
            <NormalText eng={"A function is a block of code that performs a specific task. Functions help you write modular, organized, and reusable code."} />

            <NormalText fontSize={true} eng={"Defining Functions"} />
            <NormalText eng={"To define a function, use the function signature, followed by the function body enclosed in curly braces."} />
            <Code title="string" code={"int add(int a, int b) {\n    return a + b;\n}"} />

            <NormalText fontSize={true} eng={"Calling Functions"} />
            <NormalText eng={"To call a function, use its name followed by arguments enclosed in parentheses."} />
            <Code title="string" code={"int result = add(5, 3);"} />

            <NormalText fontSize={true} eng={"Function Parameters"} />
            <NormalText eng={"Function parameters allow you to pass values into a function. Parameters act as placeholders for the actual values."} />
            <Code title="string" code={"void printNumber(int num) {\n    cout << num;\n}"} />

            <NormalText fontSize={true} eng={"Return Values"} />
            <NormalText eng={"Functions can return values using the 'return' statement. The return type is specified in the function signature."} />
            <Code title="string" code={"int multiply(int x, int y) {\n    return x * y;\n}"} />

            <NormalText fontSize={true} eng={"Function Overloading"} />
            <NormalText eng={"Function overloading allows you to define multiple functions with the same name but different parameter lists."} />
            <Code title="string" code={"int max(int a, int b) {\n    return (a > b) ? a : b;\n}\ndouble max(double a, double b) {\n    return (a > b) ? a : b;\n}"} />

            <NormalText fontSize={true} eng={"Use Cases"} />
            <NormalText eng={"Functions are used to break down complex tasks into manageable pieces, improve code reusability, and enhance code readability."} />

            <NormalText fontSize={true} eng={"Conclusion"} />
            <NormalText eng={"Functions are a cornerstone of structured programming. This chapter covered function definition, parameters, return values, overloading, and their importance in code organization. By mastering functions, you can create more modular and maintainable programs."} />

           
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Class')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Function;
