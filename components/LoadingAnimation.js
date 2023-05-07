import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createAnimation, AnimationType } from 'react-native-keyframes';

const LoadingAnimation = () => {
  const styles = StyleSheet.create({
    wrapper: {
      width: 200,
      height: 60,
      position: 'relative',
      zIndex: 1,
    },
    circle: {
      width: 20,
      height: 20,
      position: 'absolute',
      borderRadius: 10,
      backgroundColor: '#fff',
      left: '15%',
      transformOrigin: '50%',
      animation: createAnimation({
        type: AnimationType.Keyframes,
        values: [
          {
            value: {
              top: 60,
              height: 5,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              transform: [{ scaleX: 1.7 }],
            },
            duration: 0,
          },
          {
            value: {
              height: 20,
              borderRadius: 10,
              transform: [{ scaleX: 1 }],
            },
            duration: 200,
          },
          {
            value: {
              top: '0%',
            },
            duration: 300,
          },
        ],
        loop: true,
        easing: 'ease',
      }),
    },
    circle2: {
      left: '45%',
      animation: createAnimation({
        type: AnimationType.Keyframes,
        values: [
          {
            value: {
              top: 60,
              height: 5,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              transform: [{ scaleX: 1.7 }],
            },
            duration: 200,
          },
          {
            value: {
              height: 20,
              borderRadius: 10,
              transform: [{ scaleX: 1 }],
            },
            duration: 200,
          },
          {
            value: {
              top: '0%',
            },
            duration: 300,
          },
        ],
        loop: true,
        easing: 'ease',
        delay: 200,
      }),
    },
    circle3: {
      left: 'auto',
      right: '15%',
      animation: createAnimation({
        type: AnimationType.Keyframes,
        values: [
          {
            value: {
              top: 60,
              height: 5,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              transform: [{ scaleX: 1.7 }],
            },
            duration: 400,
          },
          {
            value: {
              height: 20,
              borderRadius: 10,
              transform: [{ scaleX: 1 }],
            },
            duration: 200,
          },
          {
            value: {
              top: '0%',
            },
            duration: 300,
          },
        ],
        loop: true,
        easing: 'ease',
        delay: 300,
      }),
    },
    shadow: {
      width: 20,
      height: 4,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
      backgroundColor: 'rgba(0,0,0,0.9)',
      position: 'absolute',
      top: 62,
      transformOrigin: '50%',
      zIndex: -1,
      left: '15%',
      opacity: 0.4,
      animation: createAnimation({
        type: AnimationType.Keyframes,
        values: [
          {
            value: {
              transform: [{ scaleX: 1.5 }],
            },
            duration: 0,
          },
          {
            value: {
              transform: [{ scaleX: 1 }],
              opacity: 0.7,
            },
            duration: 200,
          },
          {
            value: {
              transform: [{ scaleX: 0.2 }],
              opacity: 0.4,
            },
            duration: 300,
          },
        ],
        loop: true,
        easing: 'ease',
      }),
    },
    shadow2: {
      left: '45%',
      animation: createAnimation({
        type: AnimationType.Keyframes,
        values: [
          {
            value: {
              transform: [{ scaleX: 1.5 }],
            },
            duration: 200,
          },
          {
            value: {
              transform: [{ scaleX: 1 }],
              opacity: 0.7,
            },
            duration: 200,
          },
          {
            value: {
              transform: [{ scaleX: 0.2 }],
              opacity: 0.4,
            },
            duration: 300,
          },
        ],
        loop: true,
        easing: 'ease',
        delay: 200,
      }),
    },
    shadow3: {
      left: 'auto',
      right: '15%',
      animation: createAnimation({
        type: AnimationType.Keyframes,
        values: [
          {
            value: {
              transform: [{ scaleX: 1.5 }],
            },
            duration: 400,
          },
          {
            value: {
              transform: [{ scaleX: 1 }],
              opacity: 0.7,
            },
            duration: 200,
          },
          {
            value: {
              transform: [{ scaleX: 0.2 }],
              opacity: 0.4,
            },
            duration: 300,
          },
        ],
        loop: true,
        easing: 'ease',
        delay: 300,
      }),
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.circle}></View>
      <View style={[styles.circle, styles.circle2]}></View>
      <View style={[styles.circle, styles.circle3]}></View>
      <View style={styles.shadow}></View>
      <View style={[styles.shadow, styles.shadow2]}></View>
      <View style={[styles.shadow, styles.shadow3]}></View>
    </View>
  );
};

export default LoadingAnimation;
