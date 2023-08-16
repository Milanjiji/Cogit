import React,{useState,useEffect,useCallback} from "react";
import { View,Text, TouchableOpacity, StyleSheet,FlatList, ScrollView, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import HomePageFootor from "../../components/HomePageFootor";
import YoutubePlayer from "react-native-youtube-iframe";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";


const VideoClass = ({route,navigation}) =>{
    const [Colors,setColors] = useState([]);
    const [playing,setPlaying] = useState(false);
    const {note,sub} = route.params;
    
    const [title,setTitle] = useState(`${sub} ${note.chapter}`);
    const [editTitle,setEditTitle] = useState(false);
    const [allNotes,setAllNotes] = useState([]);
    const [thisNote,setThisNote] = useState([])

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        // const filterThisNote = (notes) =>{

        //     const filtered = notes.filter((item) => item.title ==  `${sub} ${note.chapter}`)

        //     // console.log(filtered);

        //     if(filtered.title === `${sub} ${note.chapter}`){
        //         setThisNote(filtered)
        //         console.log('there is the note');
        //     }else{
        //         console.log('there is no note');
        //         const random = Math.floor(Math.random() * 100);
        //         const not = [...notes,{id:random,title:`${sub} ${note.chapter}`}]
        //         AsyncStorage.setItem('Note_Classification',JSON.stringify(not));
        //         setAllNotes([{id:random,title:`${sub} ${note.chapter}`}]);
        //         console.log(not);
        //         setThisNote([{id:random,title:`${sub} ${note.chapter}`}])
        //     }
        // }
        const fetchNote = async() =>{
            const fetchedTitles = JSON.parse(await AsyncStorage.getItem('Note_Classification'));
            // console.log(fetchedTitles);
            if(fetchedTitles){
                setAllNotes(fetchedTitles);
                console.log(fetchedTitles);
                // filterThisNote(fetchedTitles);
            }else{
                const random = Math.floor(Math.random() * 100);
                const notes = [{id:random,title:`${sub} ${note.chapter}`}]
                AsyncStorage.setItem('Note_Classification',JSON.stringify(notes));
                setAllNotes(notes);
                console.log(notes);
            }
        }
        fetchNote();
    
    },[])


    const onStateChange = useCallback((state) => {    
        if (state === "ended") {
            setPlaying(false);         
        }  
    }, []);

    const changeTitle = async() => {
        
        try {
            
        } catch (error) {
            
        }
    }
    const setNotes = async() =>{
        

    }
    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
            <Header navigation={navigation}  title="Maths" info=""/>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1,marginTop:10}} >
               
                
                <View>

                </View>
                <YoutubePlayer        
                    height={250}
                    play={playing}        
                    videoId={"Dq5tsPKIDCI"}        
                    onChangeState={onStateChange}      />

                <View style={{backgroundColor:Colors.primary,borderRadius:10,elevation:10,margin:8}} >
                    <View style={{backgroundColor:Colors.secondary,borderTopLeftRadius:10,borderTopRightRadius:10,flexDirection:'row',alignItems:'center',height:40,justifyContent:'space-between',paddingHorizontal:16}} >
                        <Text style={{display:!editTitle ? 'flex' : 'none',color:Colors.text,fontFamily:Colors.Bold}} >{title}</Text>
                        <TextInput value={title} onChangeText={setTitle}  style={{display:editTitle ? 'flex' : 'none',color:Colors.text,fontFamily:Colors.Bold}} placeholder="Edit Title"  />
                        <TouchableOpacity onPress={()=> setEditTitle(!editTitle)} >
                            <FontAwesomeIcon color={Colors.text} icon={!editTitle ?  faEdit : faCheck} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextInput  placeholder="Hello world" />
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    btn:{
        margin:3,
        borderRadius:10,
        elevation:10,
        marginTop:3,
        padding: 10,
    }
})

export default VideoClass;