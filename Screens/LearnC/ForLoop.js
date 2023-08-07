import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Code from '../../components/Code';
import CodeEditor from '../SampleCodeEditor';



const ForLoop = ({navigation}) => {
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
          <Header navigation={navigation} title='For Loop' info=''  />    
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10,}} >
            
            <View>
            
            <NormalText fontSize={true} eng={"For Loop"} />

            <NormalText eng={"In this chapter, we'll delve into the 'for' loop in C++. The 'for' loop is a powerful tool for executing a block of code a specific number of times. We'll cover its structure, initialization, termination condition, iteration expression, and use cases."} />

            <NormalText fontSize={true} eng={"Introduction to the 'for' Loop"} />
            <NormalText eng={"The 'for' loop is used to execute a block of code repeatedly for a fixed number of times, with precise control over initialization, condition, and iteration."} />

            <NormalText fontSize={true} eng={"Structure of the 'for' Loop"} />
            <NormalText eng={"The 'for' loop consists of the 'for' keyword, followed by initialization, termination condition, iteration expression, and the code block to execute in a loop."} />
            <Code title="string" code={"for (int i = 0; i < 5; i++) {\n    cout << \"Iteration \" << i << endl;\n}"} />

            <NormalText fontSize={true} eng={"Initialization, Condition, and Iteration Expression"} />
            <NormalText eng={"The initialization is performed before the loop starts. The condition is checked before each iteration, and the iteration expression is executed at the end of each iteration."} />

            <NormalText fontSize={true} eng={"'for' Loop vs. 'while' Loop"} />
            <NormalText eng={"The 'for' loop is ideal when you know the exact number of iterations you need. It combines initialization, condition checking, and iteration expression within a single line."} />

            <NormalText fontSize={true} eng={"Nested 'for' Loops"} />
            <NormalText eng={"You can nest 'for' loops to create multi-dimensional iterations, such as loops for rows and columns in a grid."} />
            <Code title="string" code={"for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        cout << \"Row \" << i << \", Column \" << j << endl;\n    }\n}"} />

            <NormalText fontSize={true} eng={"Use Cases"} />
            <NormalText eng={"'for' loops are commonly used for iterating through arrays, implementing countdowns, creating patterns, and any scenario where a specific number of iterations is needed."} />

            <NormalText fontSize={true} eng={"Infinite Loops"} />
            <NormalText eng={"Be cautious when using 'for' loops to ensure that the termination condition will eventually become false. Otherwise, you risk creating an infinite loop."} />
            <Code title="string" code={"for (;;) {\n    // This will run indefinitely\n}"} />

            <NormalText fontSize={true} eng={"Conclusion"} />
            <NormalText eng={"The 'for' loop is a versatile control structure for executing code a predetermined number of times. This chapter covered its structure, initialization, condition, iteration expression, nested loops, and use cases. By mastering 'for' loops, you can efficiently manage repetitive tasks and controlled iterations in your programs."} />

            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Array')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default ForLoop;
