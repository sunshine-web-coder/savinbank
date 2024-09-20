import { View, Alert, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import InputField from '@/components/InputField';
import AuthHeader from '@/components/AuthHeader';
import EnterPin from '@/components/EnterPin';
import { router } from 'expo-router'; // Assuming you're using Expo Router
import SuccessModal from '@/components/modal/SuccessModal';
import images from '@/constants/images';

export default function ChangePinScreen() {
  const [oldPin, setOldPin] = useState('');
  const [openNewPin, setOpenNewPin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const oldMockPin = '1234'; // Mock PIN

  // Check if the entered old PIN matches the mock PIN only after 4 digits have been entered
  useEffect(() => {
    if (oldPin.length === 4) {
      if (oldPin === oldMockPin) {
        setOpenNewPin(true);
      } else {
        Alert.alert('Error', 'Incorrect PIN, please try again.');
      }
    }
  }, [oldPin]);

  const submitNewPin = (enteredPin: string) => {
    if (enteredPin === oldMockPin) {
      Alert.alert('Error', 'New PIN cannot be the same as the old PIN.');
    } else if (enteredPin.length === 4) {
      // Assume new PIN is valid, proceed to next page or show success
      setModalVisible(true);
    } else {
      Alert.alert('Error', 'PIN must be 4 digits.');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Change Pin" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-5 pb-10">
          {openNewPin ? (
            <View>
              <AuthHeader title="Set Your New PIN" subtitle="Please enter a new pin you haven’t used before." />
              <EnterPin length={4} onComplete={submitNewPin} containerStyles={tw`mb-[16px]`} inputStyles={tw`w-[72px]`} />
            </View>
          ) : (
            <View>
              <AuthHeader title="Enter Old PIN" subtitle="To change your pin, please enter your Old PIN" />
              <Text style={tw`mb-3 text-center`}>Enter: 1234</Text>
              <InputField
                label="Old Pin"
                placeholder="Enter your old pin"
                value={oldPin}
                onChangeText={value => {
                  // Ensure that only numeric values are accepted
                  const numericValue = value.replace(/[^0-9]/g, '');
                  setOldPin(numericValue);
                }}
                keyboardType="numeric"
                secureTextEntry={true}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <SuccessModal
        visible={modalVisible}
        image={images.successImg}
        title="Your Pin Successfully Changed"
        message="You can change your pin back after 10 days. Easy and safe transactions only at Savin bank."
        buttonText="Ok"
        onButtonPress={() => {
          setModalVisible(false);
          router.push('/account');
        }}
      />
    </SafeAreaView>
  );
}
