import Button from '@/components/Button';
import CustomHeader from '@/components/CustomHeader';
import InputField from '@/components/InputField';
import { sendMoneyData } from '@/components/MockData';
import { DotsIcon, SearchIcon } from '@/components/SvgIcon';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function TransferScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter the list based on the search query
  const filteredSendMoneyData = sendMoneyData.filter(user => user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || user.accountNumber?.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Transfer Money" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      {/* ScrollView with RefreshControl */}
      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`pb-20`} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <View style={tw`px-5`}>
          {/* Recent Transfers */}
          <View>
            <Text style={[tw`text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Recent Transfer</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-4`}>
              <View style={tw`flex-row gap-[26px] mr-4`}>
                {sendMoneyData.map((user, index) => (
                  <View key={index} style={tw`flex-col items-center gap-2`}>
                    <TouchableOpacity style={[tw`w-[60px] h-[60px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
                      <Image source={user.userAvatar} resizeMode="contain" style={tw`w-[60px] h-[60px] rounded-full`} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={[tw`text-xs w-[60px] leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>
                      {user.fullName}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Search Input */}
          <View style={[tw`mt-[25px] flex-col gap-[25px]`]}>
            <View style={[tw`relative`]}>
              <SearchIcon style={tw`absolute top-[17px] left-3 z-10`} />
              <InputField
                placeholder="Search List"
                value={searchQuery}
                onChangeText={setSearchQuery}
                inputStyles={[tw`pl-[40px] w-full rounded-[100px] text-[#575757] text-sm font-normal leading-[16.80px]`, { backgroundColor: Colors.light.secondaryLightGrey }]}
                keyboardType="default"
                maxLength={100}
              />
            </View>
          </View>

          {/* Transfer List */}
          <View style={tw`mt-[25px]`}>
            <Text style={[tw`text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Transfer List</Text>
            {filteredSendMoneyData.map((user, index) => (
              <View key={index}>
                <TouchableOpacity style={tw`w-full border-b border-[#F6F6F6] py-[10px] flex-row items-center justify-between gap-3`}>
                  <View style={tw`flex-row items-center gap-2`}>
                    <View style={[tw`w-[54px] h-[54px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
                      <Image source={user.userAvatar} resizeMode="contain" style={tw`w-full h-full rounded-full`} />
                    </View>
                    <View style={tw`flex-col gap-[4px]`}>
                      <Text numberOfLines={1} style={[tw`text-sm max-w-[200px] leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>
                        {user.fullName}
                      </Text>
                      <Text style={[tw`text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }]}>{user.accountNumber}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={tw`flex-col gap-[4px]`}>
                    <DotsIcon />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed "Add New Receiver" Button */}
      <View style={tw`p-5`}>
        <Button title="Add New Receiver" onPress={() => router.push('/add-receiver')} buttonStyle={tw`rounded-[100px] border-0`} />
      </View>
    </SafeAreaView>
  );
}
