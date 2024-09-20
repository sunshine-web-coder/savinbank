import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import InputField from '@/components/InputField';
import useFormValidation from '@/hooks/useFormValidation';
import SuccessModal from '@/components/modal/SuccessModal';
import images from '@/constants/images';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function ChangePhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState('08123456789');
  const [modalVisible, setModalVisible] = useState(false);
  const { errors, validateField, validateForm } = useFormValidation();

  const handleSubmit = () => {
    if (validateForm(undefined, undefined, undefined, phoneNumber, undefined, undefined)) {
      setModalVisible(true);
    } else {
      // Handle validation errors
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Change Name" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-5 pb-10">
          <InputField
            label="Phone Number"
            placeholder="Enter your phone number"
            value={phoneNumber}
            showPhonePrefix={true}
            showPhonePrefixValue="+234"
            onChangeText={value => {
              setPhoneNumber(value);
              validateField('phoneNumber', value);
            }}
            error={errors.phoneNumber}
          />
        </View>
      </ScrollView>
      {/* Fixed "Add New Receiver" Button */}
      <View style={tw`p-5`}>
        <Button title="Save" onPress={handleSubmit} buttonStyle={tw`rounded-[100px] border-0`} />
      </View>
      <SuccessModal
        visible={modalVisible}
        image={images.successImg}
        title="Your Phone Number Successfully Changed"
        message="You need to wait another 30 days to return to change your registered phone number."
        buttonText="Ok"
        onButtonPress={() => {
          setModalVisible(false);
          router.push('/account');
        }}
      />
    </SafeAreaView>
  );
}
