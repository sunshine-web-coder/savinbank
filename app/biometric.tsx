import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '@/components/AuthHeader';
import tw from 'twrnc';
import images from '@/constants/images';
import CustomCheckbox from '@/components/CustomCheckbox';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';
import SuccessModal from '@/components/modal/SuccessModal';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Biometric() {
  const [isChecked, setIsChecked] = useState(true);
  const [scanModalVisible, setScanModalVisible] = useState(false);
  const [scanModalSuccessful, setScanModalSuccessful] = useState(false);

  const openScanModal = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware) {
      Alert.alert('Biometric hardware not available');
      return;
    }

    if (!isEnrolled) {
      Alert.alert('No biometrics enrolled', 'Please enroll biometrics to use this feature.');
      return;
    }

    setScanModalVisible(true);
  };

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Scan your fingerprint',
      fallbackLabel: 'Enter password'
    });

    if (result.success) {
      setScanModalVisible(false);
      setScanModalSuccessful(true);
    } else {
      Alert.alert('Authentication Failed', 'Please try again.');
    }
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={tw`px-5 flex-1 items-center justify-between pt-[80px] pb-10`}>
          <View>
            <AuthHeader title="Enable Biometrics" subtitle="Often forget passwords? Enable secure and convenient login with fingerprint biometrics." />
            <Image source={images.biometricIllustration} resizeMode="contain" style={tw`w-[252px] mt-[63px] h-[252px]`} />
          </View>

          <View style={tw`w-full flex-col items-center gap-3`}>
            <CustomCheckbox checked={isChecked} onPress={toggleCheckbox} />
            <CustomButton title="Enable" handlePress={openScanModal} containerStyles={{ marginTop: 4 }} />
            <CustomButton
              title="Later"
              handlePress={() => router.push('/home')}
              containerStyles={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#5a63f6' }} // Custom background and border color
              textStyles={{ color: Colors.light.primary }}
            />
          </View>
        </View>
      </ScrollView>
      <SuccessModal
        visible={scanModalVisible}
        title="Scan Your Fingerprint"
        message="Put your finger below to detect your fingerprint"
        containerStyle={tw`pt-[60px] pb-[73px]`}
        buttonIconSource={images.biometricScan} // Provide the icon source here
        buttonIconStyles={tw`w-[80px] h-[80px]`} // Customize icon styles as needed
        buttonContainerStyle={tw`w-[80px] h-[80px] bg-transparent`}
        onButtonPress={handleBiometricAuth}
      />
      <SuccessModal
        visible={scanModalSuccessful}
        image={images.biometricSuccessImg}
        title="Successful Biometric Activation"
        message="From now on you only need to scan your fingerprint to log into the Savin app"
        buttonText="Ok"
        onButtonPress={() => {
          setScanModalSuccessful(false);
          router.push('/home');
        }}
      />
    </SafeAreaView>
  );
}
