import CustomHeader from '@/components/CustomHeader';
import { notifications } from '@/components/MockData';
import { Colors } from '@/constants/Colors';
import images from '@/constants/images';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export default function NotificationScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Notification" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <View style={tw`flex-1 px-5 pb-10`}>
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={tw`mb-2 flex-row gap-2 border border-gray-200 p-3 rounded-lg`}>
              <Image source={images.logo} style={tw`w-[20px] h-[20px] rounded-full`} />
              <View style={tw`flex-1 gap-4`}>
                <Text style={[tw`text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>{item.title}</Text>
                {item.name && item.amount && item.title.includes('Credit') && (
                  <Text style={[tw`text-xs leading-[18.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.mainBlack }]}>
                    You have just received NGN{item.amount} from {item.name}.
                  </Text>
                )}
                {item.name && item.amount && item.title.includes('transfer') && (
                  <Text style={[tw`text-xs leading-[18.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.mainBlack }]}>
                    Your transfer of NGN{item.amount} to {item.name} was successful.
                  </Text>
                )}
                {item.description && <Text style={[tw`text-xs leading-[18.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.mainBlack }]}>{item.description}</Text>}
                <View style={tw`flex-row items-center justify-between border-t border-gray-100 pt-2`}>
                  <Text style={[tw`text-[10px] leading-3`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }]}>
                    {item.status} {item.time}
                  </Text>
                  <Link href="/" style={[tw`text-[10px] leading-3`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.primary }]}>
                    More Details
                  </Link>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
