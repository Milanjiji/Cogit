import React,{useState,useEffect,useCallback} from "react";
import { View,Text, TouchableOpacity, StyleSheet,FlatList, ScrollView, TextInput } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { storage } from "../../Storage";


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
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        
    
    },[])


    const onStateChange = useCallback((state) => {    
        if (state === "ended") {
            setPlaying(false);         
        }  
    }, []);

    
    
    
    return(
        <View style={{flex: 1,backgroundColor:Colors.Background,justifyContent:'space-around'}} >
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