import React, { useState } from "react";
import {View,Text,StyleSheet, TextInput,Button} from 'react-native'
import {signInWithEmailAndPassword} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';



GoogleSignin.configure({
    webClientId: '240319096891-4smcb9sako8gf11au70frbh3j1059skf.apps.googleusercontent.com',
  });


const Login = ({navigation,route,...props}) =>{

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const onHandleLogin = () =>{
        if(email !== "" && password !== ""){
            signInWithEmailAndPassword(auth,email,password)
                .then(()=>console.log('login Success'))
                .catch((err) => console.log("login Erroor from catch",err))
        }
    }
    // const handleGoogleSignIn = async () => {
    //     try {
    //       // Sign in with Google
    //       const { idToken } = await GoogleSignin.signIn();
    
    //       // Create a Firebase credential with the Google ID token
    //       const credential = auth.GoogleAuthProvider.credential(idToken);
    
    //       // Sign in to Firebase with the credential
    //       await auth().signInWithCredential(credential);
    //     } catch (error) {
    //       console.error(error);
    //     }
    // }
    return(
        <View style={{backgroundColor:'red'}} >
            <Text style={{color:'black',textAlign:'center',fontSize:30}} >Login</Text>
            <TextInput 
            placeholder="Email" 
            autoCapitalize="none"
            style={{color:'black',borderBottomColor:'black', borderBottomWidth:2}}
            onChangeText={(text)=>{setEmail(text)}}  
            keyboardType='email-address'  />
            <TextInput 
            placeholder="Password" 
            autoCapitalize="none"
            style={{color:'black',borderBottomColor:'black', borderBottomWidth:2}}
            onChangeText={(text)=>{setPassword(text)}}  
            keyboardType='visible-password'  />
            {/* <GoogleSigninButton onPress={handleGoogleSignIn} /> */}
            <Button  onPress={onHandleLogin} title="login" />
        </View>
    );

}

export default Login;