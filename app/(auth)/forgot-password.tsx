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

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { errors, validateField, validateForm } = useFormValidation();

  const handleLogin = () => {
    if (validateForm(undefined, email, undefined, undefined, undefined)) {
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
            subtitle="Enter the email address associated with your account, check your email for the password reset link."
          />
          <View style={tw`mt-[27px]`}>
            <View style={tw`flex flex-col gap-4`}>
              <InputField
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={value => {
                  setEmail(value);
                  validateField('email', value);
                }}
                error={errors.email}
              />
            </View>

            <View style={tw`my-6`}>
              <CustomButton
                title="Send Link"
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
        title="Reset link sent successfully!"
        message="If you don't receive an email within a few minutes, please check your spam or junk folder. For further assistance, contact our support team."
        buttonText="Login"
        onButtonPress={() => {
          setModalVisible(false);
          router.push('/login');
        }}
      />
    </SafeAreaView>
  );
}
