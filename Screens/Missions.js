import React,{useEffect,useState} from "react";
import {StyleSheet, Text,View,Dimensions} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const Table1 = () => (
    <View>
      <Text>hello</Text>
    </View>
  );
  
  const Table2 = () => (
    <View>
      <Text>hello there </Text>
    </View>
  );

const Missions = () =>{

    
      const [index, setIndex] = useState(0);
        const [routes] = useState([
            { key: 'table1', title: 'Table 1' },
            { key: 'table2', title: 'Table 2' },
        ]);

        const renderScene = SceneMap({
            table1: Table1,
            table2: Table2,
        });

    return(
        <View>
            <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
        />
        </View>
    )
}
const styles = StyleSheet.create({

})
export default Missions;