import React ,{useRef,useEffect} from 'react';
import { View, StyleSheet,Animated } from 'react-native';
import Colors from '../colors.json'

const LoadingAnimation = (props) => {
  const circleSize = useRef(new Animated.Value(10)).current;
  const circleSize2 = useRef(new Animated.Value(20)).current;
  console.log(props.display);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(circleSize, {
          toValue: 20,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(circleSize, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(circleSize2, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(circleSize2, {
          toValue: 20,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);
  return (
    <View style={{flexDirection:'row',display : props.display == true ? 'flex' : 'none'}}>
      <View style={styles.circleContainer} >
      <Animated.View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: 10,
          backgroundColor: Colors.white,
          
        }}
      />
      </View>
      <View style={styles.circleContainer} >
      <Animated.View
        style={{
          width: circleSize2,
          height: circleSize2,
          borderRadius: 10,
          backgroundColor: Colors.white,
          
        }}
      />
      </View>
      <View style={styles.circleContainer} >
      <Animated.View
        style={{
          width: circleSize,
          height: circleSize,
          elevation:10,
          borderRadius: 10,
          backgroundColor: Colors.white,
          
        }}
      />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  circleContainer:{
    width:20,
    height:20,
    margin:10,
    alignItems:'center',
    justifyContent:'space-around'
  }
})

export default LoadingAnimation;
