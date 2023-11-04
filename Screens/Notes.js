import React,{useEffect,useState} from "react";
import { Text, View,StyleSheet, TouchableOpacity, Dimensions,ScrollView,ImageBackground, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from '../colors.json'
import firestore from '@react-native-firebase/firestore';
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import HomePageBar from "../components/HomePageBar";
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import SideBar from "../components/SideBar";
import { storage } from "../Storage";


const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3471464164746532/1876191748';


const Notes = ({navigation}) =>{
    const [imageLink,setImageLink] = useState('');
    const [panelTitle,setPanelTitle] = useState('');
    const [panelDisc,setPanelDisc] = useState('');
    const [Colors,setColors] = useState([]);
    const [bannerPos,setBannerPos] = useState();
    const [notesPos,setNotesPos] = useState();
    const [goto,setGoTo] = useState('')


    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        
    },[])


    const randomId = (id) =>{
        const random = Math.floor(Math.random() * id)
        return random;
        
    }
    

    useEffect(() => {
        const get = async () =>{
            const users = await firestore().collection('Note_ad').get();
            const data = users.docs.map(doc => doc.data())
            const id = randomId(users.size)
            const selectedPanelFromData = data.filter( item => item.id === id);
            setImageLink(selectedPanelFromData[0].ImageBackground);
            setPanelTitle(selectedPanelFromData[0].title)
            setPanelDisc(selectedPanelFromData[0].disc)
            setGoTo(selectedPanelFromData[0].navigation) 
            console.log(selectedPanelFromData[0].navigation);
        }
        get();
        
      }, []);

      
      const goTo = (place,sub) =>{
        navigation.navigate(place,{sub:sub});
      }

      
    return(
        <View style={[styles.App,{backgroundColor:Colors.Background,flexDirection:'row',alignItems:'center'}]} >
            <SideBar page="Notes" navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:20}} >

            <View style={{display: notesPos ? 'flex' :'none'}} >
                    <View style={styles.grid} >
                        <TouchableOpacity onPress={()=>goTo('Classification')} style={[styles.btn,{backgroundColor:Colors.primary}]} >
                            <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1tHfRi8UikHq30wR5Nq1m4IZjCjH0PU9z'}} >
                                    <Text style={[styles.btnText,{color:Colors.text}]} >Maths</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary}]}>
                            <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1NQIJtTmPXC7BS95fe-fc6tI-UCgEMZa9'}} >
                                    <Text style={[styles.btnText,{color:Colors.text}]} >Chemistry</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.grid} >
                        <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary}]} >
                            <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1IdNwwJfD5g4BAK1ZWIVQovF_VjfqZvd_'}} >
                                    <Text style={[styles.btnText,{color:Colors.text}]} >Physics</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={[styles.btn,{backgroundColor:Colors.primary}]} >
                            <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1dSy9ZT7xkAz9HcWzFwp0yQpexsfKbRhb'}} >
                                    <Text style={[styles.btnText,{color:Colors.text}]} >Biology</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={()=>{navigation.navigate(goto)}} style={{display:bannerPos ? 'none' :'flex'}}  >
                    <View style={[styles.container,{backgroundColor:Colors.secondary}]}>
                        <ImageBackground
                            source={{ uri: imageLink }}
                            style={styles.backgroundImage}
                            imageStyle={{width:200,resizeMode:'cover',left:'40%',height:150,top:50}}
                        >
                            <View style={styles.overlay}>
                                <Text style={[styles.title,{color:Colors.text}]}>{panelTitle}</Text>
                                <Text style={[styles.description,{color:Colors.text}]}>{panelDisc}</Text>
                                <View style={[styles.panelGoBtn,{color:Colors.text}]}  >
                                    <Text style={{color:Colors.black,fontFamily:Colors.Bold,paddingRight:10}} >Go </Text>
                                    <FontAwesomeIcon color={Colors.black} icon={faArrowRight} />
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            

                <View style={{marginHorizontal:10}} >
                    <HomePageBar community={true} height={90} navigation={navigation} title={'Community'}  navigate={'Community'}  disc={'This is where students share their \nNotes and other News'} />
                </View>
                
                    
               <View style={{display: !notesPos ? 'flex' :'none'}} >
                    <View style={styles.grid} >
                        <TouchableOpacity onPress={()=>goTo('Classification','math')} style={[styles.btn,{backgroundColor:Colors.primary}]} >
                            <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1tHfRi8UikHq30wR5Nq1m4IZjCjH0PU9z'}} >
                                    <Text style={[styles.btnText,{color:Colors.text}]} >Maths</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=>goTo('Classification','chem')} style={[styles.btn,{backgroundColor:Colors.primary}]}>
                            <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1NQIJtTmPXC7BS95fe-fc6tI-UCgEMZa9'}} >
                                    <Text style={[styles.btnText,{color:Colors.text}]} >Chemistry</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.grid} >
                        <TouchableOpacity onPress={()=>goTo('Classification','phy')} style={[styles.btn,{backgroundColor:Colors.primary}]} >
                            <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1IdNwwJfD5g4BAK1ZWIVQovF_VjfqZvd_'}} >
                                    <Text style={[styles.btnText,{color:Colors.text}]} >Physics</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=>goTo('Classification','bio')} style={[styles.btn,{backgroundColor:Colors.primary}]} >
                            <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1dSy9ZT7xkAz9HcWzFwp0yQpexsfKbRhb'}} >
                                    <Text style={[styles.btnText,{color:Colors.text}]} >Biology</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>



                <TouchableOpacity style={{display:!bannerPos ? 'none' :'flex'}}  >
                    <View style={[styles.container,{backgroundColor:Colors.secondary}]}>
                        <ImageBackground
                            source={{ uri: imageLink }}
                            style={styles.backgroundImage}
                            imageStyle={{width:200,resizeMode:'cover',left:'40%',height:150,top:50}}
                        >
                            <View style={styles.overlay}>
                                <Text style={[styles.title,{color:Colors.text}]}>{panelTitle}</Text>
                                <Text style={[styles.description,{color:Colors.text}]}>{panelDisc}</Text>
                                <View style={[styles.panelGoBtn,{color:Colors.text}]}  >
                                    <Text style={{color:Colors.black,fontFamily:Colors.Bold,paddingRight:10}} >Go </Text>
                                    <FontAwesomeIcon color={Colors.black} icon={faArrowRight} />
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    App:{
        flex:1,
        backgroundColor:Colors.Background
    },
    container:{
        flex:1,
    },
    grid:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    btn:{
        width:160,
        height:100,
        borderRadius:10,
        justifyContent:'flex-end',
        marginVertical:15,
        marginHorizontal:2,
        backgroundColor:Colors.primary,
        elevation:10
    },
    btnText:{
        color:Colors.white,
        fontSize:20,
        fontFamily:Colors.Bold,
        textAlign:'right',
        padding:20,
        height:100,
        marginTop:40
    },
    btnContainer:{
        flexDirection:'row' ,
    },
    container: {
        margin:10,
        height:200,
        borderRadius:10,
        backgroundColor:'rgba(0,0,0,0.5)',
        overflow:'hidden',
        padding:10
      },
      overlay: {
        height:200,
        
      },
      title: {
        fontSize: 34,
        color:Colors.white,
        marginBottom: 8,
        fontFamily:Colors.Bold
      },
      description: {
        fontSize: 16,
        color:Colors.white,
        fontFamily:Colors.Regular,

      },
      panelGoBtn:{
        color:Colors.primary,
        paddingVertical:5,
        justifyContent:'center',
        fontFamily:Colors.Bold,
        backgroundColor:Colors.white,
        borderRadius:10,
        width:100,
        marginTop:8,
        flexDirection:'row'
      },
      community:{
        margin:10,
        padding:8,
        backgroundColor:Colors.primary,
        borderRadius:10,
        elevation:10
      },
      community_Text:{
        color:Colors.white,
        fontFamily:Colors.Bold,
        fontSize:24
      },
      community_Disc:{
        color:Colors.white,
        fontFamily:Colors.Regular,
        width:'60%'
      },
})
export default Notes;