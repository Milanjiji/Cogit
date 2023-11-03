import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import { storage } from '../../Storage';
import Code from '../../components/Code';



const Switch = ({navigation}) => {
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
            
            <NormalText fontSize={true} eng={"Switch"} />

            <NormalText eng={"In this chapter, we'll explore the 'switch' statement in C++. The 'switch' statement provides a way to handle multiple conditions in a more organized manner. We'll cover its structure, use cases, and how to effectively implement it in your programs."} />

            <NormalText fontSize={true} eng={"Introduction to the 'switch' Statement"} />
            <NormalText eng={"The 'switch' statement is used to evaluate an expression against multiple possible cases and execute different blocks of code based on the value of that expression."} />

            <NormalText fontSize={true} eng={"Structure of the 'switch' Statement"} />
            <NormalText eng={"The 'switch' statement consists of the 'switch' keyword, an expression to evaluate, and multiple 'case' labels with associated code blocks."} />
            <Code title="string" code={"int day = 3;\nswitch (day) {\n    case 1:\n        cout << \"Monday\";\n        break;\n    case 2:\n        cout << \"Tuesday\";\n        break;\n    // ... other cases ...\n    default:\n        cout << \"Invalid day\";\n}"} />

            <NormalText fontSize={true} eng={"'break' Statement"} />
            <NormalText eng={"The 'break' statement is used to exit the 'switch' block once a matching 'case' is found. It prevents fall-through to subsequent cases."} />

            <NormalText fontSize={true} eng={"'default' Case"} />
            <NormalText eng={"The 'default' case is executed when none of the 'case' values match the expression's value. It's like the 'else' clause for the 'switch' statement."} />

            <NormalText fontSize={true} eng={"'switch' vs. 'if-else'"} />
            <NormalText eng={"The 'switch' statement is ideal when you have multiple specific cases to evaluate. For more complex conditions, 'if-else' might be a better choice."} />

            <NormalText fontSize={true} eng={"Use Cases"} />
            <NormalText eng={"The 'switch' statement is commonly used for menu-driven programs, handling user input, and scenarios where a single value leads to different actions."} />

            <NormalText fontSize={true} eng={"Limitations"} />
            <NormalText eng={"The 'switch' expression must be an integral or enumeration type. It doesn't support floating-point types or string comparisons."} />

            <NormalText fontSize={true} eng={"Conclusion"} />
            <NormalText eng={"The 'switch' statement is a powerful tool for handling multiple cases based on a single expression. This chapter covered its structure, 'case' labels, 'break' statements, and its use cases. By mastering the 'switch' statement, you can create more organized and efficient code for scenarios with multiple possible outcomes."} />

            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('WhileLoop')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Switch;
