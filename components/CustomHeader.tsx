import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { ArrowBackIcon, FlashIcon, ShareIcon } from './SvgIcon';

// Define the props type
interface CustomHeaderProps {
  title: string;
  headerStyle?: ViewStyle; // Optional ViewStyle for header
  headerTextStyle?: TextStyle; // Optional TextStyle for title text
  showBackButton?: boolean;
  showFlashButton?: boolean;
  showShareButton?: boolean;
}

export default function CustomHeader({ title, headerStyle, headerTextStyle, showBackButton = true, showFlashButton = true, showShareButton = true }: CustomHeaderProps) {
  return (
    <View style={[tw`w-full flex-row justify-between mb-5 mt-5 bg-transparent items-center px-4`, headerStyle]}>
      {showBackButton && (
        <TouchableOpacity style={[tw`w-[42px] h-[42px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]} onPress={() => router.back()}>
          <ArrowBackIcon />
        </TouchableOpacity>
      )}
      <Text style={[tw`text-center text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }, headerTextStyle]}>{title}</Text>

      {showFlashButton && (
        <TouchableOpacity style={[tw`w-[42px] h-[42px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
          <FlashIcon />
        </TouchableOpacity>
      )}
      {showShareButton && (
        <TouchableOpacity style={[tw`w-[42px] h-[42px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
          <ShareIcon />
        </TouchableOpacity>
      )}
    </View>
  );
}
