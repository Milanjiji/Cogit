import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
 
import Code from '../../components/Code';
import { storage } from '../../Storage';



const Classes = ({navigation}) => {
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
            <NormalText fontSize={true} eng={"Classes"} />

            <NormalText eng={"In this chapter, we'll explore classes in C++. Classes are the foundation of object-oriented programming, allowing you to define your own data types with attributes and methods. We'll cover class definition, constructors, member functions, encapsulation, and their significance in creating organized and reusable code."} />

            <NormalText fontSize={true}  eng={"Introduction to Classes"} />
            <NormalText eng={"A class is a blueprint for creating objects. It defines attributes (data members) and behaviors (member functions) that the objects of the class can have."} />

            <NormalText fontSize={true}  eng={"Defining a Class"} />
            <NormalText eng={"To define a class, use the 'class' keyword followed by the class name. Inside the class, you define data members and member functions."} />
            <Code title="string" code={"class Rectangle {\npublic:\n    double length;\n    double width;\n\n    double calculateArea() {\n        return length * width;\n    }\n};"}/>

            <NormalText fontSize={true}  eng={"Creating Objects"} />
            <NormalText eng={"To create objects of a class, use the class name followed by parentheses."} />
            <Code title="string" code={"Rectangle rect1;\nrect1.length = 5.0;\nrect1.width = 3.0;"} />

            <NormalText fontSize={true}  eng={"Constructors"} />
            <NormalText eng={"Constructors are special member functions that are automatically called when an object is created. They initialize the object's data members."} />
            <Code title="string" code={"class Circle {\npublic:\n    double radius;\n\n    Circle(double r) {\n        radius = r;\n    }\n};"}/>

            <NormalText fontSize={true}  eng={"Member Functions"} />
            <NormalText eng={"Member functions are functions defined within a class. They can access and manipulate the class's data members."} />
            <Code title="string" code={"class BankAccount {\nprivate:\n    double balance;\n\npublic:\n    BankAccount() {\n        balance = 0.0;\n    }\n\n    void deposit(double amount) {\n        balance += amount;\n    }\n};"}/>

            <NormalText fontSize={true}  eng={"Encapsulation"} />
            <NormalText eng={"Encapsulation is the practice of restricting direct access to certain parts of a class, protecting data and ensuring controlled access."} />

            <NormalText fontSize={true}  eng={"Use Cases"} />
            <NormalText eng={"Classes allow you to create organized and reusable code by bundling data and behavior into a single unit. They're used for modeling real-world entities and implementing complex systems."} />

            <NormalText fontSize={true}  eng={"Conclusion"} />
            <NormalText eng={"Classes are the foundation of object-oriented programming. This chapter covered class definition, constructors, member functions, encapsulation, and their importance in creating organized and reusable code. By mastering classes, you can build sophisticated and maintainable software systems."} />

            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('HelloWorld')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Classes;
