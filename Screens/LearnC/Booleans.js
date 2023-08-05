import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Code from '../../components/Code';
import CodeEditor from '../SampleCodeEditor';



const Booleans = ({navigation}) => {
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
          <Header navigation={navigation} title='Booleans' info=''  />    
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10,}} >
            
            <View>
            
            <NormalText fontSize={true} eng={"Booleans"} />

            <NormalText eng={"In this chapter, we'll explore the concept of Booleans in C++. Booleans are essential for decision-making and controlling the flow of your program. We'll learn about their representation, logical operators, and their significance in conditional statements."} />

            <NormalText fontSize={true} eng={"Introduction to Booleans"} />
            <NormalText eng={"A Boolean is a data type that represents two values: true and false. Booleans are fundamental for making decisions in programming and controlling the execution flow."} />

            <NormalText fontSize={true} eng={"Boolean Variables"} />
            <NormalText eng={"To declare a Boolean variable, you can use the 'bool' keyword."} />
            <Code title="string" code={"bool isRaining = true;\nbool hasPassedExam = false;"} />

            <NormalText fontSize={true} eng={"Logical Operators"} />
            <NormalText eng={"C++ provides logical operators to combine and manipulate Boolean values."} />
            <Code title="string" code={"bool isSunny = true;\nbool isWarm = false;\nbool isGoodWeather = isSunny && isWarm;\n// AND operator\nbool isEitherOr = isSunny || isWarm;\n// OR operator\nbool isNotSunny = !isSunny;\n// NOT operator"} />

            <NormalText fontSize={true} eng={"Conditional Statements"} />
            <NormalText eng={"Booleans play a crucial role in conditional statements, like 'if' statements."} />
            <Code title="string" code={"if (isSunny && isWarm) {\n    cout << \"It's a great day!\";\n} else if (isSunny || isWarm) {\n    cout << \"It's either sunny or warm.\";\n} else {\n    cout << \"The weather isn't great.\";\n}"} />

            <NormalText fontSize={true} eng={"Comparison Operators"} />
            <NormalText eng={"Comparison operators compare values and return Boolean results."} />
            <Code title="string" code={"int age = 18;\nbool isAdult = age >= 18;\n// Greater than or equal comparison\nbool isTeenager = age>12 && age<18;\n// Combined comparison"} />

            <NormalText fontSize={true} eng={"Truthy and Falsy Values"} />
            <NormalText eng={"In C++, 0 is considered 'false', and any non-zero value is considered 'true'."} />
            <Code title="string" code={"int number = 0;\nif (number) {\n    cout << \"This won't be printed.\";\n} else {\n    cout << \"This will be printed.\";\n}"} />

            <NormalText fontSize={true} eng={"Conclusion"} />
            <NormalText eng={"Booleans are the backbone of decision-making in programming. This chapter covered Boolean variables, logical operators, their role in conditional statements, and how comparison operators work. By mastering Booleans, you can create programs that make dynamic decisions based on various conditions."} />

            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Conditions')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Booleans;
