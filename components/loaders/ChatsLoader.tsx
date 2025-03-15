import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";


const ChatsLoader = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.96, 
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, 
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {[...Array(12)].map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.chatItem,
            {
              backgroundColor: "#E8E8E8",
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />
      ))}
    </View>
  );
};

export default ChatsLoader;



const styles = StyleSheet.create({
  chatItem: {
    paddingHorizontal:6,
    paddingVertical: 10,
    borderRadius: 18,
    marginVertical: 4,
    height:49,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    gap:8
},
})