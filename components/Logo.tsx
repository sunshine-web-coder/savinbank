import { View, Text } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import images from '../constants/images';
import { Colors } from '../constants/Colors';
import tw from 'twrnc';

export default function Logo() {
  return (
    <View style={tw`flex flex-row gap-3 items-center justify-center pt-[32px]`}>
      <Image source={images.logo} resizeMode="contain" alt="logoImg" style={tw`w-8 h-8`} />
      <Text style={[tw`text-xl font-bold leading-7`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>
        Savin Bank
      </Text>
    </View>
  );
}
