import React,{useState,useEffect} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ImageBackground
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
import NotificationComponent from '../components/Notification';
import mobileAds from 'react-native-google-mobile-ads';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';


const Homepage = ({navigation,route}) =>{
    const [Colors,setColors] = useState([]);
    const [ban,setBan] = useState(false);
    const [banReason,setBanReason] = useState('');
    const [report,setReport] = useState('');
    const [sending,setSending] = useState('');
    const [stnt,setStnt] = useState(true);
    const [adState,setAdState] = useState(false);

   
    const adUnitId = adState ? 'ca-app-pub-3471464164746532/1876191748' : 'ca-app-pub-';
    useEffect(()=>{
        SplashScreen.hide();
        const getColors = async()=>{
            const data = storage.getString('Colors')
            const colors = JSON.parse(data);
            setColors(colors);
            
        }
        getColors();

        const getAdStatus =  async () =>{
          const querySnapshot = await firestore()
                .collection('AdPer')
                .get();
          const data = querySnapshot.docs.map(doc => ({
                i:doc.id,
                ...doc.data()
              }));
          console.log(data[0].state);
          setAdState(data[0].state);
        }
        getAdStatus();

        mobileAds()
        .initialize()
        .then(adapterStatuses => {
        });
        const getBanDetails = async () =>{
            
            const banReport = storage.getString('ban')
            // 
            if(banReport){
              setBan(true);
            }
            const name = storage.getString('userName')
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
        const getUserDetails = async () =>{
          const clas = storage.getString('class');
          if(clas === "nStd"){
            setStnt(false);
          }else{
            setStnt(true);
          }
        }
        getUserDetails();

       
    },[])


  const sendReport = async () =>{
     
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
      <View style={{flex:1,backgroundColor:Colors.Background}} >
      <ImageBackground source={{uri: 'https://firebasestorage.googleapis.com/v0/b/fir-e4bcf.appspot.com/o/background.png?alt=media&token=1d4c61d7-9b63-43a4-a485-9c3674eb442e'}} resizeMode="cover" style={{flex:1}} >
           <StatusBar backgroundColor={Colors.Background}/>
            <View style={{flex: 1,padding: 10,display:ban ? 'flex' :'none'}} >
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

             <View  style={[styles.background,{flexDirection:'row',display:!ban ? 'flex' :'none'}]} >

                <SideBar navigation={navigation} page="Cogit"  />
              
                <ScrollView showsVerticalScrollIndicator={false} style={{paddingBottom:0}}  >
                <NotificationComponent />
                <Greetings   navigation={navigation} />

                <Tools navigation={navigation} colors={Colors} />
                
                <Tasks  navigation={navigation} Colors={Colors} />   
                <BannerAd
                    style={{display:adState ? 'flex' : 'none'}}
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                  />

                <View style={{display : stnt ? 'flex' : 'none'}} >
                    <Notes navigation={navigation} />
                </View>
                    
                  <NextUpdate navigation={navigation} />
                  
                  
                </ScrollView>


            </View>
            </ImageBackground>
           </View>
    );
}
const styles = StyleSheet.create({
    background:{
        flex:1,
    },
})
export default Homepage;