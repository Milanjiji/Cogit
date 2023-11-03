import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Code from '../../components/Code';



const Conditions = ({navigation}) => {
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
            
            <NormalText fontSize={true} eng={"Conditions"} />

            <NormalText eng={"In this chapter, we'll dive into conditions and control structures in C++. Conditions allow your program to make decisions and execute different code paths based on specific criteria. We'll cover 'if' statements, 'else' clauses, 'else if' conditions, and more."} />

            <NormalText fontSize={true} eng={"Introduction to Conditions"} />
            <NormalText eng={"Conditions enable your program to react differently to different situations. They are crucial for building responsive and flexible software."} />

            <NormalText fontSize={true} eng={"The 'if' Statement"} />
            <NormalText eng={"The 'if' statement is used to execute a block of code only if a certain condition is true."} />
            <Code title="string" code={"int num = 10;\nif (num > 0) {\n    cout << \"The number is positive.\";\n}"} />

            <NormalText fontSize={true} eng={"The 'else' Clause"} />
            <NormalText eng={"The 'else' clause allows you to specify an alternate block of code to execute when the 'if' condition is false."} />
            <Code title="string" code={"int num = -5;\nif (num > 0) {\n    cout << \"The number is positive.\";\n} else {\n    cout << \"The number is not positive.\";\n}"} />

            <NormalText fontSize={true} eng={"The 'else if' Condition"} />
            <NormalText eng={"The 'else if' condition lets you check multiple conditions in sequence and execute the corresponding block of code for the first true condition."} />
            <Code title="string" code={"int score = 85;\nif (score >= 90) {\n    cout << \"Excellent!\";\n} else if (score >= 80) {\n    cout << \"Good job!\";\n} else if (score >= 70) {\n    cout << \"Keep it up!\";\n} else {\n    cout << \"You can do better.\";\n}"} />

            <NormalText fontSize={true} eng={"Nested Conditions"} />
            <NormalText eng={"You can nest conditions within each other to create more complex decision trees."} />
            <Code title="string" code={"int x = 10, y = 20;\nif (x > 0) {\n if (y > 0) {\n  cout << \"Both x and y are positive.\";\n } else {\n   cout << \"x is positive,but y is not.\";\n }\n} else {\n    cout << \"x is not positive.\";\n}"} />

            <NormalText fontSize={true} eng={"The Ternary Operator"} />
            <NormalText eng={"The ternary operator provides a compact way to write simple conditions and assign values based on them."} />
            <Code title="string" code={"int num = 7;\nstring result=(num % 2==0)?\"Even\":\"Odd\";"} />

            <NormalText fontSize={true} eng={"Conclusion"} />
            <NormalText eng={"Conditions are a cornerstone of programming logic. This chapter covered the 'if' statement, 'else' clauses, 'else if' conditions, nesting, and the ternary operator. By mastering conditions, you'll be able to create programs that respond dynamically to various scenarios and inputs."} />

            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('Switch')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Conditions;
