import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput
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
      url: 'https://api.openai.com/v1/engines/text-davinci-002/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      data: {
        prompt: input,
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
  const [typing,doneTyping] = useState()

  const handleInputSubmit = async () => {
    setNote(false)
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
    

    return(
        <View  style={styles.background} >
         
          <ScrollView style={{marginHorizontal:30,marginTop:20}} >
            <Text style={[styles.note,{display : note == true ? 'flex' : 'none'}]} >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos laborum corrupti, dolorem nobis odit aliquam aspernatur, cumque laboriosam fuga numquam fugiat maiores repellat! Debitis facere velit dolore itaque aliquam officiis.
            </Text>
            {chatHistory.map(({ author, message }, index) => (
                <Text style={[styles.text,{
                  backgroundColor:author === 'user' ? secondry : primary
                }]} key={index}>{author}: {message}</Text>
            ))}

            
    </ScrollView>
    <Text style={styles.typing} >{typing == true ? 'Ai is typing...' : 'Ai is Online'}</Text>
    <TextInput style={styles.textInput} value={inputValue} onChangeText={setInputValue} onSubmitEditing={handleInputSubmit} />
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:primary,
        height:'40%'
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
      padding:10
    },
    textInput:{
      color:white,
      backgroundColor:secondry,
      marginHorizontal:30,
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

})
export default Ai;