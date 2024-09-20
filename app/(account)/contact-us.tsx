import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import tw from 'twrnc';
import CustomHeader from '@/components/CustomHeader';
import { Colors } from '@/constants/Colors';
// import { AntDesign } from '@expo/vector-icons';

export default function ContactUs() {
  const contactDetails = [
    {
      title: 'Email',
      desc: 'contactus@savinbank.com',
      url: 'mailto:contactus@savinbank.com'
    },
    {
      title: 'Contact Center',
      desc: '12098234904',
      url: 'https://www.call.com'
    },
    {
      title: 'Website',
      desc: 'www.savinbank.com',
      url: 'https://www.savinbank.com'
    },
    {
      title: 'Whatsapp',
      desc: '0891827346712',
      url: 'https://web.whatsapp.com/'
    },
    {
      title: 'Twitter',
      desc: '@contactsavin',
      url: 'https://twitter.com'
    }
  ];

  const handlePress = async (url: string) => {
    if (url.startsWith('http') || url.startsWith('https')) {
      try {
        await WebBrowser.openBrowserAsync(url);
      } catch (error) {
        console.error('Error opening browser:', error);
      }
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Contact Us" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-4 px-5 pb-10">
          {contactDetails.map((detail, i) => (
            <View key={i} style={tw`gap-[8px]`}>
              <Text style={[tw`text-[${Colors.light.mainBlack}] text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>{detail.title}</Text>
              <TouchableOpacity onPress={() => handlePress(detail.url)} style={tw`px-4 py-3.5 bg-[${Colors.light.secondaryLightGrey}] rounded-[10px]`}>
                <Text style={[tw`text-[${Colors.light.secondary}] text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal' }]}>{detail.desc}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
