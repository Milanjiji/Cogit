import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Code from '../../components/Code';
import { storage } from '../../Storage';



const Pointers = ({navigation}) => {
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
            
            <NormalText fontSize={true} eng={"Pointers"} />

            <NormalText eng={"In this chapter, we'll explore pointers in C++. Pointers allow you to manipulate memory directly and work with memory addresses. We'll cover their definition, memory representation, pointer arithmetic, and their significance in various programming tasks."} />

            <NormalText fontSize={true} eng={"Introduction to Pointers"} />
            <NormalText eng={"A pointer is a variable that stores the memory address of another variable. Pointers provide a way to interact with memory and create dynamic data structures."} />

            <NormalText fontSize={true} eng={"Declaring and Initializing Pointers"} />
            <NormalText eng={"To declare a pointer, use the data type followed by an asterisk. Initialize pointers with the address of another variable."} />
            <Code title="string" code={"int num = 10;\nint* numPtr;\n// Declare an integer pointer\nnumPtr = &num;\n// Initialize with address of 'num'"} />

            <NormalText fontSize={true} eng={"Accessing Pointer Values"} />
            <NormalText eng={"You can access the value a pointer points to using the dereference operator (*)."} />
            <Code title="string" code={"cout << *numPtr;\n// value pointed to by 'numPtr'"} />

            <NormalText fontSize={true} eng={"Pointer Arithmetic"} />
            <NormalText eng={"Pointers support arithmetic operations like addition and subtraction, which allows you to navigate through memory."} />
            <Code title="string" code={"int arr[] = {1, 2, 3};\nint* arrPtr = arr;\n\ncout << *arrPtr;      // Outputs 1\ncout << *(arrPtr+1);  // Outputs 2\n"} />

            <NormalText fontSize={true} eng={"Null Pointers"} />
            <NormalText eng={"Pointers can also have a special value 'nullptr', indicating that they don't point to any valid memory location."} />
            <Code title="string" code={"int* nullPtr = nullptr;"} />

            <NormalText fontSize={true} eng={"Use Cases"} />
            <NormalText eng={"Pointers are essential for dynamic memory allocation, passing values by reference, and working with complex data structures like linked lists."} />

            <NormalText fontSize={true} eng={"Memory Management"} />
            <NormalText eng={"With great power comes great responsibility. Improper use of pointers can lead to memory leaks or crashes. Be mindful of memory management."} />

            <NormalText fontSize={true} eng={"Conclusion"} />
            <NormalText eng={"Pointers are a fundamental concept in C++, allowing you to interact with memory directly. This chapter covered pointer declaration, initialization, dereferencing, arithmetic, null pointers, and their importance in programming. By mastering pointers, you can create more efficient and dynamic programs."} />

            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Function')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Pointers;
