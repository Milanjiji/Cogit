import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Code from '../../components/Code';
import { storage } from '../../Storage';



const Variables = ({navigation}) => {
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
            <NormalText fontSize={true} eng={"Data types"} />
            <NormalText eng={"In this session, we will explore the concept of variables in C++ and learn about different data types used to store various kinds of values. Let's go through some commonly used data types and their purposes."} />

            <NormalText fontSize={true} eng={"Int"} />
            <NormalText eng={"\"int\" is used to store integers (whole numbers) without decimals. It can hold both positive and negative values."} />
            <Code title="int" code={"// syntax \n//int variable_Name = value;\n\nint a = 10;\nint age = 17;"}/>
              
            <NormalText fontSize={true} eng={"double"} />
            <NormalText eng={"\"double\" is used to store floating-point numbers, which include decimal values. It can represent a wide range of numbers with greater precision compared to int."} />
            <Code title="double" code={"// syntax\n// double variable_Name = value;\n\ndouble pi = 3.14159;\ndouble price = 19.99;"} />

            <NormalText fontSize={true} eng={"char"} />
            <NormalText eng={"\"char\" is used to store single characters. Char values are surrounded by single quotes."} />
            <Code title="char" code={"// syntax\n// char variable_Name = 'character';\n\nchar grade = 'A';\nchar symbol = '@';"} />

            <NormalText fontSize={true} eng={"string"} />
            <NormalText eng={"\"string\" is used to store sequences of characters (text). String values are surrounded by double quotes."} />
            <Code title="string" code={"// syntax\n// string variable_Name = \"text\";\n\nstring name = \"John Doe\";\nstring message = \"Hello, World!\";"} />

            <NormalText fontSize={true} eng={"bool"} />
            <NormalText eng={"\"bool\" is used to store values with two states: true or false. It is typically used in conditional expressions and logical operations."} />
            <Code title="bool" code={"// syntax\n// bool variable_Name = true/false;\n\nbool isRaining = true;\nbool isLoggedIn = false;"} />

            <NormalText eng={"Here is the demo of using each of this variables"} />
            
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('UserInput')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Variables;
