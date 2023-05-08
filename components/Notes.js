import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ImageBackground
  } from 'react-native';
import Colors from '../colors.json'


const Notes = ({navigation,route,...props}) =>{

    const goTo = (place) =>{
        navigation.navigate(place);
    }
    return(
        <View style={styles.background}>
            <Text style={styles.title} >Notes</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{flexDirection:'row'}} >
                <View style={{flexDirection:'row'}} >
                    <TouchableOpacity onPress={()=>goTo('Notes')} style={[styles.btn,{backgroundColor:'#f6b26b'}]} >
                        <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1tHfRi8UikHq30wR5Nq1m4IZjCjH0PU9z'}} >
                                <Text style={styles.btnText} >Maths</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.btn,{backgroundColor:'#5d5eab'}]} >
                        <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1NQIJtTmPXC7BS95fe-fc6tI-UCgEMZa9'}} >
                                <Text style={styles.btnText} >Chemistry</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.btn,{backgroundColor:'#7dcfb6'}]} >
                        <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1IdNwwJfD5g4BAK1ZWIVQovF_VjfqZvd_'}} >
                                <Text style={styles.btnText} >Physics</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.btn,{backgroundColor:'#a26a7b'}]} >
                        <ImageBackground style={{width:150,height:100}} borderRadius={10} resizeMode='cover'  source={{uri : 'https://drive.google.com/uc?id=1dSy9ZT7xkAz9HcWzFwp0yQpexsfKbRhb'}} >
                                <Text style={styles.btnText} >Biology</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
                 
            
        </View>
    );
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:Colors.primary,
        marginTop:10,
        borderRadius:10,
        margin:3,
        padding:10,
        elevation:10
    },
    title:{
        color:Colors.primary,
        fontFamily:Colors.ExtraBold,
        fontSize:16,
    },
    btn:{
        width:150,
        height:100,
        borderRadius:10,
        justifyContent:'flex-end',
        marginVertical:2,
        marginHorizontal:2
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
        flexDirection:'row' 
    },
    
})
export default Notes;