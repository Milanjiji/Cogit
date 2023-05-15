import React, { useState,useRef } from 'react';
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

const OPENAI_API_KEY = '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';

const primary = "#12156c"
const secondry = "#0e1158"


const black = "black"
const white = "white"
const Regular = 'Roboto-Regular';


async function sendToOpenAI(input) {

    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/engines/text-davinci-003/completions',
      // text-davince-003
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      data: {
        prompt: input,
        temperature : 0.5,
        max_tokens: 2048,
        n: 1,
        stop: ['\n']
      }
    });
    return response.data.choices[0].text;
  } 
  
    
  


const Ai = ({navigation,route,...props}) =>{

  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [note,setNote] = useState(true);
  const [typing,doneTyping] = useState();
  const [singleRun,setSingleRun] = useState(false)
  

  const handleInputSubmit = async () => {
    
    if(!inputValue){
      
    }else{
      setNote(false)
      const prompt = `The user said: ${inputValue}\nAi response:`;
      setChatHistory([...chatHistory, { author: 'user', message: inputValue }, { author: 'bot', message: '.....' }]);
      let output = '';
        while (!output) {
          output = await sendToOpenAI(prompt);
          doneTyping(true)
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
        
          
          
            <View  style={styles.background} >
          
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} onContentSizeChange={handleContentSizeChange} style={{marginHorizontal:20,marginTop:20}} >
            <View style={[styles.note,{display : note == true ? 'flex' : 'none'}]} >
              <Text style={styles.noteText} >
              This app has an AI-powered assistant that can help you with 
              a wide range of tasks using natural language processing. 
              It's always available to provide support and guidance, 
              and it's constantly learning and improving to better serve you.
              </Text>
              <Text style={styles.noteText} >
                Ask any question {"\n"}
                eg: * what is simple pendulam{"\n"}
                * What is the basic principle behind 
                the concept of atomic number and 
                how is it related to the electronic configuration of an atom?{"\n"}
                * Write the electronic configuration of the elements with atomic numbers
                 6, 13, and 17. Also, state the group and period to which these elements belong.
              </Text>
              <Text style={styles.noteText} >
                LIMITATIONS {"\n"}
                :- Limited context understanding{"\n"}
                :- Dependence on training data{"\n"}
                :- Lack of common sense{"\n"}
                :- Limited creativity{"\n"}
                :- Answers may be incomplete sometimes

              </Text>
              <Text style={styles.noteText} >
                Some Sample questions are given below. click one the below to ask. 
              </Text>

              <TouchableOpacity onPress={() =>{
                setInputValue('Can you explain the concept of quantum mechanics?')
              }} >
                <Text style={[styles.noteText,{
                  backgroundColor:primary,
                  textAlign:'center',
                  borderRadius:10,
                  padding:10
                }]} >Can you explain the concept of quantum mechanics?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>{
                setInputValue('Can you explain the concept of photosynthesis?')
              }} >
                <Text style={[styles.noteText,{
                  backgroundColor:primary,
                  textAlign:'center',
                  borderRadius:10,
                  padding:10
                }]} >Can you explain the concept of photosynthesis?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>{
                setInputValue('What are the three main types of rocks and how are they formed?')
              }} >
                <Text style={[styles.noteText,{
                  backgroundColor:primary,
                  textAlign:'center',
                  borderRadius:10,
                  padding:10
                }]} >What are the three main types of rocks and how are they formed?</Text>
              </TouchableOpacity>
            </View>
            {chatHistory.map(({ author, message }, index) => (
                <Text style={[styles.text,{
                  backgroundColor:author === 'user' ? secondry : primary,
                  textAlign : author === 'user' ? 'right' : 'left', 
                }]} key={index}>{message}</Text>
            ))}
          </ScrollView>
          <Text style={styles.typing} >{typing == true ? 'Ai is typing...' : 'Ai is Online'}</Text>
    
          <View style={styles.input} >
              <TextInput style={styles.textInput} 
              value={inputValue} 
              onChangeText={setInputValue} 
              onSubmitEditing={handleInputSubmit}
              placeholder={'Ask your questions here'} />
              <TouchableOpacity onPress={handleInputSubmit} >
                <FontAwesomeIcon style={styles.iconPlane} color={white} size={30} icon={faPaperPlane} />
              </TouchableOpacity>

          </View>
          <HomePageFootor navigation={navigation} />
        </View>
        
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:primary,
        marginTop:0,
        flex:1
    },
    label:{
      color:white,
      marginLeft:30,
      marginTop:20,
      fontSize:14,
      fontFamily:Regular
    },
    text:{
      color:white,
      marginVertical:5,
      padding:10,
      paddingHorizontal:20,
      borderRadius:10
    },
    textInput:{
      color:white,
      paddingHorizontal:20,
      flex:1
    },
    input:{
      backgroundColor:secondry,
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
      backgroundColor:secondry,
      marginVertical:0,
      borderRadius:10,
      padding:10,
      
    },
    i:{
      color:white,
      textAlign:'right',
      fontSize:20,
      marginRight:20,
      marginTop:10,
      marginBottom:-20
    },
    noteText:{
      marginVertical:5,
      color:white
    },
    iconArrow:{
      backgroundColor:white,
      textAlign:'center',
      marginHorizontal:3,
      borderRadius:10,
      marginTop:15
    },
    

})
export default Ai;

// Sure! Here are the limitations of AI-powered assistants summarized in single line sentences:

//     Context: May not understand the full context of a question.
//     Bias: May be influenced by biases in training data or question framing.
//     Language limitations: Understanding and generation of text may be affected by complexities of different languages.
//     Uncertainty: May not always provide a definitive or accurate response.
//     Ethical concerns: Potential ethical issues around use for generating misleading, harmful, or unethical content.

// Sure! Here are some features of AI-powered assistants summarized in single line sentences:

//     24/7 availability: Can provide support and assistance around the clock.
//     Personalization: Can provide tailored responses based on user input.
//     Efficiency: Can respond to multiple queries simultaneously.
//     Learning and adaptation: Can learn from user interactions and adapt to provide better responses.
//     Integration: Can be integrated into various platforms and systems to provide seamless support.