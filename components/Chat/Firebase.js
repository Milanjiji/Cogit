import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export { firebase };