import React, { useState,useRef,useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  
import axios from 'axios';  
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import HomePageFootor from '../components/HomePageFootor';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const OPENAI_API_KEY = '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';
const OPENAI_API_KEY = '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';

const primary = "#12156c"
const secondry = "#0e1158"




  
    
  


const Ai = ({navigation,route,...props}) =>{

  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [note,setNote] = useState(true);
  const [typing,doneTyping] = useState();
  const [singleRun,setSingleRun] = useState(false)
  const [Colors,setColors] = useState([]);
  const [ai,setAi] = useState('text-davinci-003');

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getAi = async() =>{
          const data = await AsyncStorage.getItem('Ai');
          const ai = JSON.parse(data);
          
          if(!ai){
            setAi('text-davinci-003');
          }else{
            setAi('text-davinci-002');
          }
        }
        getAi();
    },[])

    async function sendToOpenAI(input) {
      
      const response = await axios({
        method: 'post',
        url: `https://api.openai.com/v1/engines/text-davinci-002/completions`,
        // text-davince-003
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        data: {
          prompt: input,
          temperature : 0.7,
          max_tokens: 2048,
          n: 1,
          stop: ['\n']
        }
      });
      return response.data.choices[0].text;
    } 

  const handleInputSubmit = async () => {
    
    if(!inputValue){
      
    }else{
      setNote(false)
      const prompt = `The user said: ${inputValue}\nAi response:`;
      setChatHistory([...chatHistory, { author: 'user', message: inputValue }, { author: 'bot', message: '.....' }]);
      let output = '';
        while (!output) {
          output = await sendToOpenAI(prompt);
          doneTyping(true);
          console.log('retrying');
        }
        doneTyping(false)
      setChatHistory([...chatHistory, { author: 'user', message: inputValue }, { author: 'bot', message: output }]);
      setInputValue('');
    }
    
  }
  
    const scrollViewRef = useRef();
  
    const handleContentSizeChange = () => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    };
    if(inputValue === 'Can you explain the concept of quantum mechanics?' 
    || inputValue === 'Can you explain the concept of photosynthesis?'
    || inputValue === 'What are the three main types of rocks and how are they formed?'){
      if(singleRun === false){
        handleInputSubmit();
        setSingleRun(true)
      }
    }

    return(
        
          
          
            <View  style={[styles.background,{backgroundColor:Colors.Background}]} >
          
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} onContentSizeChange={handleContentSizeChange} style={{marginHorizontal:20,marginTop:20}} >
            <View style={[styles.note,{display : note == true ? 'flex' : 'none',backgroundColor:Colors.primary}]} >
              <Text style={[styles.noteText,{color:Colors.text,fontFamily:Colors.Medium}]} >
              This app has an AI-powered assistant that can help you with 
              a wide range of tasks using natural language processing. 
              It's always available to provide support and guidance, 
              and it's constantly learning and improving to better serve you.
              </Text>
              <Text style={[styles.noteText,{color:Colors.text,fontFamily:Colors.Medium}]} >
                Ask any question {"\n"}
                eg: * what is simple pendulam{"\n"}
                * What is the basic principle behind 
                the concept of atomic number and 
                how is it related to the electronic configuration of an atom?{"\n"}
                * Write the electronic configuration of the elements with atomic numbers
                 6, 13, and 17. Also, state the group and period to which these elements belong.
              </Text>
              <Text style={[styles.noteText,{color:Colors.text,fontFamily:Colors.Medium}]} >
                LIMITATIONS {"\n"}
                :- Limited context understanding{"\n"}
                :- Dependence on training data{"\n"}
                :- Lack of common sense{"\n"}
                :- Limited creativity{"\n"}
                :- Answers may be incomplete sometimes

              </Text>
              <Text style={[styles.noteText,{color:Colors.text,fontFamily:Colors.Medium}]} >
                Some Sample questions are given below. click one the below to ask. 
              </Text>

              <TouchableOpacity onPress={() =>{
                setInputValue('Can you explain the concept of quantum mechanics?')
              }} >
                <Text style={[styles.noteText,{
                  backgroundColor:Colors.secondary,
                  textAlign:'center',
                  borderRadius:10,
                  padding:10,
                  fontFamily:Colors.Medium,
                  color:Colors.text
                }]} >Can you explain the concept of quantum mechanics?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>{
                setInputValue('Can you explain the concept of photosynthesis?')
              }} >
                <Text style={[styles.noteText,{
                  backgroundColor:Colors.secondary,
                  textAlign:'center',
                  borderRadius:10,
                  padding:10,
                  fontFamily:Colors.Medium,
                  color:Colors.text
                }]} >Can you explain the concept of photosynthesis?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>{
                setInputValue('What are the three main types of rocks and how are they formed?')
              }} >
                <Text style={[styles.noteText,{
                  backgroundColor:Colors.secondary,
                  textAlign:'center',
                  borderRadius:10,
                  padding:10,
                  fontFamily:Colors.Medium,
                  color:Colors.text
                }]} >What are the three main types of rocks and how are they formed?</Text>
              </TouchableOpacity>
            </View>
            {chatHistory.map(({ author, message }, index) => (
                <Text style={[styles.text,{
                  backgroundColor:author === 'user' ? Colors.secondary : Colors.primary,
                  textAlign : author === 'user' ? 'right' : 'left', 
                  fontFamily:Colors.Medium,
                  color:Colors.text
                }]} key={index}>{message}</Text>
            ))}
          </ScrollView>
          <Text style={[styles.typing,{fontFamily:Colors.Medium,color:Colors.text}]} >{typing == true ? 'Ai is typing...' : 'Ai is Online'}</Text>
    
          <View style={[styles.input,{backgroundColor:Colors.primary}]} >
              <TextInput style={[styles.textInput,{fontFamily:Colors.Medium,color:Colors.text}]} 
              value={inputValue} 
              onChangeText={setInputValue} 
              onSubmitEditing={handleInputSubmit}
              placeholder={'Ask your questions here'} />
              <TouchableOpacity onPress={handleInputSubmit} >
                <FontAwesomeIcon style={styles.iconPlane} color={Colors.text} size={30} icon={faPaperPlane} />
              </TouchableOpacity>

          </View>
          <HomePageFootor navigation={navigation} />
        </View>
        
    );
}
const styles = StyleSheet.create({
    background:{
        marginTop:0,
        flex:1
    },
    label:{
      marginLeft:30,
      marginTop:20,
      fontSize:14,
    },
    text:{
      marginVertical:5,
      padding:10,
      paddingHorizontal:20,
      borderRadius:10
    },
    textInput:{
      paddingHorizontal:20,
      flex:1
    },
    input:{
      marginHorizontal:20,
      borderRadius:10,
      marginBottom:10,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    iconPlane:{
      margin:10
    },
    typing:{
      color:'#36477c',
      textAlign:'right',
      marginHorizontal:30
    },
    note:{
      marginVertical:0,
      borderRadius:10,
      padding:10,
      
    },
    i:{
      textAlign:'right',
      fontSize:20,
      marginRight:20,
      marginTop:10,
      marginBottom:-20
    },
    noteText:{
      marginVertical:5,
    },
    iconArrow:{
      textAlign:'center',
      marginHorizontal:3,
      borderRadius:10,
      marginTop:15
    },
    

})
export default Ai;

