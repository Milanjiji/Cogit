import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Code from '../../components/Code';
import CodeEditor from '../SampleCodeEditor';
import { storage } from '../../Storage';



const HelloWorld = ({navigation}) => {
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
            <NormalText fontSize={true} eng={"Running Hello, World!"} />
            <NormalText eng={"Welcome the students to the second session of the C++ programming tutorial. In this session, we will learn how to run a basic Hello, World! program in C++. Running this program will help you understand how the code execution process works and provide you with a sense of accomplishment."} />
            <NormalText eng={"This is a sample program in C++ to display Hello World!,"} />
            <CodeEditor  />

            <Code title="Hello world" code={"#include <iostream>\nusing namespace std;\n\nint main()\n{\ncout<<\"Hello World!\";\nreturn 0;\n}"}/>
              
            <NormalText eng={"Let's go through the code step by step and explain each element and its purpose"} />

            <Code title="cpp" code={"#include <iostream>"}/>

            <NormalText eng={"This line includes the <iostream> header, which is a standard C++ library that provides basic input and output functionality. It allows us to use input/output streams like cout (for output) and cin (for input)."} />

            <Code title="cpp" code={"int main()"}/>
            <NormalText eng={"This is the starting point of every C++ program. The main function is the entry point of the program, and the execution of the code begins from here."} />

            <Code title="cpp" code={"cout<<\"Hello world\";"}/>
            <NormalText eng={"In this line, we use cout, which is an output stream defined in the iostream library. It is used to display text on the console (standard output). The << operator is the insertion operator, which is used to insert data into the output stream. Here, we are inserting the string \"Hello World!\" into the output stream."} />

            <Code title="cpp" code={"return 0;"}/>
            <NormalText eng={"The return statement is used to exit the main function and return a value to the operating system. In C++, returning 0 from main indicates that the program executed successfully without any errors. A non-zero value typically indicates an error or some specific condition."} />
            
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Variables')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default HelloWorld;
