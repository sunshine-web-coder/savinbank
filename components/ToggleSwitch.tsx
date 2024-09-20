import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';

interface ToggleSwitchProps {
  onToggle?: (isOn: boolean) => void;
  initialState?: boolean;
}
export default function ToggleSwitch({ onToggle, initialState = false }:ToggleSwitchProps) {
  const [isOn, setIsOn] = useState(initialState);
  const [animation] = useState(new Animated.Value(isOn ? 1 : 0));

  const toggleSwitch = () => {
    const newState = !isOn;
    setIsOn(newState);
    Animated.timing(animation, {
      toValue: newState ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
    onToggle && onToggle(newState);
  };

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D9D9D9', '#439F6E']
  });

  const circlePosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 20]
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <Animated.View style={[styles.circle, { transform: [{ translateX: circlePosition }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 24,
    borderRadius: 14,
    justifyContent: 'center'
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 13,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4
  }
});
