import React,{useState,useEffect} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Dimensions,
    Text,
    StatusBar,
    TouchableOpacity
  } from 'react-native';
import Notes from '../components/Notes';
import Greetings from '../components/Greetings';
 
import SideBar from '../components/SideBar';
import NextUpdate from '../components/NextUpdate';
import firestore from '@react-native-firebase/firestore';
import CutomTextInput from '../components/CutomTextInput';
import Tools from '../components/Tools';
import Tasks from '../components/Tasks';
import { storage } from '../Storage';
import SplashScreen from "react-native-splash-screen";



const Homepage = ({navigation,route}) =>{
    const [Colors,setColors] = useState([]);
    const [ban,setBan] = useState(false);
    const [banReason,setBanReason] = useState('');
    const [report,setReport] = useState('');
    const [sending,setSending] = useState('');

    useEffect(()=>{
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
            console.log(colors);
        }
        getColors();
        SplashScreen.hide();
        const getBanDetails = async () =>{
            
            const banReport = JSON.parse(storage.getString('ban'));
            // 
            if(banReport){
              setBan(true);
            }
            const name = JSON.parse(storage.getString('userName'))
            // 
            try {
              const querySnapshot = await firestore()
                .collection('Users')
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
              
              if(documentsInRange[0].ban){
                setBanReason(documentsInRange[0].banRea)
                setBan(true);
                // await AsyncStorage.setItem('ban',JSON.stringify(true));
                storage.set('ban',false);
              }else{
                setBan(false);
                // await AsyncStorage.setItem('ban',JSON.stringify(false));
                storage.set('ban',false)
                // 
              }
              
            } catch (error) {
              console.error('Error fetching documents in range:', error);
            }
      
          }      
        getBanDetails();

    },[])

  const sendReport = async () =>{
      // const name = JSON.parse(await AsyncStorage.getItem('userName'))
      // const phone = JSON.parse(await AsyncStorage.getItem('phone'))
      // 
      const name = storage.getString('userName')
      const phone = storage.getString('phone')

      if(
        report
      ){
         setSending(true)
              try{
                  firestore()
                      .collection('BanReports')
                      .add({
                          name:name,
                          phone:phone,
                          report:report
                      })
                      .then(() => {
                          console.log('Message sent successfully'); 
                          setReport('');
                          setSending(false)
                      })
                      .catch((error) => {
                      console.log('Error sending message:', error);
                      });
                      
                      
              }catch(e){
                  console.log("error while adding data: ",e);
              }
          }else{
            setSending(false);
          }
      
}
  
    
    return(
           <View style={{flex: 1,}} >  
           <StatusBar backgroundColor={Colors.Background}/>
            <View style={{flex: 1,backgroundColor:Colors.Background,padding: 10,display:ban ? 'flex' :'none'}} >
              <View style={{backgroundColor:Colors.hashWhite,padding: 10,borderRadius:10,flex: 1,justifyContent:'center',alignItems:'center'}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Bold}} >Sorry User</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >Reason : {banReason}</Text>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center'}} >If you think this is a mistake by the program send a message to admin.</Text>
                <View style={{width:'100%'}} >
                  <CutomTextInput 
                    label="Enter message" 
                    borderColor={Colors.text} 
                    horizontal={30} 
                    marginTop={10} 
                    value={report} 
                    onTextChange={setReport}
                    color={Colors.text} 
                    textColor={Colors.text} />
                </View>
                <Text style={{color:Colors.text,fontFamily:Colors.Medium,display:sending ? 'flex': 'none'}}  >Sending Report...</Text>
               <TouchableOpacity onPress={sendReport} style={{backgroundColor:Colors.primary,padding: 10,margin:10}} >
                <Text style={{color:Colors.text,fontFamily:Colors.Medium}} >Send Report</Text>
               </TouchableOpacity>
              </View>
            </View>

             <View  style={[styles.background,{backgroundColor:Colors.Background,flexDirection:'row',display:!ban ? 'flex' :'none'}]} >

                <SideBar navigation={navigation} page="Cogit" />

                <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:Colors.Background,paddingBottom:150,flex: 1,}}  >
                <Greetings navigation={navigation} />

                <Tools navigation={navigation} colors={Colors} />
                
                <Tasks  navigation={navigation} Colors={Colors} />   
                

                <View>
                    <Notes navigation={navigation} />
                </View>
                    
                  
                    <View style={{flexDirection:'row',paddingHorizontal:10}} >
                    </View>
                    <NextUpdate navigation={navigation} />
                  
                </ScrollView>


            </View>
           </View>
    );
}
const styles = StyleSheet.create({
    background:{
        flex:1,
    },
})
export default Homepage;