import React,{useState,useEffect} from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";

const TermsCondition = ({navigation}) =>{
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
        <ScrollView style={[styles.body, { backgroundColor: Colors.Background }]}>
            <Text style={{ color: Colors.text, textAlign: 'center', fontFamily: Colors.Bold, fontSize: 20, marginTop: 20 }}>Terms and Conditions</Text>
            <Text style={{ color: Colors.text, textAlign: 'center', fontFamily: Colors.Medium, marginTop: 20 }}>Thank you for using Cogit. These Terms and Conditions govern your access to and use of our mobile application ("App") and any associated services. By using Cogit, you agree to comply with these terms and conditions.</Text>
            <Text style={{ color: Colors.text, marginTop: 20, fontFamily: Colors.Bold }}>1. Acceptance of Terms</Text>
            <Text style={{ color: Colors.text, marginTop: 10, fontFamily: Colors.Medium }}>By downloading, installing, or using Cogit, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. If you do not agree to these terms, please do not use the App.</Text>

            <Text style={{ color: Colors.text, marginTop: 20, fontFamily: Colors.Bold }}>2. Intellectual Property</Text>
            <Text style={{ color: Colors.text, marginTop: 10, fontFamily: Colors.Medium }}>The App and its original content, features, and functionality are owned by the creators of Cogit and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</Text>

            <Text style={{ color: Colors.text, marginTop: 20, fontFamily: Colors.Bold }}>3. User Accounts</Text>
            <Text style={{ color: Colors.text, marginTop: 10, fontFamily: Colors.Medium }}>To access certain features or areas of the App, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</Text>

            <Text style={{ color: Colors.text, marginTop: 20, fontFamily: Colors.Bold }}>4. User Responsibilities</Text>
            <Text style={{ color: Colors.text, marginTop: 10, fontFamily: Colors.Medium }}>When using Cogit, you agree to:</Text>
            <Text style={{ color: Colors.text, marginLeft: 20, marginTop: 5, fontFamily: Colors.Medium }}>- Comply with all applicable laws and regulations</Text>
            <Text style={{ color: Colors.text, marginLeft: 20, marginTop: 5, fontFamily: Colors.Medium }}>- Respect the rights and privacy of other users</Text>
            <Text style={{ color: Colors.text, marginLeft: 20, marginTop: 5, fontFamily: Colors.Medium }}>- Not engage in any illegal, harmful, or abusive activities</Text>
            <Text style={{ color: Colors.text, marginLeft: 20, marginTop: 5, fontFamily: Colors.Medium }}>- Not transmit any viruses, malware, or other harmful code</Text>

            <Text style={{ color: Colors.text, marginTop: 20, fontFamily: Colors.Bold }}>5. Limitation of Liability</Text>
            <Text style={{ color: Colors.text, marginTop: 10, fontFamily: Colors.Medium }}>In no event shall the creators of Cogit be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the App.</Text>

            <Text style={{ color: Colors.text, marginTop: 20, fontFamily: Colors.Bold }}>6. Modifications to the App</Text>
            <Text style={{ color: Colors.text, marginTop: 10, fontFamily: Colors.Medium }}>The creators of Cogit reserve the right to modify or discontinue, temporarily or permanently, the App or any part thereof with or without notice.</Text>

            <Text style={{ color: Colors.text, marginTop: 20, fontFamily: Colors.Bold }}>7. Governing Law</Text>
            <Text style={{ color: Colors.text, marginTop: 10, fontFamily: Colors.Medium, marginBottom:20 }}>These Terms and Conditions shall be governed by and construed in accordance with the laws of your jurisdiction.</Text>
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
export default TermsCondition;