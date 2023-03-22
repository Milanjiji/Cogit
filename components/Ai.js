import React, { useState,useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
    Touchable
  } from 'react-native';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import axios from 'axios';
  import Notes from './Notes';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
  import { faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';

const OPENAI_API_KEY = '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';

const primary = "#12156c"
const secondry = "#0e1158"


const black = "black"
const white = "white"

const Regular = 'Roboto-Regular';
const BoldItalic = 'Montserrat-BoldItalic';
const ExtraBold = 'Montserrat-ExtraBold';
const ExtraBoldItalic = 'Montserrat-ExtraBoldItalic';
const Medium = 'Montserrat-Medium';
const MediumItalic = 'Montserrat-MediumItalic';

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

const Ai = ({navigation,route}) =>{

  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [note,setNote] = useState(true);
  const [typing,doneTyping] = useState();
  const [height,setHeight] = useState('50%');

  const handleInputSubmit = async () => {
    setNote(false)
    setHeight('85%')
    const prompt = `The user said: ${inputValue}\nAI response:`;
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
  
    const scrollViewRef = useRef();
  
    const handleContentSizeChange = () => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    };
  
    

    return(
        
          
          <View  style={[styles.background,{height:height}]} >
          
          <ScrollView ref={scrollViewRef} onContentSizeChange={handleContentSizeChange} style={{marginHorizontal:20,marginTop:20}} >
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
              onSubmitEditing={handleInputSubmit} />
              <TouchableOpacity onPress={() =>{
                if(height === '50%' || height === '85%'){
                  setHeight('16%');
                }else{
                  setHeight('85%')
                }
              }} >
                <Text style={styles.iconArrow} >{height === '0%' ? <FontAwesomeIcon icon={faArrowAltCircleDown} /> : <FontAwesomeIcon icon={faArrowAltCircleUp} />}</Text>
              </TouchableOpacity>
          </View>
          
          
        </View>
          
        
          
       
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:primary,
        margin:3,
        marginTop:0,
        borderRadius:10
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
      backgroundColor:secondry,
      marginHorizontal:20,
      paddingHorizontal:20,
      borderRadius:10,
      // marginBottom:-40
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
      marginTop:5
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