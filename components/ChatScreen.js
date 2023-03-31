import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";



const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const firebaseConfig = {

    apiKey: "AIzaSyDhsPtvKQnVm9n880VB3ew6Dvi5D_y1mlc",
  
    authDomain: "mathsforum-2df38.firebaseapp.com",
  
    databaseURL: "https://mathsforum-2df38-default-rtdb.firebaseio.com",
  
    projectId: "mathsforum-2df38",
  
    storageBucket: "mathsforum-2df38.appspot.com",
  
    messagingSenderId: "123700605514",
  
    appId: "1:123700605514:web:ee5ac33724ae904450acb3",
  
    measurementId: "G-29QRYVQHZG"
  
  };
  
  const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
  useEffect(() => {
    // Listen for messages in Firestore
    const unsubscribe = firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = [];
        querySnapshot.forEach(documentSnapshot => {
          messages.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setMessages(messages);
      });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    // Add new message to Firestore
    await firestore().collection('messages').add({
      text,
      createdAt: new Date().getTime(),
      uid: auth().currentUser.uid,
    });

    setText('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.message}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageMeta}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <FlatList
        inverted
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Type your message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 8,
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#ccc',
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageText: {
    fontSize: 16,
  },
  messageMeta: {
    fontSize: 12,
    color: '#999',
  },
});

export default ChatScreen;
