import { Colors } from '@/constants/Colors';
import React from 'react';
import { TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import tw from 'twrnc';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
  disabled?: boolean; // Add disabled prop
};

export default function Button({
  title,
  onPress,
  buttonStyle,
  textStyle,
  loading = false,
  activeOpacity = 0.9,
  disabled = false, // Default value for disabled prop
  ...props
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress} // Disable onPress when button is disabled
      style={[
        tw`flex-row gap-2 items-center border justify-center rounded-[6px] p-[13px_40px]`,
        {
          backgroundColor: disabled ? Colors.light.primaryPurple : Colors.light.primary // Change background color when disabled
        },
        buttonStyle
      ]}
      activeOpacity={activeOpacity} // Set the active opacity
      disabled={disabled || loading} // Disable button when loading or disabled
      {...props} // Pass any additional TouchableOpacity props
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" /> // Show loading indicator
      ) : (
        <Text style={[tw`text-base`, { color: Colors.light.textWhite }, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
