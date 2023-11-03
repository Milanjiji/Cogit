import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Code from '../../components/Code';
import { storage } from '../../Storage';



const Math = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [lang,setLang] = useState(true);  

    
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

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
          
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10,}} >
            
            <View>
            <NormalText fontSize={true} eng={"Math"} />
            <NormalText eng={"In this chapter, we will delve into the world of mathematical operations and concepts in C++. We'll cover various mathematical operations, basic arithmetic, and even touch upon a few more advanced mathematical concepts."} />
            <NormalText fontSize={true} eng={"Introduction to Math in C++"} />
            <NormalText eng={"Mathematics is a fundamental aspect of programming. C++ provides a range of built-in functions and operators to perform mathematical computations."} />
            
            <NormalText fontSize={true} eng={"Arithmetic Operations"} />
            <NormalText eng={"C++ supports standard arithmetic operations like addition, subtraction, multiplication, and division."} />
            <Code title="string" code={"int a = 10, b = 5;\nint sum = a + b;\nint difference = a - b;\nint product = a * b;\nint quotient = a / b;"} />
            <NormalText eng={"Here 'sum' stores the sum of a and b, 'difference' stores subtraction of a and b, 'product' holds the multiplication result of a and b, and 'quotient' contains the result of division between a and b."} />

            <NormalText fontSize={true} eng={"Modulus Operator"} />
            <NormalText eng={"The modulus operator % gives the remainder of a division operation. It's often used for tasks like checking if a number is even or odd."} />
            <Code title="reminder" code={"int remainder = a % b;"} />

            <NormalText fontSize={true} eng={"Order of Operations"} />
            <NormalText eng={"Just like in mathematics, C++ follows the order of operations, including parentheses to override default precedence."} />
            <Code title="result" code={"int result = 2 + 3 * 4;  // result = 14, not 20"} />

            <NormalText fontSize={true} eng={"Increment and Decrement Operators"} />
            <NormalText eng={"C++ provides ++ and -- operators to increment and decrement values."} />
            <Code title="Increment or Decrement" code={"int num = 5;\nnum++;  // num becomes 6\nnum--;  // num becomes 5 again"} />

            <NormalText fontSize={true} eng={"Mathematical Functions"} />
            <NormalText eng={"C++ offers various mathematical functions in the cmath library for more complex operations."} />
            <Code title="Mathematical Functions" code={"#include <cmath>\ndouble squareRoot = sqrt(25.0);  // Calculates square root\ndouble power = pow(2.0, 3.0);    // Calculates 2 raised to the power of 3"} />

            <NormalText fontSize={true} eng={"Random Numbers"} />
            <NormalText eng={"To generate random numbers, you can use the rand() function from the cstdlib library."} />
            <Code title="Random Numbers" code={"#include <cstdlib>\n#include <ctime>\nsrand(time(0));  // Seed the random number generator\nint randomNumber = rand() % 100;  // Generates a random number between 0 and 99"} />

            <NormalText fontSize={true} eng={"Trigonometric Functions"} />
            <NormalText eng={"The cmath library also provides trigonometric functions like sin, cos, and tan which work with radians."} />
            <Code title="Trigonometric Functions" code={"#include <cmath>\ndouble angle = 30.0;\ndouble sineValue = sin(angle);  // Calculates sine of the angle"} />

            <NormalText fontSize={true} eng={"Constants"} />
            <NormalText eng={"C++ includes some useful mathematical constants, such as M_PI for π and M_E for Euler's number."} />
            <Code title="Constants" code={"#include <cmath>\ndouble circleArea = M_PI * radius * radius;"} />

            <NormalText fontSize={true} eng={" Conclusion"} />
            <NormalText eng={"Mathematics is at the core of many programming tasks. This chapter introduced you to basic arithmetic, order of operations, mathematical functions, and random number generation in C++. With these tools, you can perform a wide range of mathematical computations to enhance your programs' capabilities."} />
                        
            
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Booleans')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Math;
