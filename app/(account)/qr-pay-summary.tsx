import { View, Text, ScrollView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import images from '@/constants/images';
import InputField from '@/components/InputField';
import { formatCurrency } from '@/constants/formatCurrency';
import { VerifiedIcon } from '@/components/SvgIcon';
import CustomButton from '@/components/CustomButton';

export default function QrPaySummaryScreen() {
  const { type, data } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [qrPayAmount, setQrPayAmount] = useState('20000');

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="QR Pay" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <View className="flex-1 relative">
          <View style={tw`px-5`}>
            <Text style={[tw`text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Merchant Information</Text>
            <View style={tw`flex-row items-center gap-3 mt-[17px]`}>
              <Image source={images.chickenRepublicLogo} style={tw`w-[54px] h-[54px] rounded-full`} />
              <View style={tw`flex-col gap-[8px]`}>
                <Text style={[tw`text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Chicken Republic</Text>
                <Text style={[tw`text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.mainBlack }]}>Iwo Road, Ibadan, Nigeria</Text>
              </View>
            </View>
          </View>
          <View style={[tw`w-full h-[8px] my-[24px]`, { backgroundColor: Colors.light.secondaryLightGrey }]} />
          <View style={tw`px-5`}>
            <InputField
              label="Bill Amount"
              value={formatCurrency(Number(qrPayAmount))}
              onChangeText={value => {
                setQrPayAmount(value);
              }}
              readOnly={true}
              inputStyles={[tw`border border-[#5A63F6]`]}
            />
            <View style={tw`mt-3`}>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={[tw`text-neutral-900 text-sm font-semibold leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Funding Source</Text>
                <TouchableOpacity activeOpacity={1} onPress={() => router.push('/qr-pay-summary')}>
                  <Text style={[tw`text-xs font-semibold leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.primary }]}>See All</Text>
                </TouchableOpacity>
              </View>
              <View style={[tw`mt-[16px] flex-row justify-between rounded-[10px]`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
                <View style={tw`w-full p-5 gap-[12px]`}>
                  <View style={tw`flex-row items-center gap-[8px]`}>
                    <Text style={[tw`text-sm flex-row items-center leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Savin Bank Wallet</Text>
                    <VerifiedIcon style={tw``} />
                  </View>
                  <Text style={[tw`text-lg leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>{formatCurrency(Number(qrPayAmount))}</Text>
                </View>
                {/* <View style={tw`border w-[195px] bg-red-500 border-red-500`}></View> */}
              </View>
            </View>
          </View>
          <View style={tw`absolute w-full right-0 left-0 bottom-[27px] px-5`}>
            <CustomButton title="Pay Now" handlePress={() => router.push({ pathname: '/enter-pin', params: { action: 'qrPay' } })} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
