import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import images from '@/constants/images';
import { Colors } from '@/constants/Colors';
import { AddIcon, NotificationIcon } from '@/components/SvgIcon';
import { mainAccountIcon, notifications, sendMoneyData } from '@/components/MockData';
import RecentTransaction from '@/components/account/transaction/RecentTransaction';
import { Link, router } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import CopiedAlertModal from '@/components/modal/CopiedAlertModal';
import { RefreshControl } from 'react-native';

export default function UserAccount() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [copiedText, setCopiedText] = useState('');
  const notificationCount = notifications.length;

  const copyToClipboard = (text: string) => {
    Clipboard.setStringAsync(text);
    setCopiedText(text);
    setAlertVisible(true); // Show the custom alert
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <View style={tw`mt-5 flex-col gap-[24px]`}>
          <View style={tw`px-5 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-3`}>
              <Image source={images.profileImg} style={tw`w-[48px] h-[48px] rounded-full`} />
              <View style={tw`flex-col gap-[4px]`}>
                <Text style={[tw`text-xs font-normal leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }]}>Good Morning</Text>
                <Text style={[tw`text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Olivia Vichentie</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[tw`w-[42px] h-[42px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}
              onPress={() => router.push('/notification')}
            >
              <NotificationIcon />
              {notificationCount > 0 && (
                <View style={tw`absolute top-0 right-0 bg-red-500 rounded-full w-[18px] h-[18px] items-center justify-center`}>
                  <Text style={[tw`text-xs text-white`, { fontFamily: 'PlusJakartaSans_semibold' }]}>{notificationCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={tw`px-5`}>
            <View style={[tw`p-3 px-4 gap-4 rounded-xl shadow-xl`, { backgroundColor: Colors.light.primary }]}>
              <View style={tw`flex-row justify-between gap-2`}>
                <View style={tw`flex-row items-center gap-2`}>
                  <Text style={[tw``, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.textWhite }]}>Available Balance</Text>
                  <Feather name="eye" size={15} style={tw`relative top-[3px]`} color={Colors.light.textWhite} />
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => copyToClipboard('9079700000')} style={tw`flex-row items-center gap-2`}>
                  <Text style={[tw`text-xs`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.textWhite }]}>9079700000</Text>
                  <Ionicons name="copy-sharp" size={15} style={tw`relative`} color={Colors.light.textWhite} />
                </TouchableOpacity>
              </View>
              <Text style={[tw`text-[23px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.textWhite }]}>₦10,360,000.99</Text>
            </View>
          </View>
          <View style={tw`px-5 flex-row justify-between gap-[26px]`}>
            {mainAccountIcon.map((item, index) => (
              <Link key={index} href={item.url as any}>
                <View style={tw`flex-col items-center gap-2`}>
                  <View style={[tw`w-[64px] h-[64px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>{item.icon && <item.icon />}</View>
                  <Text style={[tw`text-xs font-semibold leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>{item.label}</Text>
                </View>
              </Link>
            ))}
            {/* <Link href="/features"><Text>More</Text></Link> */}
          </View>
          <View style={tw`pl-5`}>
            <Text style={[tw`text-base font-semibold leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Send Money</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-4`}>
              <View style={tw`flex-row gap-[26px] mr-4`}>
                <View style={tw`flex-col items-center gap-2`}>
                  <TouchableOpacity style={[tw`w-[60px] h-[60px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
                    <AddIcon />
                  </TouchableOpacity>
                  <Text style={[tw`text-xs font-semibold leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Add</Text>
                </View>
                {sendMoneyData.map((user, index) => (
                  <View key={index} style={tw`flex-col items-center gap-2`}>
                    <TouchableOpacity style={[tw`w-[60px] h-[60px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
                      <Image source={user.userAvatar} resizeMode="contain" style={tw`w-[60px] h-[60px] rounded-full`} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={[tw`text-xs w-[60px] font-semibold leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>
                      {user.fullName}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={tw`px-5`}>
            <RecentTransaction />
          </View>
        </View>
      </ScrollView>
      <CopiedAlertModal visible={alertVisible} onClose={() => setAlertVisible(false)} />
    </SafeAreaView>
  );
}
