import React, { useEffect, useState } from "react";
import { View,Text, TouchableOpacity,TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlugCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-regular-svg-icons";

const TaskManager = ({navigation}) =>{
    const [Colors,setColors] = useState([])
    const [newTaskSetName,setNewTaskSetName] = useState('');
    const [newTaskSetId,setNewTaskSetId] = useState(0);
    const [addNewTaskSet,setAddNewTaskSet] = useState(false);
    const [allTasks,setAllTasks] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getAllTasks = async () =>{
            const data = await AsyncStorage.getItem('Tasks')
            const parsedData = JSON.parse(data)
            if(data!== null){
                setAllTasks(parsedData)
                setNewTaskSetId(parsedData.length)
                console.log(parsedData[0].subTasks[0]);

            }else{
                console.log("tasks is null");
                setNewTaskSetId(0)
            }
        }
        getAllTasks();
    },[])

    const addNewTasks = async () =>{
        if(newTaskSetName){
            await AsyncStorage.setItem('Tasks',JSON.stringify([...allTasks,{title:newTaskSetName,Id:newTaskSetId+1,subTasks:[{task:"nullTask",id:0}]}]))
            setNewTaskSetName('')
        }
    }
    return(
        <View style={{backgroundColor:Colors.Background,flex: 1,padding: 20,}} >
            <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:26}} >TaskManager</Text>
            <View style={{flex: 1,}} >
                
                <View style={{flexDirection:addNewTaskSet ? 'row' :'column',alignItems:addNewTaskSet ? 'center' :'flex-end',marginTop:10,display:addNewTaskSet ? 'flex' :'none',}} >
                    <TextInput value={newTaskSetName} onChangeText={setNewTaskSetName} style={{flex: 1,borderColor:Colors.secondary,borderBottomWidth:1,paddingHorizontal:10,color:Colors.text,fontFamily:Colors.Bold}} placeholder="Enter Task Name" placeholderTextColor={`${Colors.text}50`} />
                    <TouchableOpacity onPress={addNewTasks} >    
                        <FontAwesomeIcon  style={{alignSelf:'flex-end'}} color={Colors.secondary} icon={faPlugCirclePlus} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={()=>setAddNewTaskSet(!addNewTaskSet)} >
                <FontAwesomeIcon size={20} style={{alignSelf:'center'}} color={Colors.secondary} icon={faPlus} />
            </TouchableOpacity>
        </View>
    )
}
export default TaskManager;