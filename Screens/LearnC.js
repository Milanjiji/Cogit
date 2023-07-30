import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView,TouchableOpacity} from 'react-native';
import Colors from '../colors.json'
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LearnC = ({navigation}) => {
  const [Colors,setColors] = useState([]);
  const [lang,setLang] = useState(true);  

    
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

        const getLang = async() =>{
            const lang = JSON.parse(await AsyncStorage.getItem("C++Lang"));
            console.log("lang",lang);
            if(lang !== null){
                setLang(lang)
            }else{
                setLang(false);
                await AsyncStorage.setItem("C++Lang",JSON.stringify(false))
            }
          }
          getLang()
    },[])
    

   
    
    const NormalText = ({eng,mal,bold,fontSize}) =>{
        return(
            <View style={{marginVertical:10}} >
                <Text style={{color:Colors.text,fontFamily:bold ? Colors.Bold: Colors.Medium,display:lang ? 'flex' :'none',fontSize : fontSize ? 22 : 14}} >{mal}</Text>
                <Text style={{color:Colors.text,fontFamily:bold ? Colors.Bold: Colors.Medium,display:!lang ? 'flex' :'none',fontSize : fontSize ? 22 : 14}} >{eng}</Text>
            </View>
        )
    }
    
 
  
  return (
    <View
      style={{backgroundColor:Colors.Background,flex: 1,}} >
          <Header navigation={navigation} title='Intro' info=''  />    
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: 10,}} >
            
            <View>
            
                <NormalText 
                mal={"ഈ സമഗ്രമായ കോഴ്‌സ് രൂപകൽപ്പന ചെയ്‌തിരിക്കുന്നത് C++ അല്ലെങ്കിൽ പൊതുവെ പ്രോഗ്രാമിംഗിൽ മുൻ പരിചയമില്ലാത്ത വിദ്യാർത്ഥികൾക്ക് വേണ്ടിയാണ്. C++ പ്രോഗ്രാമിംഗ് ആശയങ്ങളിലും വാക്യഘടനയിലും ഉറച്ച അടിത്തറ നൽകാനാണ് കോഴ്‌സ് ലക്ഷ്യമിടുന്നത്. കൂടാതെ, ഇത് ആപ്ലിക്കേഷനിൽ ഒരു ബിൽറ്റ്-ഇൻ കോഡ് എഡിറ്റർ സംയോജിപ്പിക്കുന്നു, വിദ്യാർത്ഥികൾക്ക് അവരുടെ കോഡ് നേരിട്ട് ആപ്പിൽ പരിശീലിക്കാനും പ്രവർത്തിപ്പിക്കാനും പ്രാപ്‌തമാക്കുന്നു, ഇത് ഹാൻഡ്-ഓൺ ലേണിംഗ് പ്രോത്സാഹിപ്പിക്കുന്നു."}
                eng={"This comprehensive course is designed for students who have no prior experience with C++ or programming in general. The course aims to provide a solid foundation in C++ programming concepts and syntax. Additionally, it incorporates a built-in code editor within the application, enabling students to practice and run their code directly in the app, promoting hands-on learning."}  />
                <NormalText 
                bold={true}
                mal={"ഞങ്ങൾ ആരംഭിക്കുന്നതിന് മുമ്പ്"}
                eng={"Before we start"}  />
                <NormalText 
                bold={true}
                fontSize={true}
                mal={"ഞങ്ങൾ ആരംഭിക്കുന്നതിന് മുമ്പ്"}
                eng={"What is C++?"}  />

                <NormalText 
                mal={"ഞങ്ങൾ ആരംഭിക്കുന്നതിന് മുമ്പ്"}
                eng={"C++ is a cross-platform programming language used to create high-performance applications.\nIt was developed by Bjarne Stroustrup as an extension to the C language.\nIt was developed by Bjarne Stroustrup as an extension to the C language.\nThe language has been updated four major times, resulting in C++11, C++14, C++17, and C++20."}  />

                <NormalText 
                bold={true}
                fontSize={true}
                mal={"ഞങ്ങൾ ആരംഭിക്കുന്നതിന് മുമ്പ്"}
                eng={"Why Use C++?"}  />

                <NormalText 
                mal={"ഞങ്ങൾ ആരംഭിക്കുന്നതിന് മുമ്പ്"}
                eng={"C++ is found in operating systems, Graphical User Interfaces (GUIs), and embedded systems.\nC++ provides a clear structure to programs, allowing code reuse and lowering development costs.\nIt can be used to develop applications that can be adapted to multiple platforms.\nC++ is fun to learn due to its versatility and wide range of applications."}  />

            
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate('HelloWorld');}} style={{backgroundColor:Colors.hashWhite,borderRadius:10,padding: 10,marginBottom:20}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >go to next session</Text>
            </TouchableOpacity>
           
        </ScrollView>

    </View>
  );
};



export default LearnC;
