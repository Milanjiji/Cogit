import React, { useEffect, useState } from "react";
import { View,Text, TouchableOpacity,TextInput, FlatList ,KeyboardAvoidingView} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCancel, faCheck, faPencil, faPlug, faTrash,} from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import { storage } from "../Storage";

const TaskManager = ({navigation}) =>{
    const [Colors,setColors] = useState([])
    const [editTitle,setEditTitle] = useState(false);
    const [newTitle,setNewTitle] = useState('');
    const [titles,setTitles] = useState([])
    const [task1,setTask1] = useState([]);
    const [task2,setTask2] = useState([]);
    const [task3,setTask3] = useState([]);
    const [task4,setTask4] = useState([]);
    const [task5,setTask5] = useState([]);
    const [task6,setTask6] = useState([]);
    const [task7,setTask7] = useState([]);
    const [task8,setTask8] = useState([]);
    const [taskPos,setTaskPos] = useState(0);

    const [addNewTask,setAddNewTask] = useState(false);
    const [newTask,setNewTask] = useState('');

    const [render,setRender] = useState(false)

    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        const getAllTasks = async () =>{
            const data1 = storage.getString('Task1')
            const data2 = storage.getString('Task2')
            const data3 = storage.getString('Task3')
            const data4 = storage.getString('Task4')
            const data5 = storage.getString('Task5')
            const data6 = storage.getString('Task6')
            const data7 = storage.getString('Task7')
            const data8 = storage.getString('Task8')
            if(data1!== null){
                const data = JSON.parse(data1);
                setTask1(data);
                console.log("data 1 is not null",data.length);
            }
            if(data2!== null){
                const data = JSON.parse(data2);
                setTask2(data);
                console.log("data 2 is not null",data);
            }
             if(data3!== null){
                const data = JSON.parse(data3);
                setTask3(data);
                console.log("data 3 is not null",data);
            }
             if(data4!== null){
                const data = JSON.parse(data4);
                setTask4(data);
                console.log("data 4 is not null",data);
            }
             if(data5!== null){
                const data = JSON.parse(data5);
                setTask5(data);
                console.log("data 5 is not null",data);
            }
             if(data6!== null){
                const data = JSON.parse(data6);
                setTask6(data);
                console.log("data 6 is not null",data);
            }
             if(data7!== null){
                const data = JSON.parse(data7);
                setTask7(data);
                console.log("data 7 is not null",data);
            }
             if(data8!== null){
                const data = JSON.parse(data8);
                setTask8(data);
                console.log("data 8 is not null",data);
            }
            if(!data1 && !data2 && !data3 &&!data4 &&!data5 &&!data6 &&!data1 &&!data7 &&!data8  ){
                console.log('first time user');
                
            }
        }
        getAllTasks();

        const getTitles = async () =>{
            const titles = JSON.parse(storage.getString('TaskTitles'));
                console.log(titles);
                if(titles !== null){
                    setTitles(titles);
                    console.log(titles);
                }else{
                    console.log("titles is empty");
                    var newTitle = ['Title','Title','Title','Title','Title','Title','Title','Title']
                    setTitles(newTitle)
                    try {
                        storage.set('TaskTitles',JSON.stringify(newTitle))
                    } catch (error) {
                        console.log(error);
                    }
                }
        }

        getTitles();
    },[])


    const updateTitle = async() => {
        if(editTitle){
            if(newTitle){
                if(taskPos == 0 && newTitle){
                    var newTitles = titles;
                    newTitles[0] = newTitle;
                    setTitles(newTitles);
                    console.log(newTitles);
                    storage.set('TaskTitles',JSON.stringify(newTitles))
                    setEditTitle(false);
                    console.log("newTitles adding");
                }else if(taskPos == 1 && newTitle){
                    var newTitles = titles;
                    newTitles[1] = newTitle;
                    setTitles(newTitles);
                    storage.set('TaskTitles',JSON.stringify(newTitles))
                    setEditTitle(false);
                }
                else if(taskPos == 2 && newTitle){
                    var newTitles = titles;
                    newTitles[2] = newTitle;
                    setTitles(newTitles);
                    storage.set('TaskTitles',JSON.stringify(newTitles))
                    setEditTitle(false);
                }
                else if(taskPos == 3 && newTitle){
                    var newTitles = titles;
                    newTitles[3] = newTitle;
                    setTitles(newTitles);
                    storage.set('TaskTitles',JSON.stringify(newTitles))
                    setEditTitle(false);
                }
                else if(taskPos == 4 && newTitle){
                    var newTitles = titles;
                    newTitles[4] = newTitle;
                    setTitles(newTitles);
                    storage.set('TaskTitles',JSON.stringify(newTitles))
                    setEditTitle(false);
                }
                else if(taskPos == 5 && newTitle){
                    var newTitles = titles;
                    newTitles[5] = newTitle;
                    setTitles(newTitles);
                    storage.set('TaskTitles',JSON.stringify(newTitles))
                    setEditTitle(false);
                }
                else if(taskPos == 6 && newTitle){
                    var newTitles = titles;
                    newTitles[6] = newTitle;
                    setTitles(newTitles);
                    storage.set('TaskTitles',JSON.stringify(newTitles))
                    setEditTitle(false);
                }
                else if(taskPos == 7 && newTitle){
                    var newTitles = titles;
                    newTitles[7] = newTitle;
                    setTitles(newTitles);
                    storage.set('TaskTitles',JSON.stringify(newTitles))
                    setEditTitle(false);
                }
            }else{
                setEditTitle(!editTitle)
            }
            
        }else{
            setEditTitle(!editTitle)
        }
        setNewTitle('')   
    }

    const TaskDone = async (id) =>{
        if(taskPos == 0){
            const updatedData = task1.map(item => {
                if (item.id === id) {
                  return { ...item, c: !item.c};
                }
                return item;
              });
            console.log(updatedData);
            setTask1(updatedData)
            try {
                storage.set('Task1',JSON.stringify(updatedData))
            } catch (error) {
                console.log(error);
            }
        }else if(taskPos == 1){
            const updatedData = task2.map(item => {
                if (item.id === id) {
                  return { ...item, c: !item.c};
                }
                return item;
              });
            console.log(updatedData);
            setTask2(updatedData)
            try {
                storage.set('Task2',JSON.stringify(updatedData))
            } catch (error) {
                console.log(error);
            }
        }else if(taskPos == 2){
            const updatedData = task3.map(item => {
                if (item.id === id) {
                  return { ...item, c: !item.c};
                }
                return item;
              });
            console.log(updatedData);
            setTask3(updatedData)
            try {
                storage.set('Task3',JSON.stringify(updatedData))
            } catch (error) {
                console.log(error);
            }
        }else if(taskPos == 3){
            const updatedData = task4.map(item => {
                if (item.id === id) {
                  return { ...item, c: !item.c};
                }
                return item;
              });
            console.log(updatedData);
            setTask4(updatedData)
            try {
                storage.set('Task4',JSON.stringify(updatedData))
            } catch (error) {
                console.log(error);
            }
        }else if(taskPos == 4){
            const updatedData = task5.map(item => {
                if (item.id === id) {
                  return { ...item, c: !item.c};
                }
                return item;
              });
            console.log(updatedData);
            setTask5(updatedData)
            try {
                storage.set('Task5',JSON.stringify(updatedData))
            } catch (error) {
                console.log(error);
            }
        }else if(taskPos == 5){
            const updatedData = task6.map(item => {
                if (item.id === id) {
                  return { ...item, c: !item.c};
                }
                return item;
              });
            console.log(updatedData);
            setTask6(updatedData)
            try {
                storage.set('Task6',JSON.stringify(updatedData))
            } catch (error) {
                console.log(error);
            }
        }else if(taskPos == 6){
            const updatedData = task7.map(item => {
                if (item.id === id) {
                  return { ...item, c: !item.c};
                }
                return item;
              });
            console.log(updatedData);
            setTask7(updatedData)
            try {
                storage.set('Task7',JSON.stringify(updatedData))
            } catch (error) {
                console.log(error);
            }
        }else if(taskPos == 7){
            const updatedData = task8.map(item => {
                if (item.id === id) {
                  return { ...item, c: !item.c};
                }
                return item;
              });
            console.log(updatedData);
            setTask8(updatedData)
            try {
                storage.set('Task8',JSON.stringify(updatedData))
            } catch (error) {
                console.log(error);
            }
        }
    }

    const addTasks = async () =>{
        console.log(taskPos);
        if (addNewTask) {
            if(newTask){
                if(taskPos == 0){
                    const id = Math.floor(Math.random() *100);
                    try {
                        const data = JSON.stringify([...task1,{id:id,task:newTask,c:true}])
                        setTask1([...task1,{id:id,task:newTask,c:true}]);
                        storage.set('Task1',data);
                        setAddNewTask(false);
                        setNewTask('');
                        console.log(data);

                    } catch (error) {
                        console.log(error);
                    }

                }else if(taskPos == 1){
                    const id = Math.floor(Math.random() *100);
                    try {
                        const data = JSON.stringify([...task2,{id:id,task:newTask,c:true}])
                        setTask2([...task2,{id:id,task:newTask,c:true}]);
                        storage.set('Task2',data);
                        setAddNewTask(false);
                        setNewTask('');
                        console.log(data);

                    } catch (error) {
                        console.log(error);
                    }

                }else if(taskPos == 2){
                    const id = Math.floor(Math.random() *100);
                    try {
                        const data = JSON.stringify([...task3,{id:id,task:newTask,c:true}])
                        setTask3([...task3,{id:id,task:newTask,c:true}]);
                        storage.set('Task3',data);
                        setAddNewTask(false);
                        setNewTask('');
                        console.log(data);

                    } catch (error) {
                        console.log(error);
                    }

                }else if(taskPos == 3){
                    const id = Math.floor(Math.random() *100);
                    try {
                        const data = JSON.stringify([...task4,{id:id,task:newTask,c:true}])
                        setTask4([...task4,{id:id,task:newTask,c:true}]);
                        storage.set('Task4',data);
                        setAddNewTask(false);
                        setNewTask('');
                        console.log(data);

                    } catch (error) {
                        console.log(error);
                    }

                }else if(taskPos == 4){
                    const id = Math.floor(Math.random() *100);
                    try {
                        const data = JSON.stringify([...task5,{id:id,task:newTask,c:true}])
                        setTask5([...task5,{id:id,task:newTask,c:true}]);
                        storage.set('Task5',data);
                        setAddNewTask(false);
                        setNewTask('');
                        console.log(data);

                    } catch (error) {
                        console.log(error);
                    }

                }else if(taskPos == 5){
                    const id = Math.floor(Math.random() *100);
                    try {
                        const data = JSON.stringify([...task6,{id:id,task:newTask,c:true}])
                        setTask6([...task6,{id:id,task:newTask,c:true}]);
                        storage.set('Task6',data);
                        setAddNewTask(false);
                        setNewTask('');
                        console.log(data,"from taskPos 6");

                    } catch (error) {
                        console.log(error);
                    }

                }else if(taskPos == 6){
                    const id = Math.floor(Math.random() *100);
                    try {
                        const data = JSON.stringify([...task7,{id:id,task:newTask,c:true}])
                        setTask7([...task7,{id:id,task:newTask,c:true}]);
                        storage.set('Task7',data);
                        setAddNewTask(false);
                        setNewTask('');
                        console.log(data);

                    } catch (error) {
                        console.log(error);
                    }

                }else if(taskPos == 7){
                    const id = Math.floor(Math.random() *100);
                    try {
                        const data = JSON.stringify([...task8,{id:id,task:newTask,c:true}])
                        setTask8([...task8,{id:id,task:newTask,c:true}]);
                        storage.set('Task8',data);
                        setAddNewTask(false);
                        setNewTask('');
                        console.log(data);

                    } catch (error) {
                        console.log(error);
                    }

                }
            }
        }else{
            setAddNewTask(true)
        }
        
    }

    const deleteTask = async(id) =>{
        if(taskPos == 0){
            const filteredData = task1.filter((item) => item.id != id);
            setTask1(filteredData)
            storage.set('Task1',JSON.stringify(filteredData))
            console.log(filteredData,"filteded array");
        }else if(taskPos == 1){
            const filteredData = task2.filter((item) => item.id != id);
            setTask2(filteredData)
            storage.set('Task2',JSON.stringify(filteredData))
            console.log(filteredData,"filteded array");
        }else if(taskPos == 2){
            const filteredData = task3.filter((item) => item.id != id);
            setTask3(filteredData)
            storage.set('Task3',JSON.stringify(filteredData))
            console.log(filteredData,"filteded array");
        }else if(taskPos == 3){
            const filteredData = task4.filter((item) => item.id != id);
            setTask4(filteredData)
            storage.set('Task4',JSON.stringify(filteredData))
            console.log(filteredData,"filteded array");
        }else if(taskPos == 4){
            const filteredData = task5.filter((item) => item.id != id);
            setTask5(filteredData)
            storage.set('Task5',JSON.stringify(filteredData))
            console.log(filteredData,"filteded array");
        }else if(taskPos == 5){
            const filteredData = task6.filter((item) => item.id != id);
            setTask6(filteredData)
            storage.set('Task6',JSON.stringify(filteredData))
            console.log(filteredData,"filteded array");
        }else if(taskPos == 6){
            const filteredData = task7.filter((item) => item.id != id);
            setTask7(filteredData)
            storage.set('Task7',JSON.stringify(filteredData))
            console.log(filteredData,"filteded array");
        }else if(taskPos == 7){
            const filteredData = task8.filter((item) => item.id != id);
            setTask8(filteredData)
            storage.set('Task8',JSON.stringify(filteredData))
            console.log(filteredData,"filteded array");
        }
    }
    const renderItem = ({item}) =>{
        return(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
                <View style={{flexDirection:'row',alignItems:'center',}} >
                    <TouchableOpacity onPress={()=>TaskDone(item.id)} style={{marginRight:10,marginVertical:5}} >
                        <FontAwesomeIcon color={Colors.text} icon={item.c ? faSquare : faCheck} />
                    </TouchableOpacity>
                    <Text style={{color:Colors.text,textDecorationLine:!item.c ? 'line-through' :'none'}} >{item.task}</Text>
                </View>
                <TouchableOpacity onPress={()=>deleteTask(item.id)} style={{display : !item.c ? 'flex' : 'none'}} >
                    <FontAwesomeIcon color={`${Colors.text}50`} icon={faTrash} />
                </TouchableOpacity>
            </View>
        )
    }


    const iconToggler = () =>{
        if(editTitle){
            if(newTitle){
                return faCheckSquare
            }else{
                return faCancel
            }
        }else{
            return faPencil
        }
    }

    return(
        <View style={{backgroundColor:Colors.Background,flex: 1}} >
            <Text style={{color:`${Colors.text}50`,fontFamily:Colors.Bold,fontSize:26,padding: 20,}} >Tracker</Text>
            <View style={{flex: 1,flexDirection:'row'}} >
                <View style={{width:50,borderColor:Colors.primary,borderRightWidth:1,alignItems:'center',paddingVertical:20}} >
                    <TouchableOpacity onPress={()=>setTaskPos(0)} style={{paddingVertical:5,paddingHorizontal:10}} >
                        <Text style={{color:taskPos == 0 ? Colors.text : `${Colors.text}50`}} >1</Text>
                    </TouchableOpacity  >
                    <TouchableOpacity onPress={()=>setTaskPos(1)} style={{paddingVertical:10,paddingHorizontal:10}} >
                        <Text style={{color:taskPos == 1 ? Colors.text : `${Colors.text}50`}} >2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setTaskPos(2)} style={{paddingVertical:10,paddingHorizontal:10}} >
                        <Text style={{color:taskPos == 2 ? Colors.text : `${Colors.text}50`}} >3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setTaskPos(3)} style={{paddingVertical:10,paddingHorizontal:10}} >
                        <Text style={{color:taskPos == 3 ? Colors.text : `${Colors.text}50`}} >4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setTaskPos(4)} style={{paddingVertical:10,paddingHorizontal:10}} >
                        <Text style={{color:taskPos == 4 ? Colors.text : `${Colors.text}50`}} >5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setTaskPos(5)} style={{paddingVertical:10,paddingHorizontal:10}} >
                        <Text style={{color:taskPos == 5 ? Colors.text : `${Colors.text}50`}} >6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setTaskPos(6)} style={{paddingVertical:10,paddingHorizontal:10}} >
                        <Text style={{color:taskPos == 6 ? Colors.text : `${Colors.text}50`}} >7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setTaskPos(7)} style={{paddingVertical:10,paddingHorizontal:10}} >
                        <Text style={{color:taskPos == 7 ? Colors.text : `${Colors.text}50`}} >8</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1,padding: 10,}} >
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
                        <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20,display:editTitle ? 'none' : 'flex'}} >{titles[taskPos] ? titles[taskPos] :"Create Title >"}</Text>
                        <TextInput 
                            style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:20,borderColor:Colors.secondary,borderBottomWidth:1,display:editTitle ? 'flex' : 'none',marginTop:-11,flex: 1,}}
                            placeholder={titles[taskPos]} 
                            value={newTitle}
                            onChangeText={setNewTitle}
                            placeholderTextColor={Colors.text}  />
                        <TouchableOpacity onPress={updateTitle} >
                            <FontAwesomeIcon color={editTitle ? Colors.text :`${Colors.text}50` } icon={iconToggler()} />
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingLeft : 20,paddingTop:20}} >

                    <FlatList
                        extraData={render}
                        data={taskPos === 0 ? task1 : taskPos === 1 ? task2 : taskPos === 2 ? task3 : taskPos === 3 ? task4 : taskPos === 4 ? task5 :taskPos === 5 ? task6 :taskPos === 6 ? task7 :taskPos === 7 ? task8 : []}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />

                    </View>
                    <KeyboardAvoidingView style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,alignSelf:'flex-end'}} >
                        <TextInput 
                            style={{display:addNewTask ? 'flex' :'none',flex: 1,borderColor:Colors.secondary,borderBottomWidth:1,paddingHorizontal:10,color:Colors.text,fontFamily:Colors.Medium}}
                            placeholder="Task"
                            value={newTask}
                            onChangeText={setNewTask}
                            placeholderTextColor={`${Colors.text}50`} />
                        <TouchableOpacity onPress={addTasks} style={{marginVertical:10,alignSelf:'flex-end',paddingLeft:10,paddingTop:13}} >
                            <FontAwesomeIcon color={Colors.text} icon={addNewTask ? faCheck : faPlug}   />
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                    
                </View>

            </View>
        </View>
    )
}
export default TaskManager;