import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Code from '../../components/Code';
import { storage } from '../../Storage';



const Operators = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [lang,setLang] = useState(true);  

  const [code, setCode] = useState('#include <iostream> using namespace std; int main(){cout<<"hello world";}');

  const handleCompile = async () => {
    const toCompile = {
      LanguageChoice: '7',
      Program: code,
      Input: '',
      CompilerArgs: ''
    };

    try {
      const response = await fetch('https://rextester.com/rundotnet/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toCompile)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data));
      } else {
        const errorData = await response.json();
        console.log('Request failed', JSON.stringify(errorData));
      }
    } catch (error) {
      console.log('Error', error.message);
    }
  };

    
    useEffect(()=>{
        const getColors = async()=>{
          const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        handleCompile();

        const getLang = async() =>{
          const lang = storage.getBoolean("C++Lang");
            console.log("lang",lang);
            if(lang !== undefined){
                setLang(lang)
            }else{
                setLang(false);
                storage.set("C++Lang",false)
            }
          }
          getLang()
    },[])
    

   
    
    const NormalText = ({eng,mal,bold,fontSize,marginLeft}) =>{
        return(
            <View style={{marginVertical:10}} >
                <Text style={{color:Colors.text,fontFamily:bold ? Colors.Bold: Colors.Medium,display:lang ? 'flex' :'none',fontSize : fontSize ? 22 : 14,marginLeft : marginLeft ? marginLeft : 0}} >{mal}</Text>
                <Text style={{color:Colors.text,fontFamily:bold ? Colors.Bold: Colors.Medium,display:!lang ? 'flex' :'none',fontSize : fontSize ? 22 : 14,marginLeft : marginLeft ? marginLeft : 0}} >{eng}</Text>
            </View>
        )
    }

    
    
 
  
  return (
    <View
      style={{backgroundColor:Colors.Background,flex: 1,}} >
          
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10,}} >
            
            <View>
            <NormalText fontSize={true} eng={"Operators"} />
            <NormalText eng={"In this session, we will cover C++ operators, which are symbols used to perform various operations on variables and values. C++ supports a wide range of operators, including arithmetic, assignment, comparison, logical, bitwise, and more. Below is an overview of some common C++ operators"} />

            <NormalText fontSize={true} eng={"1.Arithmetic Operators:"} />
            <NormalText marginLeft={20} eng={"+ Addition\n- Subtraction\n* Multiplication\n/ Division\n% Modulus (remainder)"} />
            
            <NormalText fontSize={true} eng={"2.Assignment Operators:"} />
            <NormalText marginLeft={20} eng={"= Assignment\n+= Add and assign\n-= Subtract and assign\n*= Multiply and assign\n/= Divide and assign\n%= Modulus and assign"} />

            <NormalText fontSize={true} eng={"3.Comparison Operators:"} />
            <NormalText marginLeft={20} eng={"== Equal to\n!= Not equal to\n> Greater than\n< Less than\n>= Greater than or equal to\n<= Less than or equal to"} />

            <NormalText fontSize={true} eng={"4.Logical Operators:"} />
            <NormalText marginLeft={20} eng={"&& Logical AND\n|| Logical OR\n! Logical NOT"} />

            <NormalText fontSize={true} eng={"5.Bitwise Operators:"} />
            <NormalText marginLeft={20} eng={"& Bitwise AND\n| Bitwise OR\n^ Bitwise XOR\n~ Bitwise NOT\n<< Left shift\n>> Right shift"} />

            <NormalText fontSize={true} eng={"6.Increment and Decrement Operators:"} />
            <NormalText marginLeft={20} eng={"++ Increment\n-- Decrement"} />

            <NormalText fontSize={true} eng={"7.Conditional (Ternary) Operator:"} />
            <NormalText marginLeft={20} eng={"condition ? expr1 : expr2 If the condition is true, evaluates to expr1; otherwise, evaluates to expr2."} />

            <NormalText fontSize={true} eng={"8.Comma Operator:"} />
            <NormalText marginLeft={20} eng={", Evaluates both expressions and returns the result of the right-hand side."} />

            <NormalText eng={"These operators allow you to perform mathematical computations, make decisions based on conditions, manipulate bits, and more. Understanding how to use C++ operators is essential for writing efficient and concise code."} />

            <NormalText eng={"Example usage of some operators:"} />
            <Code title={"Operators"} code={`#include <iostream> \nusing namespace std; \n\nint main() { \n\n    int x = 5, y = 3, z; \n\n    z = x + y; // z = 5 + 3 = 8 \n    z = x * y; // z = 5 * 3 = 15 \n    // Arithmetic operators \n\n    bool isEqual = (x == y); \n    // false (x is not equal to y) \n    bool isGreater = (x > y); \n    // true (x is greater than y) \n    // Comparison operators \n\n    bool result = (isEqual && isGreater); \n    // false (isEqual is false, so the \n    result is false) \n\n    // Increment and decrement operators \n    int a = 10; a++; \n    // a is now 11 a--; \n    // a is now 10 \n\n    // Conditional operator \n    int num = 12; \n   string message=(num%2==0)?"Even":"Odd";\n    // message is "Even" since 12 is even \n\n    return 0; \n}`} />


            <Code title={"Operators"} code={"\n#include <iostream>\nusing namespace std;\n\nint main(){\n\n    int x = 5, y = 3, z;\n\n    z = x + y; // z = 5 + 3 = 8\n    z = x * y; // z = 5 * 3 = 15\n    // Arithmetic operators\n\n    bool isEqual = (x == y); // false (x is not equal to y)\n    bool isGreater = (x > y); // true (x is greater than y)\n    // Comparison operators"} />

            
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Variables')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Operators;
