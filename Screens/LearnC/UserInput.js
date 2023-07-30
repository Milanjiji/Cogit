import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Code from '../../components/Code';
import CodeEditor from '../SampleCodeEditor';



const UserInput = ({navigation}) => {
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
          <Header navigation={navigation} title='User Input' info=''  />    
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10,}} >
            
            <View>
            <NormalText fontSize={true} eng={"Data types"} />
            <NormalText eng={"In this session, we will learn how to take input from user."} />

            <NormalText fontSize={true} eng={"cin"} />
            <NormalText eng={"\"cin\" is an input stream object in C++ that is used to read data from the standard input (usually the keyboard) into variables. It is part of the C++ Standard Library's iostream header and provides a convenient way to handle user input."} />
            <NormalText eng={"The basic syntax of \"cin\" is "} />
            <Code title="cin" code={"// syntax \n//cin >> variable;"}/>

            <NormalText eng={"Here is the breakdown of how \"cin\" works"} />

            <NormalText eng={"1.Prompting for Input:"} />
            <NormalText marginLeft={20} eng={"Before using cin, it's a good practice to display a prompt to the user, indicating what type of input you expect. For example:"} />
            <Code title="prompt" code={"\ncout << \"Please enter your age: \";"}/>
              
            <NormalText eng={"2.Reading Input:"} />
            <NormalText marginLeft={20} eng={"After prompting the user, you use cin to read the input provided by the user. You can read different types of data, such as integers, floating-point numbers, characters, and strings."} />
            <Code title="input" code={"\nint age;\ncin >> age;"}/>
            <NormalText marginLeft={20} eng={"In this example, cin reads the user input and stores it in the integer variable age."} />
            
            <NormalText eng={"3.Handling Input Errors:"} />
            <NormalText marginLeft={20} eng={"If the user enters data of the wrong type (e.g., trying to input a character when an integer is expected), cin will enter a failed state, and the input will not be valid. To handle such cases, you can check the state of cin and take appropriate action:"} />
            <Code title="input fail" code={"\nif (cin.fail()) {\ncout << \"Please enter a valid integer.\";\ncin.clear();\ncin.ignore(100,'\\n');"}/>
            <NormalText marginLeft={20} eng={"The cin.clear() function clears the error state, and cin.ignore() skips any incorrect input present in the input buffer."} />

            <NormalText eng={"Here's a complete example code that demonstrates how to use cin to read user input for their age and display it back to them:"} />
            <Code title="cin" code={"\n#include <iostream>\nusing namespace std;\n\nint main() {\n\n    int age;\n    //declare variable\n\n    cout << \"Please enter your age: \";\n    // Prompt to enter their age\n\n    cin >> age;\n    //Read Data\n\n    cout << \"You are \" << age;\n\n    return 0;\n}"}/>
            <NormalText eng={"Copy this code and use it in the code editor to run."} />

            
            
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Operators')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default UserInput;
