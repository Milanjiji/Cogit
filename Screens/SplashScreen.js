import React,{useEffect} from "react";
import { View,Text } from "react-native";

const Spalsh  = ({navigation}) =>{
    useEffect(() => {
        const fetchData = async () => {

          await new Promise(resolve => setTimeout(resolve, 1000));

          const data = await AsyncStorage.getItem('userName');


          if (data) {
            navigation.navigate('Home');
          } else {
            navigation.navigate('getStarted');
          }
        }
        fetchData()
      }, []);
    return(
        <View>
            <Text>
                this is the splash screen
            </Text>
        </View>
    );
}

export default Spalsh