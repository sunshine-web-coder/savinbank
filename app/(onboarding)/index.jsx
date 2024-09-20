import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';
import { Colors } from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import Logo from '../../components/Logo';

export default function OnboardingScreenOne() {
  return (
    <SafeAreaView className="flex-1 relative">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="flex-1 relative bg-white h-full">
          <Image source={images.onboardingBgImg} resizeMode="cover" className="absolute z-10 top-0 left-0 right-0 bottom-0 w-full h-full" alt="overlay-image" />
          <Logo />
          <View className={`flex items-center mt-10`}>
            <Image source={images.onboardingImg} resizeMode="contain" alt="onboarding image" className="w-[488.24px] relative top-9 h-[490px]" />
          </View>
          <View className={`w-full px-[20px] left-0 right-0 min-h-28 absolute bottom-[80px] z-20 flex-col justify-start items-start gap-1`}>
            <Text className={'text-[#575757] text-base font-normal leading-normal'} style={{ fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }}>
              Welcome to Savin Bank
            </Text>
            <Text className={`w-full mb-[32px] text-[28px] font-semibold leading-[42px]`} style={{ fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack  }}>
              Managing Your Finances Regularly with Savin
            </Text>
            <CustomButton title="Get Started" handlePress={() => router.push('/onboardingscreentwo')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
