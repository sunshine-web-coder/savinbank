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

export default function ChangePasswordScreen() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { errors, validateField, validateForm } = useFormValidation();

  const mockOldPassword = '123456'; // This would normally come from a secure source.

  const handlePasswordChange = () => {
    if (validateForm(undefined, undefined, undefined, undefined, undefined, oldPassword, newPassword)) {
      setModalVisible(true);
    } else {
      // Handle validation errors, e.g., showing alerts or highlighting fields
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Change Password" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-4 px-5 pb-10">
          {/* Old Password Input */}
          <InputField
            label="Old Password"
            placeholder="Enter your old password"
            value={oldPassword}
            onChangeText={value => {
              setOldPassword(value);
              validateField('oldPassword', value); // Use 'oldPassword' for validation
            }}
            secureTextEntry={true}
            isPassword={true}
            error={errors.oldPassword} // Display validation error for old password
          />

          {/* New Password Input */}
          <View style={tw`mb-[32px]`}>
            <InputField
              label="New Password"
              placeholder="Enter your new password"
              value={newPassword}
              onChangeText={value => {
                setNewPassword(value);
                validateField('newPassword', value, { oldPassword }); // Validate 'newPassword' with reference to 'oldPassword'
              }}
              secureTextEntry={true}
              isPassword={true}
              error={errors.newPassword} // Display validation error for new password
            />
            <Text style={[tw`text-[#9c9c9c] text-xs leading-[14.40px] mt-[8px]`, { fontFamily: 'PlusJakartaSans_normal' }]}>Please enter a password you haven’t used before.</Text>
          </View>

          {/* Save Button */}
          <Button title="Save" onPress={handlePasswordChange} buttonStyle={tw`rounded-[100px] border-0`} />
        </View>
      </ScrollView>

      {/* Success Modal */}
      <SuccessModal
        visible={modalVisible}
        image={images.successImg}
        title="Password Successfully Changed"
        message="Your password has been updated successfully."
        buttonText="Ok"
        onButtonPress={() => {
          setModalVisible(false);
          router.push('/account');
        }}
      />
    </SafeAreaView>
  );
}
