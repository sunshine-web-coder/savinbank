import Button from '@/components/Button';
import CustomHeader from '@/components/CustomHeader';
import InputField from '@/components/InputField';
import { sendMoneyData } from '@/components/MockData';
import { DotsIcon, SearchIcon, VerifiedIcon } from '@/components/SvgIcon';
import { Colors } from '@/constants/Colors';
import { formatCurrency } from '@/constants/formatCurrency';
import images from '@/constants/images';
import { useReceiver } from '@/provider/ReceiverProvider';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function TransferMoneyScreen() {
  const { bankName, accountNumber } = useReceiver();
  const [transferAmount, setTransferAmount] = useState('');

  const handleAmountChange = (value: string) => {
    // Allow only numeric input
    const numericValue = value.replace(/[^0-9]/g, '');
    setTransferAmount(numericValue);
  };

  const handlePayNow = () => {
    if (transferAmount && parseInt(transferAmount) >= 100) {
      router.push({
        pathname: '/enter-pin',
        params: { action: 'transferMoney' }
      });
    } else {
      Alert.alert('Error', 'Please enter a valid amount (Minimum ₦100).');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Transfer Money" headerStyle={tw`justify-start gap-[60px]`} showFlashButton={false} showShareButton={false} />
      {/* ScrollView with RefreshControl */}
      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`pb-20`}>
        <View style={tw``}>
          <View style={tw`px-5`}>
            <Text style={[tw`text-[${Colors.light.mainBlack}] text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Destination Number</Text>
            <View style={tw`flex-row gap-[8px] items-center mt-[17px]`}>
              <Image source={images.avatar1} style={tw`w-[50px] h-[50px] rounded-full`} />
              <View style={tw`gap-[8px]`}>
                <Text style={tw`text-base font-bold`}>Anastasia Huzhie</Text>
                <Text style={tw`text-sm text-gray-600`}>
                  {bankName} - {accountNumber}
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`w-full h-[8px] my-[24px] bg-[${Colors.light.secondaryLightGrey}]`} />
          <View style={tw`px-5`}>
            <View style={tw`gap-[8px] relative`}>
              <Text style={[tw`absolute text-[${Colors.light.secondary}] text-lg top-9 left-3 z-10`, { fontFamily: 'PlusJakartaSans_normal' }]}>₦</Text>
              <InputField
                label="Transfer Amount"
                value={transferAmount}
                onChangeText={handleAmountChange} // Use handler for numeric input
                inputStyles={[tw`bg-[${Colors.light.secondaryLightGrey}] pl-8`]}
                keyboardType="numeric" // Ensure only numeric keyboard is shown
              />
              <Text style={[tw`text-[${Colors.light.secondary}] text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal' }]}>Minimal Transfers ₦100</Text>
            </View>

            <View style={tw`mt-[24px]`}>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={[tw`text-neutral-900 text-sm font-semibold leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Funding Source</Text>
                <TouchableOpacity activeOpacity={1} onPress={() => router.push('/transfer-money')}>
                  <Text style={[tw`text-xs font-semibold leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.primary }]}>See All</Text>
                </TouchableOpacity>
              </View>
              <View style={[tw`mt-[16px] flex-row justify-between rounded-[10px]`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
                <View style={tw`w-full p-5 gap-[12px]`}>
                  <View style={tw`flex-row items-center gap-[8px]`}>
                    <Text style={[tw`text-sm flex-row items-center leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Savin Bank Wallet</Text>
                    <VerifiedIcon style={tw``} />
                  </View>
                  <Text style={[tw`text-lg leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>₦50,000</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed "Add New Receiver" Button */}
      <View style={tw`p-5`}>
        <Button title="Pay Now" onPress={handlePayNow} buttonStyle={tw`rounded-[100px] border-0`} disabled={!transferAmount} />
      </View>
    </SafeAreaView>
  );
}
