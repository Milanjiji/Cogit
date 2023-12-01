import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Code from '../../components/Code';
// import CodeEditor from '../SampleCodeEditor';
import { storage } from '../../Storage';


const Instruction = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [lang,setLang] = useState(true);  

    
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        
    },[])
    

   
    
    const NormalText = ({eng,mal,bold,fontSize}) =>{
        return(
            <View style={{marginVertical:10}} >
                <Text style={{color:Colors.text,fontFamily:bold ? Colors.Bold: Colors.Medium,display:lang ? 'flex' :'none',fontSize : fontSize ? 22 : 14}} >{mal}</Text>
                <Text style={{color:Colors.text,fontFamily:bold ? Colors.Bold: Colors.Medium,display:!lang ? 'flex' :'none',fontSize : fontSize ? 22 : 14}} >{eng}</Text>
            </View>
        )
    }

    
    
    // <CodeEditor  />
  
  return (
    <View
      style={{backgroundColor:Colors.Background,flex: 1,}} >
          
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10,}} >
            
            <View>

            <NormalText fontSize={true} eng={"How to run the code in c++ code editor provided."} />
            <NormalText eng={"While learning you get examples of code like "} />
            <Code title="Hello world" code={"#include <iostream>\nusing namespace std;\n\nint main()\n{\ncout<<\"Hello World!\";\nreturn 0;\n}"}/>
            
            <NormalText eng={"now use the button on top right to copy the code and paste it in the code Editor"} />
            <NormalText eng={"Load Code Editor from the home (left side on the side bar)"} />
            
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('LearnC')} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default Instruction;
