import React  from "react";
import { View,Text } from "react-native";
import { useState,useEffect } from "react";
import { faVestPatches } from "@fortawesome/free-solid-svg-icons";
// import { err } from "react-native-svg/lib/typescript/xml";
// import notes from './Notes/Class10/notes.json'


const SampleFetch = () =>{

  const [mathsNote, setmathsNote] = useState([]);

  // useEffect(() => {
  //     fetch('https://firebasestorage.googleapis.com/v0/b/cogit-b87f0.appspot.com/o/mathsNote10.js?alt=media&token=df9275de-3a87-4074-995b-feb4b86f4d55')
  //       .then((response) => response.text())
  //       .then((data) => {
          
  //         console.log(data);;
  //       })
  //       .catch(error => console.error(error));
  // }, []);

  // if (mathsNote.length === 0) {
  //     return console.log('loading');;
  // }
  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const response = await fetch('./notes.json');
  //       const jsonData = await response.json();
  //       setmathsNote(jsonData);
  //       console.log(jsonData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   loadData();
  // }, []);

  // if (!mathsNote) {
  //   return console.log("loading ...");;
  // }
  // console.log(notes.chapter1.topic);  

  useEffect(()=>{
    const fetchItems = async () =>{
      try{
        const response = await fetch('https://firebasestorage.googleapis.com/v0/b/cogit-b87f0.appspot.com/o/mathsNotes.json?alt=media&token=680d9db9-f450-4fcd-b19d-54ff7009c09a');
        const data = await response.json();
        
        console.log(data);
      }catch(error){
        console.log(error);
      }
    }
    fetchItems()
  })
  

  return(
      <View>
          {/* {mathsNote.map((note,index)=>(
            <Text style={{color:'black'}} key={index}>{note.chapter1.title}</Text>
          ))} */}
      </View>
  )
}

export default SampleFetch;