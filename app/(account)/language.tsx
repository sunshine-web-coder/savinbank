import React, { useState } from 'react';

import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { RadioButton } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import images from '@/constants/images';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', flagLogo: images.englishFlag },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩', flagLogo: images.indonesiaFlag },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', flagLogo: images.chineseFlag },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', flagLogo: images.japaneseFlag }
];
export default function LanguageSelectScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Language" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={tw`flex-1 gap-4 px-5 pb-10`}>
          {/* <View style={tw`bg-gray-100 rounded-lg p-4`}> */}
          {languages.map(lang => (
            <TouchableOpacity
              key={lang.code}
              activeOpacity={1}
              style={tw`flex-row px-4 py-[14px] bg-[${Colors.light.secondaryLightGrey}] rounded-[10px] items-center justify-between py-3`}
              onPress={() => setSelectedLanguage(lang.code)}
            >
              <View style={tw`flex-row gap-4 items-center`}>
                <Image source={lang.flagLogo} alt={`${lang.name} flag`} style={tw`w-[32px] h-[32px]`} />
                <Text style={[tw`text-base text-[${Colors.light.mainBlack}] leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>{lang.name}</Text>
              </View>
              <RadioButton value={lang.code} status={selectedLanguage === lang.code ? 'checked' : 'unchecked'} onPress={() => setSelectedLanguage(lang.code)} color="#007AFF" />
            </TouchableOpacity>
          ))}
          {/* </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
