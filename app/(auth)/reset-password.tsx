import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import { Link, router } from 'expo-router';
import useFormValidation from '@/hooks/useFormValidation';
import tw from 'twrnc';
import AuthHeader from '@/components/AuthHeader';
import SuccessModal from '@/components/modal/SuccessModal';
import images from '@/constants/images';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { errors, validateField, validateForm } = useFormValidation();

  const handleLogin = () => {
    if (validateForm(undefined, undefined, undefined, password, confirmPassword)) {
      setModalVisible(true);
    } else {
      // Handle validation errors
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={tw`px-5 flex-1 pt-[80px] pb-10`}>
          <AuthHeader
            title="Welcome to Savin"
            subtitle="Once you have entered your new password, click on the 'Reset Password' button to complete the process."
          />
          <View style={tw`mt-[27px]`}>
            <View style={tw`flex flex-col gap-4`}>
              <InputField
                label="New Password"
                placeholder="Enter your new password"
                value={password}
                onChangeText={value => {
                  setPassword(value);
                  validateField('password', value);
                }}
                secureTextEntry={true}
                isPassword={true}
                error={errors.password}
              />
              <InputField
                label="Confirm New Password"
                placeholder="Enter your confirm new password"
                value={confirmPassword}
                onChangeText={value => {
                  setConfirmPassword(value);
                  validateField('confirmPassword', value, { password });
                }}
                secureTextEntry={true}
                isPassword={true}
                error={errors.confirmPassword}
              />
            </View>

            <View style={tw`my-6`}>
              <CustomButton
                title="Reset Password"
                handlePress={handleLogin}
                textStyles={{ color: Colors.light.textWhite }}
              />
            </View>

            <Text
              style={[
                tw`text-xs text-center font-semibold leading-[14.40px]`,
                { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }
              ]}
            >
              You remember your password?{' '}
              <Link href="/login" style={{ color: Colors.light.primary }}>
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
      <SuccessModal
        visible={modalVisible}
        image={images.successImg}
        title="Password reset successfully!"
        message="We have sent an activation link to your email. Go check your email to verify your account."
        buttonText="Login"
        onButtonPress={() => {
          setModalVisible(false);
          router.push('/login');
        }}
      />
    </SafeAreaView>
  );
}
