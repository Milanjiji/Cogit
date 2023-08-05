import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';



const CClass = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [lang,setLang] = useState(true);  

    
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        const getLang = async() =>{
          const lang = JSON.parse(await AsyncStorage.getItem("C++Lang"));
          console.log("lang",lang);
          if(lang !== null){
              setLang(lang)
          }else{
              setLang(false);
              await AsyncStorage.setItem("C++Lang",JSON.stringify(false))
          }
        }
        getLang()
    },[]);
    const changeLanuage = async() =>{
      await AsyncStorage.setItem("C++Lang",JSON.stringify(!lang));
      setLang(!lang);
  }

    const Button = ({text,no,to}) =>{
        return(
            <TouchableOpacity onPress={()=>navigation.navigate(to)}  style={{backgroundColor:Colors.primary,borderRadius:10,marginHorizontal:10,padding: 10,marginVertical:3}} >
              <View style={{flexDirection:'row'}} >
                <FontAwesomeIcon icon={faAngleRight} color={Colors.text}  />
                <Text style={{color:Colors.white,fontFamily:'monospace'}} > {no} ;</Text>
              </View>
                <Text style={{color:Colors.white,fontFamily:'monospace'}} >{text} ;</Text>
            </TouchableOpacity>
        )
    }

  return (
    <View
      style={{backgroundColor:Colors.Background,flex: 1,}} >
          <Header navigation={navigation} title='C++' info=''  />    
          
        <ScrollView showsVerticalScrollIndicator={false} >

          <Button to="Instruction" text={"Instruction"} no={"01"} />
          <Button to="LearnC" text={"Intro"} no={"02"} />
          <Button to="HelloWorld" text={"Hello World"} no={"03"} />
          <Button to="Basics" text={"Basics (Symbols and Operators)"} no={"04"} />
          
          <Button to="Variables" text={"Data Types"} no={'05'} />
          <Button to="UserInput" text={"UserInput"} no={'06'} />
          <Button to="Operators" text={"Operators"} no={'07'} />
          <Button to="Strings" text={"Strings"} no={'08'} />
          <Button to="Math" text={"Math"} no={'09'} />
          <Button to="Booleans" text={"Booleans"} no={'10'} />
          <Button to="Conditions" text={"Conditions"} no={'11'} />
          <Button to="Switch" text={"Switch"} no={'12'} />
          <Button to="WhileLoop" text={"While Loop"} no={'13'} />
          <Button to="ForLoop" text={"For Loop"} no={'14'} />

          <TouchableOpacity onPress={changeLanuage}  style={{backgroundColor:Colors.primary,borderRadius:10,padding: 10,elevation:10,marginBottom:10,marginHorizontal:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >Switch Lang, Current : {lang ? 'Ma' : 'En'} </Text>
          </TouchableOpacity>
        </ScrollView>
        

    </View>
  );
};



export default CClass;
