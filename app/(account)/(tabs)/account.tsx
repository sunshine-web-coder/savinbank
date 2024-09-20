import { View, Text, ScrollView, RefreshControl, Image, TouchableOpacity, ImageBackground, Switch } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import tw from 'twrnc';
import images from '@/constants/images';
import { Colors } from '@/constants/Colors';
import { Entypo, Feather, FontAwesome, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { formatCurrency } from '@/constants/formatCurrency';
import Button from '@/components/Button';
import { router } from 'expo-router';
import { BiometricIcon, PasswordLockIcon, PhoneIcon, PinSecureIcon, StarIcon } from '@/components/SvgIcon';
import ToggleSwitch from '@/components/ToggleSwitch';

export default function AccountScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Account" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <View style={tw`flex-1 px-5 pb-[70px]`}>
          <TouchableOpacity activeOpacity={1} onPress={() => router.push('/detail-account')}>
            <ImageBackground source={images.accountImgPattern} resizeMode="cover" style={tw`w-full flex-row items-center justify-between w-full p-5 bg-[${Colors.light.primary}] rounded-[10px]`}>
              <View style={tw`flex-row items-center gap-3`}>
                <Image source={images.profileImg} style={tw`w-[58px] h-[58px] rounded-full`} />
                <View style={tw`flex-col gap-[8px]`}>
                  <Text style={[tw`text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.textWhite }]}>Olivia Vicenthie</Text>
                  <Text style={[tw`text-xs font-normal leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.textWhite }]}>oliviavee@gmail.com</Text>
                </View>
              </View>

              <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
            </ImageBackground>
          </TouchableOpacity>
          <View style={tw`gap-[24px] mt-[24px]`}>
            {/* Settings */}
            <View>
              <Text style={[tw`text-[${Colors.light.mainBlack}] mb-[14px] text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Settings</Text>
              <View style={tw`gap-4`}>
                <TouchableOpacity activeOpacity={1} style={tw`px-4 py-[11px] bg-[${Colors.light.secondaryLightGrey}] rounded-[10px] flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center gap-[12px]`}>
                    <BiometricIcon />
                    <Text style={[tw`text-[${Colors.light.mainBlack}]  text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Biometric Login</Text>
                  </View>
                  <View>
                    <ToggleSwitch />
                  </View>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  activeOpacity={1}
                  style={tw`px-4 py-[11px] bg-[${Colors.light.secondaryLightGrey}] rounded-[10px] flex-row items-center justify-between`}
                  onPress={() => router.push('/language')}
                >
                  <View style={tw`flex-row items-center gap-[12px]`}>
                    <SimpleLineIcons name="globe" size={24} color={Colors.light.mainBlack} />
                    <Text style={[tw`text-[${Colors.light.mainBlack}]  text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Language</Text>
                  </View>
                  <View>
                    <MaterialIcons name="arrow-forward-ios" size={24} color={Colors.light.mainBlack} />
                  </View>
                </TouchableOpacity> */}

                <TouchableOpacity activeOpacity={1} style={tw`px-4 py-[11px] bg-[${Colors.light.secondaryLightGrey}] rounded-[10px] flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center gap-[12px]`}>
                    <FontAwesome name="moon-o" size={24} color={Colors.light.mainBlack} />
                    <Text style={[tw`text-[${Colors.light.mainBlack}]  text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Dark Mode</Text>
                  </View>
                  <View>
                    <ToggleSwitch />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Password & Security */}
            <View>
              <Text style={[tw`text-[${Colors.light.mainBlack}] mb-[14px] text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Password & Security</Text>
              <View style={tw`gap-4`}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={tw`px-4 py-[11px] bg-[${Colors.light.secondaryLightGrey}] rounded-[10px] flex-row items-center justify-between`}
                  onPress={() => router.push('/change-pin')}
                >
                  <View style={tw`flex-row items-center gap-[12px]`}>
                    <PinSecureIcon />
                    <Text style={[tw`text-[${Colors.light.mainBlack}]  text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>PIN</Text>
                  </View>
                  <View>
                    <MaterialIcons name="arrow-forward-ios" size={24} color={Colors.light.mainBlack} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  style={tw`px-4 py-[11px] bg-[${Colors.light.secondaryLightGrey}] rounded-[10px] flex-row items-center justify-between`}
                  onPress={() => router.push('/change-password')}
                >
                  <View style={tw`flex-row items-center gap-[12px]`}>
                    <PasswordLockIcon />
                    <Text style={[tw`text-[${Colors.light.mainBlack}]  text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Password</Text>
                  </View>
                  <View>
                    <MaterialIcons name="arrow-forward-ios" size={24} color={Colors.light.mainBlack} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Information */}
            <View>
              <Text style={[tw`text-[${Colors.light.mainBlack}] mb-[14px] text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Information</Text>
              <View style={tw`gap-4`}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={tw`px-4 py-[11px] bg-[${Colors.light.secondaryLightGrey}] rounded-[10px] flex-row items-center justify-between`}
                  onPress={() => router.push('/contact-us')}
                >
                  <View style={tw`flex-row items-center gap-[12px]`}>
                    <PhoneIcon />
                    <Text style={[tw`text-[${Colors.light.mainBlack}]  text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Contact Us</Text>
                  </View>
                  <View>
                    <MaterialIcons name="arrow-forward-ios" size={24} color={Colors.light.mainBlack} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={tw`px-4 py-[11px] bg-[${Colors.light.secondaryLightGrey}] rounded-[10px] flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center gap-[12px]`}>
                    <StarIcon />
                    <Text style={[tw`text-[${Colors.light.mainBlack}]  text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>App Version</Text>
                  </View>
                  <Text style={[tw`text-[${Colors.light.secondary}]  text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal' }]}>2.10.10</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Logout */}
            <View>
              <Text style={[tw`text-[${Colors.light.mainBlack}] mb-[14px] text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Logout</Text>
              <View style={tw`gap-4`}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={tw`px-4 py-[11px] bg-[${Colors.light.secondaryLightGrey}] rounded-[10px] flex-row items-center justify-between`}
                  onPress={() => router.push('/login')}
                >
                  <View style={tw`flex-row items-center gap-[12px]`}>
                    <MaterialIcons name="logout" size={24} color="black" />
                    <Text style={[tw`text-[${Colors.light.mainBlack}]  text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Logout</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
