import { View, Text, RefreshControl, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '@/components/CustomHeader';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { Colors } from '@/constants/Colors';
import { AirtimeTopUpIcon, CashWithdrawalIcon, EwalletIcon, MoreIcon, PayBillIcon, QrScanIcon, ReceiveIcon, SearchIcon, TransferIcon } from '@/components/SvgIcon';
import InputField from '@/components/InputField';
import { SvgProps } from 'react-native-svg';
import { Link } from 'expo-router';

export interface AccountIconGroup {
  label: string;
  icon: (props: SvgProps) => JSX.Element;
  url: string;
}

const featuresScreenIcon = {
  mainFeatures: [
    {
      label: 'Transfer',
      icon: TransferIcon,
      url: '/transfer'
    },
    {
      label: 'E-Wallet',
      icon: EwalletIcon,
      url: '/e-wallet'
    },
    {
      label: 'Pay Bills',
      icon: PayBillIcon,
      url: '/pay-bills'
    },
    {
      label: 'QR Pay',
      icon: QrScanIcon,
      url: '/pay-bills'
    },
    {
      label: 'Cash Withdrawal',
      icon: CashWithdrawalIcon,
      url: '/cash-withdrawal'
    },
    {
      label: 'Cash Deposit',
      icon: EwalletIcon,
      url: '/cash-deposit'
    },
    {
      label: 'Receive',
      icon: ReceiveIcon,
      url: '/receive'
    }
  ],
  moreFeatures: [
    {
      label: 'Loan Fund',
      icon: TransferIcon,
      url: '#'
    },
    {
      label: 'Invest',
      icon: EwalletIcon,
      url: '#'
    },
    {
      label: 'Airtime Top Up',
      icon: AirtimeTopUpIcon,
      url: '#'
    },
    {
      label: 'Insurance',
      icon: QrScanIcon,
      url: '#'
    }
  ]
};

export default function FeaturesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (): void => {
    console.log('Search query:', searchQuery);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Filtering features based on search query
  const filteredMainFeatures = featuresScreenIcon.mainFeatures.filter(feature => feature.label.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredMoreFeatures = featuresScreenIcon.moreFeatures.filter(feature => feature.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Features" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <View style={tw`px-5 mt-4`}>
          <View style={[tw`relative`]}>
            <SearchIcon style={tw`absolute top-[18px] left-3 z-10`} />
            <InputField
              placeholder="Search Features"
              value={searchQuery}
              onChangeText={setSearchQuery}
              inputStyles={[tw`pl-[40px] w-full rounded-[100px] text-[#575757] text-sm font-normal leading-[16.80px]`, { backgroundColor: Colors.light.secondaryLightGrey }]}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Enter') {
                  handleSearch();
                }
              }}
              keyboardType="default"
              maxLength={100}
            />
          </View>
        </View>
        <View style={tw`px-5 mt-6`}>
          {filteredMainFeatures.length > 0 && (
            <>
              <Text style={tw`text-lg font-semibold text-[#333] mb-4`}>Main Features</Text>
              <View className="flex-row flex-wrap justify-start gap-7">
                {filteredMainFeatures.map((feature, index) => (
                  <Link key={index} href={feature.url as any} className="">
                    <View style={tw`flex-col items-center gap-2`}>
                      <View style={[tw`w-[64px] h-[64px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
                        <feature.icon width={24} height={24} />
                      </View>
                      <Text style={[tw`text-xs text-center max-w-[70px] leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>{feature.label}</Text>
                    </View>
                  </Link>
                ))}
              </View>
            </>
          )}

          {filteredMoreFeatures.length > 0 && (
            <>
              <Text style={tw`text-lg font-semibold text-[#333] mt-6 mb-4`}>More Features</Text>
              <View className="flex-row flex-wrap justify-start gap-7">
                {filteredMoreFeatures.map((feature, index) => (
                  <Link key={index} href={feature.url as any} className="">
                    <View style={tw`flex-col items-center gap-2`}>
                      <View style={[tw`w-[64px] h-[64px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
                        <feature.icon width={24} height={24} />
                      </View>
                      <Text style={[tw`text-xs text-center max-w-[70px] leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>{feature.label}</Text>
                    </View>
                  </Link>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
