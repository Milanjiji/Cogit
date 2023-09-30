import React,{useState,useEffect} from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Dimensions,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity
  } from 'react-native';
import Notes from '../components/Notes';
import Greetings from '../components/Greetings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePageBar from '../components/HomePageBar';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import SideBar from '../components/SideBar';
import NextUpdate from '../components/NextUpdate';
import firestore from '@react-native-firebase/firestore';
import CutomTextInput from '../components/CutomTextInput';


// ted ed classes
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3471464164746532/1876191748';

const Homepage = ({navigation,route}) =>{
    const [Colors,setColors] = useState([]);
    const [ban,setBan] = useState(false);
    const [banReason,setBanReason] = useState('');
    const [report,setReport] = useState('');
    const [sending,setSending] = useState('');

    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();
        
        const getBanDetails = async () =>{
            
            const banReport = JSON.parse(await AsyncStorage.getItem('ban'));
            if(banReport){
              setBan(true);
            }
            const name = JSON.parse(await AsyncStorage.getItem('userName'))
            console.log("trying to get the posts",name);
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
              
              console.log(documentsInRange[0].ban);
              console.log(documentsInRange[0].banRea);
              if(documentsInRange[0].ban){
                console.log(documentsInRange[0].banRea)
                setBanReason(documentsInRange[0].banRea)
                setBan(true);
                await AsyncStorage.setItem('ban',JSON.stringify(true));
                console.log('====================================');
                console.log("account actually banned");
                console.log('====================================');
              }else{
                setBan(false);
                await AsyncStorage.setItem('ban',JSON.stringify(false));
              }
              
            } catch (error) {
              console.error('Error fetching documents in range:', error);
            }
      
          }      
        getBanDetails();

    },[])

  const sendReport = async () =>{
      const name = JSON.parse(await AsyncStorage.getItem('userName'))
      const phone = JSON.parse(await AsyncStorage.getItem('phone'))

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

                <View style={{marginHorizontal:10}} >
                    <HomePageBar  height={120} navigation={navigation} item={"c"} title={'Learn C++ (without pc)'}  navigate={"ClassificationC"}  disc={'Embark on an empowering coding journey with our free, on-the-go app featuring an integrated C++ code editor, available in Malayalam, allowing you to learn and practice C++ anytime, anywhere!'} />
                </View>
                <View style={{flexDirection:'row',paddingHorizontal:10}} >
                    <HomePageBar  height={120} navigation={navigation} item={"focus"} title={'Focus'}  navigate={'Focus'}  />
                    <HomePageBar  height={120} navigation={navigation} item={"recycle"} title={'Re:Cycle'}  navigate={'ReCycle'}   />
                    <HomePageBar height={120} navigation={navigation} item={"skills"} title={'Skills'}  navigate={'Skills'}   />
                </View>  
                <View style={{flexDirection:'row',paddingHorizontal:10}} >
                    <HomePageBar  height={120} navigation={navigation} item={"Forum"} spc={true} title={'Forum'}  navigate={'Forum'}   />
                    <HomePageBar  height={120} navigation={navigation} item={"Ted"} title={'Ted Ed'}  navigate={'TedEd'}  />
                </View>  
                
                <View>
                    <Notes navigation={navigation} />
                </View>
                    
                  
                    <View style={{flexDirection:'row',paddingHorizontal:10}} >
                        <HomePageBar height={120} navigation={navigation} item={"com"} spc={true} title={'Community'}  navigate={'Community'}   />
                    </View>
                    <NextUpdate navigation={navigation} />

                        
                    <Text style={{color:Colors.text,fontFamily:Colors.Medium,textAlign:'center',marginVertical:10}} > Copyright © 2023 Cogit</Text>
                  
                  
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