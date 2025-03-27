import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";

const TypingIndicator = () => {
  const colorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(colorAnimation, {
            toValue: 1,
            duration: 700,
            useNativeDriver: false,
          }),
          Animated.timing(colorAnimation, {
            toValue: 0,
            duration: 700,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }, []);


  const animatedColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["black" , "gray"], 
  });

  return (
      <View style={styles.wrapper}>
        <Animated.Text style={[styles.typingText, { color: animatedColor }]}>
          Typing...
        </Animated.Text>
      </View>
    )
};

const styles = StyleSheet.create({
    wrapper:{
        display:"flex",
        flexDirection:"row",
        gap:8,
        alignItems:"center",
        justifyContent:"flex-start",
        paddingTop:10,
        width:"100%",
        paddingHorizontal:10,
      },
  typingText: {
    backgroundColor: "lightgray",
    padding: 7,
    borderRadius: 12,
    fontStyle: "italic",
  },
});

export default TypingIndicator;
