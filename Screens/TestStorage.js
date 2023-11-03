import React, { useEffect, useState } from "react";
import { View,Text, Button } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../Storage";

const Test = () =>{

    const [test,setTest] = useState('')
    useEffect(()=>{
        const get = async () =>{
            const name = JSON.parse(await AsyncStorage.getItem('userName'))
            console.log(name);
        }
        get();

        
    },[])

    const mmkvset = async () =>{
        storage.set('Key','the test item')
    }

    const getMMKV = async () =>{
       setTest(storage.getString('Key'));
       console.log(storage.getString('Key'));
    }
    
    return(
        <View>
            <Text style={{}} >{test}</Text>
            <Button title="setmmkv" onPress={mmkvset} />
            <Button title="get" onPress={getMMKV} />

        </View>
    )
}

export default Test;