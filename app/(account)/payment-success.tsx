import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import tw from 'twrnc';
import { PaymentSuccessIcon } from '@/components/SvgIcon';
import { Colors } from '@/constants/Colors';
import Button from '@/components/Button';
import { router } from 'expo-router';

export default function PaymentSuccessScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Button Pressed');
    }, 2000); // Simulate an API call or some processing
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const paymentStatusData = [
    {
      leftText: 'Ref. Number',
      rightText: '12389375093011087'
    },
    {
      leftText: 'Funding Source',
      rightText: 'Olivia Vicenthie'
    },
    {
      leftText: 'Transaction Type',
      rightText: 'QR Pay'
    },
    {
      leftText: 'Payment To',
      rightText: 'McD Perdatam Raya'
    },
    {
      leftText: 'Amount',
      rightText: '₦175.00'
    },
    {
      leftText: 'Transaction Fee',
      rightText: '₦0.00'
    },
    {
      leftText: 'Total',
      rightText: '₦175.00'
    }
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <CustomHeader title="Payment Status" headerTextStyle={tw``} showFlashButton={false} />
        <View style={tw`px-5 flex-col items-center`}>
          <PaymentSuccessIcon />
          <View style={tw`flex-col gap-2 items-center my-4`}>
            <Text style={[tw`text-center text-xl leading-normal`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Payment Success</Text>
            <Text style={[tw`text-center text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }]}>Sat, 17 Jun 2023 • 15.00 PM</Text>
          </View>
          <View style={[tw`rounded-[10px] flex-col gap-3 p-4 w-full`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
            {paymentStatusData.map((data, i) => (
              <View key={i} style={tw``}>
                <View style={tw`flex-row justify-between`}>
                  <Text style={[tw`text-xs leading-normal leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }]}>{data.leftText}</Text>
                  <Text style={[tw`text-xs leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>{data.rightText}</Text>
                </View>
                {(i === 3 || i === 5) && (
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: '#D9D9D9',
                      marginTop: 15
                    }}
                  />
                )}
              </View>
            ))}
          </View>
          <View style={tw`w-full flex-col gap-4 mt-[72px]`}>
            <Button
              title="Get PDF"
              onPress={handlePress}
              loading={isLoading} // Pass the loading state
              buttonStyle={tw`w-full h-[51px] border-0 rounded-[100px] bg-white border border-[#5A63F6]`} // Custom button styles
              textStyle={{ color: Colors.light.primary }}
            />
            <Button
              title="Back to Home"
              onPress={() => router.push('/home')}
              buttonStyle={tw`w-full h-[51px] border-0 rounded-[100px]`} // Custom button styles
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
