import React, { useState,useEffect } from 'react'
import { Text, View,StyleSheet, ScrollView, TouchableOpacity, TextInput,Dimensions, FlatList, Touchable } from 'react-native';
import Header from '../components/Header';
import HomePageFootor from '../components/HomePageFootor';
import Colors from '../colors.json';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const Note_Classification = ({navigation}) =>{
    const [noteTitle,setNoteTitle] = useState([])
    const [title,setTitle] = useState('')
    const [displayAddButton,setDisplayAddButton] = useState(false)
    const [errorDisplay,setErrorDisplay] = useState(false);
    const [emptyList,setEmptyList] = useState(false);
    const width = Dimensions.get('window').width;

    useEffect(()=>{
        const fetchNote = async() =>{
            const fetchedNotesTitle = JSON.parse(await AsyncStorage.getItem('Note_Classification'))
            if(fetchedNotesTitle) {
                setNoteTitle(fetchedNotesTitle);
                setEmptyList(false);
            }else{
                setEmptyList(true);
            }
        };
        fetchNote();
    },[])

    
    const titleAdder = () =>{
        const setNotes = async(data) =>{
            const stringified = JSON.stringify(data);
            AsyncStorage.setItem('Note_Classification',stringified);
        }
        if(title){
            const random = Math.floor(Math.random() * 100)
            const data = [...noteTitle,{title:title,id:random}]
            setNoteTitle(data);
            setNotes(data);
            setErrorDisplay(false);
            setDisplayAddButton(false);
            openNote({id:random});
        }else{
            setErrorDisplay(true)
        }

    }
    
   
    const openNote = ({id}) =>{
        const ID = String(id)
        navigation.navigate('NoteCreator',{id:ID})
    }

    const Renderitem = ({item}) =>{
        return(
            <TouchableOpacity  style={styles.data}  onPress={()=>openNote({id:item.id})} >
                <Text style={styles.dataText}>{item.title}</Text>
            </TouchableOpacity>
        )
    } 
    return (
      <SafeAreaView style={styles.body} >
        <Header title={"Notes"} info={"ellipsis"} />
        {emptyList ? 
        <View style={styles.emptyList} >
        <Text style={styles.emptyListText} >No Notes to display{"\n"} Create one from the button below</Text>
        <TouchableOpacity style={{margin:10}} onPress={()=>{
                    setDisplayAddButton(displayAddButton ? false : true);
                    setEmptyList(false);
                }} >
                <Text style={[styles.btn,{width:width-60}]} >Create Note</Text>
        </TouchableOpacity>
        </View>
        
        : '' }
        

        <View >
            <View style={[styles.btn_container,{
                display : displayAddButton ? 'flex' : 'none'
            }]} >
                <TextInput value={title} onChangeText={setTitle} style={styles.input}  placeholder='Title eg : Physics Notes'/>
                {errorDisplay ? <Text style={styles.warn} >Enter the title !</Text> : ''}
                
                <TouchableOpacity onPress={titleAdder} >
                    <Text style={[styles.btn,{width:width-40}]} >Create Note</Text>
                </TouchableOpacity>
            </View>

            <FlatList
            style={styles.list}
            data={noteTitle}
            renderItem={Renderitem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWraper}
            />
        </View>

        <ScrollView></ScrollView>
        
        <View style={styles.addBtnContainer} >
                <TouchableOpacity onPress={()=>{
                    setDisplayAddButton(displayAddButton ? false : true);
                }} style={{alignItems:'center'}} >
                    <FontAwesomeIcon style={styles.addBtn} size={50} color={Colors.NoteButton} icon={displayAddButton ? faMinusCircle : faPlusCircle} />
                </TouchableOpacity>
            </View>
        <HomePageFootor navigation={navigation} />
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:Colors.NoteBackground
    },
    btn_container:{
        margin:10,
        borderRadius:10,
        padding:10,
        alignItems:'center',
        backgroundColor:Colors.white
    },
    title:{
        color:Colors.black,
        fontSize:20
    },
    btn:{
        fontFamily:Colors.Regular,
        color:Colors.black,
        backgroundColor:'#ffdeb3',
        borderRadius:10,
        textAlign:'center',
        padding:10,
        fontFamily:Colors.Bold
    },
    input:{
        width:'100%',
        textAlign:'center',
        marginBottom:5,
        backgroundColor:'#ffdeb3',
        borderRadius:10,
        color:Colors.black
    },
    warn:{
        color:'red',
        marginBottom:6
    },
    addBtnContainer:{
        position:'absolute',
        bottom:70,
        right:10
    },
    data:{
        marginTop:25,
        backgroundColor:Colors.white,
        padding:10,
        borderRadius:10,
        width:'43%'
    },
    dataText:{
        textAlign:'left',
        color:Colors.black,
        paddingLeft:20,
        fontFamily:Colors.Bold
    },
    list:{

    },
    columnWraper:{
        justifyContent:'space-around'
    },
    emptyList:{
        backgroundColor:Colors.white,
        margin:20,
        borderRadius:10
    },
    emptyListText:{
        color:Colors.black,
        textAlign:'center',
        padding:10
    },
    create:{
        color:Colors.black
    }

})
export default Note_Classification;