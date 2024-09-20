import { View, Text, ScrollView, RefreshControl, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import tw from 'twrnc';
import images from '@/constants/images';
import { Colors } from '@/constants/Colors';
import { Entypo, Feather } from '@expo/vector-icons';
import { formatCurrency } from '@/constants/formatCurrency';
import Button from '@/components/Button';
import { router } from 'expo-router';

const cardData = [
  {
    name: 'Olivia Vichentie',
    bgImg: images.patternImgPrimaryPurple,
    cardNumber: '3296 1547 0800 8739',
    balance: 50000,
    color: `${Colors.light.btnColor}`
  },
  {
    name: 'Olivia Vichentie',
    bgImg: images.patternImgGreenGreen,
    cardNumber: '1547 3296 8739 0800',
    balance: 1030000,
    color: `#00838F`
  }
];

export default function CardScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="My Cards" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <View style={tw`flex-1 gap-4 px-5 pb-10`}>
          {cardData.map((cardDetails, i) => (
            <ImageBackground key={i} source={cardDetails.bgImg} style={tw`p-5 relative overflow-hidden rounded-[20px] bg-[${cardDetails.color}]`} imageStyle={tw`rounded-[20px]`} resizeMode="cover">
              <View style={tw`flex-row justify-between`}>
                <View style={tw`gap-[4px]`}>
                  <Text style={[tw`text-white text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal' }]}>Name</Text>
                  <Text style={[tw`text-white text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>{cardDetails.name}</Text>
                </View>
                <Image source={images.visaLogo} style={tw`w-[55px] h-[18px]`} alt="visa-logo" />
              </View>
              <Text style={[tw`text-white text-xl leading-tight my-[24px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>{cardDetails.cardNumber}</Text>
              <View style={tw`flex-row justify-between`}>
                <View style={tw`gap-[4px]`}>
                  <Text style={[tw`text-white text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal' }]}>Balance</Text>
                  <Text style={[tw`text-white text-xl leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>{formatCurrency(Number(cardDetails.balance))}</Text>
                </View>
                <Feather name="eye-off" size={24} color="white" style={tw`relative top-4`} />
              </View>
            </ImageBackground>
          ))}

          <TouchableOpacity
            style={tw`bg-white flex-row gap-2 items-center justify-center min-h-[60px] rounded-[100px] border-dashed border border-[${Colors.light.primary}]`}
            onPress={() => router.push('/add-new-card')}
          >
            <Entypo name="plus" size={24} color={`${Colors.light.btnColor}`} />
            <Text style={[tw`text-base leading-tight text-[${Colors.light.btnColor}]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Add New Card</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
