import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import tw from 'twrnc';
import EnterPin from '@/components/EnterPin';
import { Colors } from '@/constants/Colors';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/Button';
import SuccessModal from '@/components/modal/SuccessModal';
import images from '@/constants/images';

export default function AddNewCardOtpScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [enterOtpCode, setEnterOtpCode] = useState<string>(''); // Store the entered pin

  const mockOtpCode = '1234';

  const handlePinComplete = () => {
    // Compare the entered PIN with the mock PIN
    if (enterOtpCode === mockOtpCode) {
      setModalVisible(true);
    } else {
      Alert.alert('Error', 'Incorrect OTP Code, please try again.');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Add New Card" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={tw`px-5 justify-center items-center`}>
          <View style={tw`gap-[12px] w-full mb-[32px]`}>
            <Text style={[tw`text-neutral-900 text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>OTP Code Verification</Text>
            <Text style={[tw`text-neutral-900 text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }]}>
              Please enter the 4-digit OTP code that we sent to phone number registered with the bank.
            </Text>
          </View>
          <Text style={tw`mb-3`}>Enter: 1234</Text>
          <EnterPin
            length={4}
            onComplete={(pin: string) => setEnterOtpCode(pin)}
            containerStyles={tw`mb-[16px]`}
            inputStyles={tw`w-[72px]`} // Customize the input styles
          />

          <View style={tw`gap-[8px]`}>
            <Text style={[tw`text-neutral-900 text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }]}>Code not sent? ( 02 : 45 )</Text>
            <Button title="Resend" onPress={() => {}} buttonStyle={tw`border-0 p-0 bg-transparent`} textStyle={tw`text-[${Colors.light.primaryPurple}]`} />
          </View>
        </View>
      </ScrollView>
      {/* Fixed Button */}
      <View style={tw`p-5`}>
        <Button title="Next" onPress={handlePinComplete} buttonStyle={tw`rounded-[100px] border-0`} />
      </View>
      <SuccessModal
        visible={modalVisible}
        image={images.successImg}
        title="Your New Card Successfully Added"
        message="You have added a new debit card to the Savin mobile app. Use your card wisely."
        buttonText="Ok"
        onButtonPress={() => {
          setModalVisible(false);
          router.push('/card');
        }}
      />
    </SafeAreaView>
  );
}
