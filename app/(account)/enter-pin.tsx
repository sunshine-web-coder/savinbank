import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import tw from 'twrnc';
import EnterPin from '@/components/EnterPin';
import { Colors } from '@/constants/Colors';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function EnterPinScreen() {
  const mockPin = '1234'; // Mock PIN for demonstration

  // Get the action type from route parameters
  const { action } = useLocalSearchParams(); // 'action' can be 'transfer', 'editName', etc.
  const router = useRouter();

  const handlePinComplete = (pin: string) => {
    if (pin === mockPin) {
      if (action === 'transferMoney') {
        // Navigate to payment-success page after successful transfer
        router.push('/payment-success');
      } else if (action === 'editName') {
        // Navigate to edit name page after successful PIN verification
        router.push('/change-name');
      } else if (action === 'editPhone') {
        // Navigate to edit email page after successful PIN verification
        router.push('/change-phone-number');
      } else if (action === 'changePassword') {
        // Navigate to edit email page after successful PIN verification
        router.push('/change-phone-number');
      } else if (action === 'qrPay') {
        // Navigate to edit email page after successful PIN verification
        router.push('/payment-success');
      } else {
        // Default or other actions
        Alert.alert('Action not recognized');
      }
    } else {
      Alert.alert('Error', 'Incorrect PIN, please try again.');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="PIN" headerStyle={tw`justify-start gap-[125px]`} showFlashButton={false} showShareButton={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={tw`px-5 justify-center items-center`}>
          <View style={tw`gap-[12px] mb-[48px]`}>
            <Text style={[tw`text-center text-neutral-900 text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Enter PIN</Text>
            <Text style={[tw`text-center text-neutral-900 text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }]}>Please enter your 4-digit PIN</Text>
          </View>
          <Text style={tw`mb-3`}>Enter: 1234</Text>
          <EnterPin length={4} onComplete={handlePinComplete} containerStyles={tw`mb-[16px]`} inputStyles={tw`w-[72px]`} />
          <TouchableOpacity activeOpacity={1}>
            <Text style={[tw`text-center text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.primary }]}>Forgot PIN?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
