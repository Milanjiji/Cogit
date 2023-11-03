import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Code from '../../components/Code';
import { storage } from '../../Storage';



const WhileLoop = ({navigation}) => {
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
            
            <NormalText fontSize={true} eng={"While Loop"} />

            <NormalText eng={"In this chapter, we'll explore the 'while' loop in C++. The 'while' loop allows you to repeatedly execute a block of code while a certain condition is true. We'll cover its structure, use cases, and how to ensure that the loop eventually terminates."} />

            <NormalText fontSize={true} eng={"Introduction to the 'while' Loop"} />
            <NormalText eng={"The 'while' loop is used to repeatedly execute a block of code as long as a specified condition remains true."} />

            <NormalText fontSize={true} eng={"Structure of the 'while' Loop"} />
            <NormalText eng={"The 'while' loop consists of the 'while' keyword, followed by a condition in parentheses, and the code block to be executed in a loop."} />
            <Code title="string" code={"int count = 0;\nwhile (count < 5) {\n    cout << \"Count: \" << count;\n    count++;\n}"} />

            <NormalText fontSize={true} eng={"Condition Evaluation"} />
            <NormalText eng={"The condition in the 'while' loop is evaluated before each iteration. If the condition is false initially, the loop will never execute."} />

            <NormalText fontSize={true} eng={"'while' Loop vs. 'for' Loop"} />
            <NormalText eng={"The 'while' loop is suitable when you want to repeat a block of code while a condition remains true, without a fixed number of iterations. The 'for' loop is preferable for iterating a specific number of times."} />

            <NormalText fontSize={true} eng={"Infinite Loops"} />
            <NormalText eng={"Be cautious with 'while' loops, as writing a loop without a proper termination condition can lead to an infinite loop, which continuously executes without stopping."} />
            <Code title="string" code={"while (true) {\n    // This will run indefinitely\n}"} />

            <NormalText fontSize={true} eng={"Use Cases"} />
            <NormalText eng={"'while' loops are commonly used for reading input until a certain condition is met, implementing game loops, and repetitive tasks with variable termination conditions."} />

            <NormalText fontSize={true} eng={"Terminating the Loop"} />
            <NormalText eng={"To ensure that the 'while' loop eventually terminates, make sure that the condition becomes false at some point during execution."} />

            <NormalText fontSize={true} eng={"Conclusion"} />
            <NormalText eng={"The 'while' loop is a fundamental control structure that allows you to repeatedly execute code based on a condition. This chapter covered its structure, use cases, and the importance of ensuring loop termination. By mastering 'while' loops, you can create programs that efficiently handle repetitive tasks and controlled iterations."} />

            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('ForLoop')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default WhileLoop;
