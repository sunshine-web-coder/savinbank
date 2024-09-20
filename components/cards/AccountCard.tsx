import { View, Text, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Colors } from '@/constants/Colors';
import images from '@/constants/images';

export default function AccountCard() {
  return (
    <View style={[tw`w-[325px] h-[198px] flex-row justify-between p-5 rounded-[20px] mr-4`, { backgroundColor: Colors.light.primary }]}>
      <View style={tw`flex-col justify-between gap-5`}>
        <View style={tw`flex-col gap-[4px]`}>
          <Text style={[tw`text-xs font-normal leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.textWhite }]}>Name</Text>
          <Text style={[tw`text-base font-semibold leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.textWhite }]}>Olivia Vichentie</Text>
        </View>
        <Text style={[tw`text-xl font-semibold leading-normal`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.textWhite }]}>3296 1547 0800 8739</Text>
        <View style={tw`flex-col gap-[4px]`}>
          <Text style={[tw`text-xs font-normal leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.textWhite }]}>Balance</Text>
          <Text style={[tw`text-2xl font-semibold leading-[28.80px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.textWhite }]}>₦ 200000</Text>
        </View>
      </View>
      <View style={tw`items-center flex-col justify-between`}>
        <Image source={images.visaLogo} resizeMode="contain" style={tw`w-[55px] h-[18px]`} />
        <Image source={images.eysSlash} resizeMode="contain" style={tw`w-[24px] h-[24px]`} />
      </View>
    </View>
  );
}
