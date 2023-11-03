import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Code from '../../components/Code';
import { storage } from '../../Storage';



const Struct = ({navigation}) => {
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
            
            <NormalText fontSize={true} eng={"Structures"} />

            <NormalText eng={"In this chapter, we'll dive into structures in C++. Structures allow you to create your own data types by grouping variables of different types under a single unit. We'll cover their definition, member access, initialization, and their importance in organizing complex data."} />

            <NormalText fontSize={true} eng={"Introduction to Structures"} />
            <NormalText eng={"A structure is a user-defined composite data type that groups variables of different data types under a single entity. It's useful for representing real-world entities and organizing related information."} />

            <NormalText fontSize={true} eng={"Defining a Structure"} />
            <NormalText eng={"To define a structure, you use the 'struct' keyword, followed by a name for the structure and its member variables."} />
            <Code title="string" code={"struct Person {\n    string name;\n    int age;\n    double height;\n};"}/>

            <NormalText fontSize={true} eng={"Accessing Structure Members"} />
            <NormalText eng={"You can access structure members using the dot operator."} />
            <Code title="string" code={"Person person1;\nperson1.name = \"John\";\nperson1.age = 30;\nperson1.height = 6.2;"} />

            <NormalText fontSize={true} eng={"Initializing Structures"} />
            <NormalText eng={"You can initialize structure variables at the time of declaration."} />
            <Code title="string" code={"Person person2 = {\"Alice\", 25, 5.6};"} />

            <NormalText fontSize={true} eng={"Structures within Structures"} />
            <NormalText eng={"Structures can contain other structures as members, allowing you to create complex data structures."} />
            <Code title="string" code={"struct Address {\n    string street;\n    string city;\n};\n\nstruct Contact {\n    string name;\n    Address address;\n};"}/>

            <NormalText fontSize={true} eng={"Use Cases"} />
            <NormalText eng={"Structures are useful for representing entities with multiple attributes, such as students, employees, addresses, and more."} />

            <NormalText fontSize={true} eng={"Conclusion"} />
            <NormalText eng={"Structures are a powerful tool for organizing and representing complex data in a structured manner. This chapter covered their definition, member access, initialization, nesting, and use cases. By mastering structures, you can create more organized and intuitive programs that work with real-world data."} />

            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Pointer')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Struct;
