import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
 

const LoadingAnimation = ({children}) => {
  const sizeAnimation = useRef(new Animated.Value(150)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const [Colors,setColors] = useState([])

  useEffect(() => {
    startAnimation();
  }, []);
  useEffect(()=>{
    const getColors = async()=>{
        const data = await AsyncStorage.getItem('Colors');
        const colors = JSON.parse(data);
        setColors(colors);
        
        
    }
    getColors();
  },[])


  startAnimation =() => {

    Animated.loop(
      Animated.sequence([
        Animated.timing(sizeAnimation, {
          toValue: 200,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(sizeAnimation, {
          toValue: 150,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(sizeAnimation, {
          toValue: 200,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(sizeAnimation, {
          toValue: 150,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
      { iterations: -1 }
    ).start();

  Animated.timing(glowAnimation, {
    toValue: 1,
    duration: 800,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  }


    const animatedStyle = {
      width: sizeAnimation,
      height: sizeAnimation,
      borderRadius: sizeAnimation.interpolate({
        inputRange: [0, 200],
        outputRange: [30, 100],
      }),
      shadowColor: Colors.primary,
      shadowOffset: {
        width: 150,
        height: 150,
      },
      shadowOpacity: glowAnimation,
      shadowRadius: 150,
      elevation:50
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.circle, animatedStyle]} >
          {children}
        </Animated.View>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
  },
});

export default LoadingAnimation;
