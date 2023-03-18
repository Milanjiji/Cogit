import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import axios from 'axios';

const OPENAI_API_KEY = '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';

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
      max_tokens: 150,
      n: 1,
      stop: ['\n']
    }
  });

  return response.data.choices[0].text;
}

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputSubmit = async () => {
    // Send user input to OpenAI API and add response to chat history
    const prompt = `The user said: ${inputValue}\nAI response:`;
    let output = '';
  while (!output) {
    output = await sendToOpenAI(prompt);
  }
    setChatHistory([...chatHistory, { author: 'user', message: inputValue }, { author: 'bot', message: output }]);
    setInputValue('');
  }

  return (
    <View>
      <Text>Chat with the OpenAI chatbot:</Text>
      {chatHistory.map(({ author, message }, index) => (
        <Text style={{color:'black'}} key={index}>{author}: {message}</Text>
      ))}
      <TextInput value={inputValue} onChangeText={setInputValue} onSubmitEditing={handleInputSubmit} />
    </View>
  );
}

export default App;
