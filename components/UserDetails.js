import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faPencil, faPhone} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import firestore from '@react-native-firebase/firestore';
import RenderPosts from './RenderPosts';
import RenderArticle from './RenderArticles';
import { storage } from '../Storage';



const UserDetails = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [clas,setClass] = useState('');
  const [timesOfRetry,setTimesOfRetry] = useState(0);
  const [timesOfArticleRetry,setTimesOfArticleRetry] = useState(0);
  const [data,setData] = useState([]);
  const [postCount,setPostCount] = useState(0);
  const [articles,setArticles] = useState([]);
  const [articleCount,setArticleCount] = useState(0);
  const [posChange,setPosChange] = useState(false);
    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getDetails = async() =>{
            const Name = JSON.parse(storage.getString('userName'));
            setName(Name);
            console.log(Name);
            const Phone = JSON.parse(storage.getString('phone'));
            setPhone(Phone);
            const Clas = JSON.parse(storage.getString('class'));
            setClass(Clas);
        }
        getDetails();

    },[])
   
    const getPosts = async () =>{
      console.log("trying to get the posts",name);
      try {
        const querySnapshot = await firestore()
          .collection('Skills')
          .where('userName', '==', name)
          .get();
        const documentsInRange = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          documentsInRange.push({
            Id: doc.id,
            ...data,
          });
        });
        console.log(documentsInRange)
        setData(documentsInRange);
        setTimesOfRetry(timesOfRetry+1);
        if(documentsInRange  == 0){
          setPostCount(0);
        }else{
          setPostCount(documentsInRange.length)
        }
      } catch (error) {
        console.error('Error fetching documents in range:', error);
      }
    }
    const getArticles = async () =>{
      console.log("trying to get the articles",name);
      try {
        const querySnapshot = await firestore()
          .collection('Community')
          .where('name', '==', name)
          .get();
        const documentsInRange = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          documentsInRange.push({
            Id: doc.id,
            ...data,
          });
        });
        console.log(documentsInRange,"articles")
        setArticles(documentsInRange);
        setTimesOfArticleRetry(timesOfArticleRetry+1);
        if(documentsInRange == 0){
          setArticleCount(0);
        }else{
          setArticleCount(documentsInRange.length)
        }
      } catch (error) {
        console.error('Error fetching documents in range:', error);
      }
    }

    if(timesOfRetry < 2){
      getPosts();
      getArticles();
    }

    const changePos = (pos) =>{
      if(pos == 1){
        storage.set('class',"10")
        setClass("10")
      }else if(pos == 2){
        storage.set('class',"+1")
        setClass("+1")
      }else if(pos == 3){
        storage.set('class',"+2")
        setClass("+2")
      }else if(pos == 4){
        storage.set('class',"tr")
        setClass("tr")
      }else if(pos == 5){
        storage.set('class',"nStd")
        setClass("nStd")
      }
      console.log("pos successfully changed");
      setPosChange(!posChange)
    }
    
  return (
    <View
      style={[styles.background,{borderRadius:10,backgroundColor:'#ffffff25'}]} >
        <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginVertical:10,fontSize:20}} >hello {name} </Text>
        <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Account Info</Text>
        <View style={{marginLeft:10,marginVertical:10}} >
            <View style={{flexDirection:'row',alignItems:'center'}} >
                <FontAwesomeIcon size={14}  icon={faPhone} color={Colors.text}  />
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >{phone}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
              <View style={{flexDirection:'row',alignItems:'center'}} >
                <FontAwesomeIcon size={14}  icon={faUser} color={Colors.text}  />
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginLeft:10}} >{clas}</Text>
              </View>
              <TouchableOpacity onPress={()=>setPosChange(!posChange)} style={{marginRight:10}} >
                <FontAwesomeIcon size={14} icon={faPencil} color={`${Colors.text}50`} />
              </TouchableOpacity>
            </View>
            <View style={{marginTop:5,display:posChange?'flex':'none'}} >
              <View style={{flexDirection:'row',marginTop:5,justifyContent:'space-between'}} >
                <TouchableOpacity onPress={()=>changePos(1)} style={{backgroundColor:Colors.secondary,paddingHorizontal:20,paddingVertical:5,borderRadius:5}} >
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >10</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>changePos(2)} style={{backgroundColor:Colors.secondary,paddingHorizontal:20,paddingVertical:5,borderRadius:5}} >
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >+1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>changePos(3)} style={{backgroundColor:Colors.secondary,paddingHorizontal:20,paddingVertical:5,borderRadius:5}} >
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >+2</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>changePos(4)} style={{backgroundColor:Colors.secondary,paddingHorizontal:20,paddingVertical:5,borderRadius:5}} >
                  <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Teacher</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={()=>changePos(5)} style={{backgroundColor:Colors.secondary,paddingHorizontal:20,paddingVertical:5,borderRadius:5,marginTop:5}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Not a teacher Nor a student</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={{marginHorizontal:5,marginVertical:10}} >
          <Text style={{color:Colors.text,fontFamily:Colors.Medium,marginBottom:10}} >Posts ({postCount+articleCount})</Text>

          <FlatList
          data={data}
          keyExtractor={item => item.title}
          renderItem={ (i) => <RenderPosts item={i} />}
          />
          <FlatList
          data={articles}
          keyExtractor={item => item.title}
          renderItem={ (i) => <RenderArticle item={i} />}
          />

          
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background:{
    flex:1,
    padding: 10,
    marginHorizontal:5
  },
});

export default UserDetails;
