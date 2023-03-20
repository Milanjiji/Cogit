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
    TouchableOpacity
  } from 'react-native';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import axios from 'axios';


const OPENAI_API_KEY = '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';

const primary = "#04103a"
const secondry = "#283459"


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
        max_tokens: 4000,
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
  const [height,setHeight] = useState('40%');

  const handleInputSubmit = async () => {
    setNote(false)
    setHeight('80%')
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
        <View  style={[styles.background,{
          height:height
        }]} >
          <TouchableOpacity >
            <Text style={styles.i} >i</Text>
          </TouchableOpacity>
          <ScrollView ref={scrollViewRef} onContentSizeChange={handleContentSizeChange} style={{marginHorizontal:20,marginTop:20}} >
            <View style={[styles.note,{display : note == true ? 'flex' : 'none'}]} >
              
            </View>
            {chatHistory.map(({ author, message }, index) => (
                <Text style={[styles.text,{
                  backgroundColor:author === 'user' ? secondry : primary,
                  textAlign : author === 'user' ? 'right' : 'left', 
                }]} key={index}>{message}</Text>
            ))}
    </ScrollView>
    <Text style={styles.typing} >{typing == true ? 'Ai is typing...' : 'Ai is Online'}</Text>
    
      <TextInput style={styles.textInput} 
      value={inputValue} 
      onChangeText={setInputValue} 
      onSubmitEditing={handleInputSubmit} />
      
    </View>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:primary,
        
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
      marginBottom:-20
    },
    typing:{
      color:'#36477c',
      textAlign:'right',
      marginHorizontal:30
    },
    note:{
      backgroundColor:secondry,
      marginVertical:40,
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

})
export default Ai;