import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Code from '../../components/Code';



const Basics = ({navigation}) => {
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
          <Header navigation={navigation} title='Basics' info=''  />    
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10,}} >
            
            <View>
            <NormalText fontSize={true} eng={"Basics of C++ - Uses of Symbols"} />
            <NormalText eng={"In this session, we will cover the uses of various symbols in C++, explaining their purposes and how they are utilized in the language. Let's go through some commonly used symbols."} />


            <NormalText eng={"In this session, we will cover the uses of various symbols in C++, explaining their purposes and how they are utilized in the language. Let's go through some commonly used symbols."} />

            <Code title="Parentheses" code={"()"}/> 
            <NormalText eng={"Parentheses ():\nUsed for function declarations and function calls.\nUsed to group expressions to control the order of evaluation in arithmetic and logical operations.\nUsed in control structures like if, while, for, etc., to define conditions or loop expressions."} />

            <Code title="Semicolon" code={";"}/>
            <NormalText eng={"Semicolon ;:\nUsed to terminate a statement in C++. Every statement must end with a semicolon.\nIndicate the end of a class, struct, or function definition."} />

            <Code title="Curly Braces" code={"{}"}/>
            <NormalText eng={"Curly Braces {}:\nUsed to define blocks of code. A block groups multiple statements together, treating them as a single unit.\nUsed for defining the body of functions, classes, loops, and conditional statements."} />

            <Code title="Angle Brackets" code={"<>"}/>
            <NormalText eng={"Angle Brackets <>:\nUsed to include headers from the C++ standard library or external libraries.\nSpecifically used with template classes and functions for defining generic data structures and algorithms."} />

            <Code title="Double Less Than and Greater Than" code={"<<"}/>
            <NormalText eng={"Double Less Than << and Double Greater Than >>:\nUsed in C++ for input and output operations with streams (e.g., std::cout for output and std::cin for input).\nOften used with std::ostream (output stream) and std::istream (input stream) objects."} />

            <Code title="Single Line Comment" code={"//"} />
            <NormalText eng={"Single Line Comment //:\nUsed to write comments that extend until the end of the line. Comments are ignored by the compiler and are used for documenting the code."} />

            <Code title="Multi-Line Comment" code={"/* ... */"}/>
            <NormalText eng={"Multi-Line Comment /* ... */:\nUsed to write comments that span multiple lines. Everything between /* and */ is treated as a comment."} />

            <Code title="Assignment Operator" code={"="}/>
            <NormalText eng={"Assignment Operator =:\nUsed to assign a value to a variable."} />

            <Code title="Arithmetic Operators" code={"+, -, *, /, %"}/>
            <NormalText eng={"Arithmetic Operators (+, -, *, /, %):\nUsed for basic arithmetic operations: addition, subtraction, multiplication, division, and modulo (remainder)."} />

            <Code title="Comparison Operators" code={"==, !=, <, >, <=, >="}/>
            <NormalText eng={"Comparison Operators (==, !=, <, >, <=, >=):\nUsed to compare values and produce a Boolean result (true or false)."} />

            <Code title="Logical Operators" code={"&&, ||, !"} />
            <NormalText eng={"Logical Operators (&&, ||, !):\nUsed for combining and negating logical expressions."} />

            <Code title="Increment and Decrement Operators" code={"++, --"} />
            <NormalText eng={"Increment and Decrement Operators (++, --):\nUsed to increase or decrease the value of a variable by one."} />

            <Code title="Bitwise Operators" code={"&, |, ^, ~, <<, >>"}/>
            <NormalText eng={"Bitwise Operators (&, |, ^, ~, <<, >>):\nUsed for manipulating individual bits of data."} />

            <Code title="Conditional (Ternary) Operator" code={"?:"} />
            <NormalText eng={"Conditional (Ternary) Operator ?:\nUsed to write a shorthand if-else statement."} />

            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Variables')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Basics;
