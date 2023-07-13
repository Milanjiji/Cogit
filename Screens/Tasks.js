import React,{useEffect,useState} from "react";
import { View,Text, ScrollView, TouchableOpacity,TextInput, FlatList } from "react-native";
import Header from "../components/Header";
import HomePageFootor from "../components/HomePageFootor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification from 'react-native-push-notification';

let date = new Date();

const Tasks = ({navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [program,setProgram] = useState('');
    const [day,setDay] = useState()
    const [hour,setHour] = useState()
    const [min,setMin] = useState()
    const [scheduler,setScheduler] = useState(false);
    const [tasks,setTasks] = useState([]);
    const [btnContent,setBtnContent] = useState('Schedule your first task');
    const [error,setError] = useState(false);

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        
            setHour(JSON.stringify(date.getHours()));
            setDay(JSON.stringify(date.getDate()))
            setMin(JSON.stringify(date.getMinutes()));
        


        const getTasks = async () => {
            let Taskss = await AsyncStorage.getItem('Tasks');
          
            if(Taskss !== null){
                  
                const currentTime = new Date();
                let Task = JSON.parse(Taskss);

                const updatedTasks = Task.filter((task) => {
                    const taskTime = new Date();
                    taskTime.setDate(task.day);
                    taskTime.setHours(task.hour);
                    taskTime.setMinutes(task.min);

                    return taskTime > currentTime; 
              });
                setTasks(updatedTasks);
                setBtnContent('Schedule a task');
            }else{
                setBtnContent('Schedule your first task');
            }
            
        }
        
        
        getColors();
        getTasks();
        createChannel();
    },[])

    const createChannel = () => {

        PushNotification.createChannel({
            channelId : "TaskTracker",
            channelName: "TaskTracker"
        })
    }
    
      const openScheduler = () => {
        setScheduler(true);
        setBtnContent('Schedule this task');
      }

   const setTask = () =>{
    if(program && (min > date.getMinutes() || hour > date.getHours() || day > date.getDate())  && min < 61 && hour < 25 && day < 32){
        setError(false);
        date.setDate(day);
        date.setHours(hour);
        date.setMinutes(min);

        const id = Math.floor(Math.random() * 100000).toString();

        const updatedTasks = Array.isArray(tasks) ? [...tasks,{program:program,day:day,hour:hour,min:min,id:id}] : [{ program: program, day:day,hour:hour,min:min,id:id}];

        setTasks(updatedTasks);

        PushNotification.localNotificationSchedule({
            channelId: 'TaskTracker',
            title: 'Have you forget...',
            message: program, 
            date: date,
            allowWhileIdle: true,
            id:id 
          });

        try {
            AsyncStorage.setItem('Tasks',JSON.stringify(updatedTasks))
            date = new Date();
            setProgram('');
        } catch (error) {
            console.log(error);
        }
        
        
        
    }else{
        console.log('error');
        setError(true);
    }
        
      }   

      const DeleteTask = async(program,id) =>{
        const UpdatedTasks = tasks.filter((item) => item.program !== program);
        setTasks(UpdatedTasks);
        AsyncStorage.setItem('Tasks',JSON.stringify(UpdatedTasks));
        PushNotification.cancelLocalNotification(id);

      }

      const renderItem = ({item}) =>{
        const now = new Date();
        const ScheduleDate = new Date(now.getFullYear(), now.getMonth(), item.day, item.hour, item.min, 0);
        const timeDiff = ScheduleDate.getTime() - now.getTime();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        return(
            <TouchableOpacity onLongPress={()=> DeleteTask(item.program,item.id)}  style={{backgroundColor:Colors.primary,elevation:10,borderRadius:10,marginTop:10,padding: 8,}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Program : {item.program}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >At </Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >in {days} days</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >{hours} hours</Text>
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >{minutes+1} minute</Text>
                </View>    
            </TouchableOpacity>
        )
      }
    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background}} >
            <Header navigation={navigation} title='Tasks' info='' />
            <View showsVerticalScrollIndicator={false} style={{paddingHorizontal:8,flex: 1,}} >
                
               <Text style={{color:Colors.text,fontFamily:Colors.Bold,fontSize:26,marginTop:8}} >Schedule Everything for better performance</Text>

               <View style={{display:scheduler ? 'flex' : 'none'}} >
                    <TextInput onChangeText={setProgram} value={program}  style={{backgroundColor:Colors.primary,borderRadius:10,elevation:10,textAlign:'center',color:Colors.text,marginVertical:10}}  placeholder="Enter the Program" />

                    <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}} >
                        <View style={{flexDirection:'row',alignItems:'center'}} >
                            <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Day: </Text>
                            <TextInput value={day} onChangeText={setDay} style={{backgroundColor:Colors.primary,borderRadius:10,elevation:10,textAlign:'center',minWidth:50,color:Colors.text}}  placeholder="day" />
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center'}} >
                            <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Hour: </Text>
                            <TextInput value={hour} onChangeText={setHour} style={{backgroundColor:Colors.primary,borderRadius:10,elevation:10,textAlign:'center',minWidth:50,color:Colors.text}}  placeholder="day" />
                        </View>

                        <View style={{flexDirection:'row',alignItems:'center'}} >
                            <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Minute: </Text>
                            <TextInput value={min} onChangeText={setMin} style={{backgroundColor:Colors.primary,borderRadius:10,elevation:10,textAlign:'center',minWidth:50,color:Colors.text}}  placeholder="day" />
                        </View>
                    </View>
                </View>

                
                <Text style={{ display:scheduler ? 'flex' :'none',color:Colors.text,textAlign:'center',fontFamily:Colors.Medium,marginTop:5}} >Uses 24-hour format</Text>
                <Text style={{ display: error ? 'flex' : 'none',color:'red',textAlign:'center',fontFamily:Colors.Medium}} >Enter the program and change the time</Text>

               <TouchableOpacity onPress={scheduler ? setTask : openScheduler} style={{backgroundColor:Colors.primary,borderRadius:10,elevation:10,justifyContent:'center',alignItems:'center',marginTop:10}} >
                    <Text style={{color:Colors.text,paddingVertical:10}} >{btnContent}</Text>
               </TouchableOpacity>

               <View>
                  
                   <FlatList
                   data={tasks}
                   keyExtractor={(item,index) => index.toString()}
                   renderItem={renderItem}
                   />
               </View>
            </View>
            <HomePageFootor navigation={navigation} />
        </View>
    );
}
export default Tasks;