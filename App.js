import React, { useState } from 'react';
import { View, Text, TextInput, Button,DrawerLayoutAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Screens from './components/Screens';

const App = () => {
  
  return (
   <Screens />
  );
}

export default App;
