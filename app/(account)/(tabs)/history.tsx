import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import CustomHeader from '@/components/CustomHeader';
import { transactionHistory } from '@/components/MockData';
import { EwalletIcon, PayElectricityIcon, AirtimeTopUpIcon, ArrowUpIcon, ArrowDownIcon, QrScanIcon, TvIcon } from '@/components/SvgIcon';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'E-Wallet-Top-Up':
        return <EwalletIcon width={18} height={18} />;
      case 'Pay-Electricity-Bills':
        return <PayElectricityIcon width={18} height={18} />;
      case 'Airtime-Top-Up':
        return <AirtimeTopUpIcon width={18} height={18} />;
      case 'Transfer-To':
        return <ArrowUpIcon width={16} height={16} />;
      case 'Transfer-From':
        return <ArrowDownIcon width={16} height={16} />;
      case 'Tv-Bill-Pay':
        return <TvIcon width={15} height={15} />;
      case 'QR-Pay':
        return <QrScanIcon width={16} height={16} />;
      default:
        return null;
    }
  };

  const getTransferText = (type: string, title: string) => {
    switch (type) {
      case 'Transfer-To':
        return `to ${title}`;
      case 'Transfer-From':
        return `from ${title}`;
      default:
        return null;
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="History" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <View style={tw`px-5 hidden bg-gray-100 py-4 mb-2`}>
        <Text className="" style={tw`text-center`}>
          Filter Container
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <View style={tw`flex-1 px-5 pb-10`}>
          {transactionHistory.length === 0 && (
            <Text style={[tw`text-base text-center mt-5 hover:underline leading-tight`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.mainBlack }]}>No recent transaction</Text>
          )}
          {transactionHistory.map((transaction, index) => (
            <TouchableOpacity key={index} style={tw`w-full border-b border-[#F6F6F6] py-[10px] flex-row items-center justify-between gap-3`}>
              <View style={tw`flex-row items-center gap-3`}>
                {getIcon(transaction.type) && (
                  <View style={[tw`w-[35px] h-[35px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>{getIcon(transaction.type)}</View>
                )}
                <View style={tw`flex-col gap-[4px]`}>
                  <Text numberOfLines={1} style={[tw`text-xs max-w-[200px] font-semibold leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>
                    {transaction.type === 'Transfer-To' || transaction.type === 'Transfer-From' ? getTransferText(transaction.type, transaction.title) : transaction.title}
                  </Text>
                  <Text style={[tw`text-[10px] font-normal leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }]}>{transaction.date}</Text>
                </View>
              </View>
              <View style={tw`flex-col gap-[4px]`}>
                <Text style={[tw`text-xs text-right font-semibold leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.primary }]}>{transaction.amount}</Text>
                <Text style={[tw`text-[10px] bg-[#d8d9f7] p-[1px] px-[4px] text-center rounded leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.primary }]}>
                  {transaction.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
