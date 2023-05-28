import React,{useState,useEffect} from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";

const PrivacyPolicy = ({navigation}) =>{
    const [Colors,setColors] = useState([]);
    useEffect(()=>{
        const getColors = async()=>{
            const data = await AsyncStorage.getItem('Colors');
            const colors = JSON.parse(data);
            setColors(colors);
        }
        getColors();

    },[])

   

    return(
        <ScrollView style={[styles.body,{backgroundColor:Colors.Background}]} >
            <Text style={{color:Colors.text,textAlign:'center',fontFamily:Colors.Bold,fontSize:20,marginTop:20}} >Privacy Policy</Text>
            <Text style={{color:Colors.text,textAlign:'center',fontFamily:Colors.Medium,marginTop:20}} >Thank you for using Cogit. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our mobile application ("App") and any associated services. By using Cogit, you agree to the terms and practices described in this Privacy Policy.</Text>
            <Text style={{color:Colors.text,marginTop:20,fontFamily:Colors.Bold}} >Information We Collect:</Text>
            <View style={{paddingLeft:20}} >
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Name</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Email</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Passowrd</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Phone</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >School</Text> 
            </View>

            <Text style={{color:Colors.text,marginTop:20,fontFamily:Colors.Bold}} >Data Collection Methods:</Text>
            <View style={{paddingLeft:20}} >
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >We collect information when you voluntarily provide it to us or when you use our App. This may include:</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Registration forms</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >User-submitted data</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Usage and interaction data</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Cookies and similar tracking technologies</Text> 
            </View>

            <Text style={{color:Colors.text,marginTop:20,fontFamily:Colors.Bold}} >Use of Information:</Text>
            <View style={{paddingLeft:20}} >
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >We use the collected information for the following purposes:</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Providing and improving our services</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Personalizing user experience</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Communicating with users</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Analyzing usage patterns and trends</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Conducting research and development</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Enforcing our terms and policies</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Marketing and promotional activities (with user consent, where required)</Text> 
            </View>

            <Text style={{color:Colors.text,marginTop:20,fontFamily:Colors.Bold}} >Data Sharing:</Text>
            <View style={{paddingLeft:20}} >
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >We do not sell or rent your personal information to third parties. However, we may share it in the following circumstances:</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >With trusted service providers who assist us in operating our services</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >With analytics and advertising partners to analyze usage and display relevant ads</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >In response to legal requests, court orders, or to comply with applicable laws</Text> 
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >To protect our rights, property, or safety, and that of our users and the public</Text> 
            </View>

            <Text style={{color:Colors.text,marginTop:20,fontFamily:Colors.Bold}} >Data Security:</Text>
            <View style={{paddingLeft:20}} >
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >We take reasonable measures to safeguard your personal information against unauthorized access, alteration, or disclosure. We follow industry best practices to ensure data security, including encryption, access controls, and regular security assessments.</Text> 
            </View>

            <Text style={{color:Colors.text,marginTop:20,fontFamily:Colors.Bold}} >User Choices and Control:</Text>
            <View style={{paddingLeft:20}} >
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >We provide users with choices and controls over their personal information, including the ability to update, correct, or delete their data. Users can manage their communication preferences and opt-out of certain activities. However, please note that certain information may be necessary for providing our services, and opting out of essential data sharing may affect functionality.</Text> 
            </View>

            <Text style={{color:Colors.text,marginTop:20,fontFamily:Colors.Bold}} >Cookies and Tracking Technologies:</Text>
            <View style={{paddingLeft:20}} >
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >We use cookies and similar tracking technologies to enhance user experience, track usage patterns, and gather analytical data. Users can manage their cookie preferences through their device or browser settings.</Text> 
            </View>

            <Text style={{color:Colors.text,marginTop:20,fontFamily:Colors.Bold}} >Third-Party Links:</Text>
            <View style={{paddingLeft:20}} >
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >Our App may contain links to third-party websites or services. This Privacy Policy does not apply to those external sites. Users should review the privacy policies of those third parties before providing any personal information.</Text> 
            </View>

            <Text style={{color:Colors.text,marginTop:20,fontFamily:Colors.Bold}} >Updates to the Privacy Policy:</Text>
            <View style={{paddingLeft:20}} >
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >We may update this Privacy Policy from time to time. We will notify users of any material changes through the App or other means. Continued use of Cogit after such changes constitutes acceptance of the updated policy.</Text> 
            </View>

            <Text style={{color:Colors.text,marginTop:20,fontFamily:Colors.Bold}} >Contact Us:</Text>
            <View style={{paddingLeft:20}} >
                <Text style={{color:Colors.text,marginTop:10,fontFamily:Colors.Medium}} >If you have any questions, concerns, or requests regarding your personal information or this Privacy Policy, please contact us at milanjiji0987654321@gmail.com or +91 7012881003.</Text> 
            </View>

            <Text style={{color:Colors.text,marginTop:20,fontFamily:Colors.Bold}} >Credits:</Text>
            <View style={{paddingLeft:20}} >
                <Text style={{color:Colors.text,marginTop:10,paddingBottom:40,fontFamily:Colors.Medium}} >Cogit is hosted on Google Cloud Platform, and we acknowledge and attribute the services provided by Google. Any other credits or acknowledgments for specific features or resources used in Cogit are duly given to their respective owners. {"\n"}{"\n"}Please note that this Privacy Policy is provided for informational purposes and does not constitute legal advice. For legal guidance, please consult with a qualified professional familiar with privacy laws and regulations in your jurisdiction.</Text> 
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        padding: 20,
    },
    subTitle:{

    }
})
export default PrivacyPolicy;