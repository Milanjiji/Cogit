import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Code from '../../components/Code';
import { storage } from '../../Storage';




const Strings = ({navigation}) => {
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
            if(lang !== null){
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
            <NormalText fontSize={true} eng={"Strings"} />
            <NormalText eng={"In this chapter, we will explore the concept of strings in C++, which are sequences of characters used to represent textual data. "} />
            <NormalText fontSize={true} eng={"Introduction to Strings"} />
            <NormalText eng={"A string in C++ is essentially an array of characters. It's a way to store and manipulate textual data like words, sentences, or any other character-based information."} />
            
            <NormalText fontSize={true} eng={"Declaring and Initializing Strings"} />
            <NormalText eng={"To declare and initialize a string, we use a character array. For example:"} />
            <Code title="string" code={"char myString[] = \"Hello, World!\";"}/>
            <NormalText eng={"Here, myString is a character array holding the characters 'H', 'e', 'l', 'l', 'o', ',', ' ', 'W', 'o', 'r', 'l', 'd', and the null character '\\0' that marks the end of the string."} />

            <NormalText fontSize={true} eng={"String Operations"} />
            <NormalText eng={"Strings support various operations that allow us to manipulate and access their contents."} />
            <NormalText fontSize={true} eng={"Length"} />
            <NormalText eng={"To find the length of a string, we can iterate through it until we reach the null character."} />
            <Code title="length" code={"int length = 0;\nwhile (myString[length] != '\\0') {\nlength++;\n}\ncout<<length;"}/>
            <NormalText eng={"Here, while loop(you may have not know about while loop don't worry you will learn in the future classes) is cheaking each letter in the char array, last it will reach \\o which means the end"} />

            <NormalText fontSize={true} eng={"String Input and Output"} />
            <NormalText eng={"We can use the standard input and output functions to read and display strings."} />
            <Code title="IO" code={"char inputString[100];\ncout << \"Enter a string: \";\ncin >> inputString;\ncout << \"You entered: \" << inputString;"}/>

            <NormalText fontSize={true} eng={"Conclusion"} />
            <NormalText eng={"In this chapter, we covered the basics of working with strings in C++, including declaration, initialization, manipulation, input/output. Strings provide a powerful way to handle textual data and are essential for various programming tasks involving human-readable information."} />
    
              
            
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Math')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Strings;
