import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import { Link, router } from 'expo-router';
import useFormValidation from '@/hooks/useFormValidation';
import SuccessModal from '@/components/modal/SuccessModal';
import tw from 'twrnc';
import AuthHeader from '@/components/AuthHeader';
import images from '@/constants/images';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { errors, validateField, validateForm } = useFormValidation();

  const handleSignUp = () => {
    if (validateForm(fullName, email, phoneNumber, password, confirmPassword)) {
      setModalVisible(true);
    } else {
      // Handle validation errors
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={tw`px-5 flex-1 pt-[80px] pb-10`}>
          <AuthHeader title="Welcome to Savin" subtitle="Before you use the features in the Savin application, please sign up first." />
          <View style={tw`mt-[27px]`}>
            <View style={tw`flex flex-col gap-4`}>
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={value => {
                  setFullName(value);
                  validateField('fullName', value);
                }}
                error={errors.fullName}
              />
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
              <InputField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={value => {
                  setPassword(value);
                  validateField('password', value, { confirmPassword });
                }}
                secureTextEntry={true}
                isPassword={true}
                error={errors.password}
              />
              <InputField
                label="Confirm Password"
                placeholder="Enter your password"
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
              <CustomButton title="Sign Up" handlePress={handleSignUp} textStyles={{ color: Colors.light.textWhite }} />
            </View>

            <Text style={[tw`text-sm text-center font-semibold leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>
              Already have an account?{' '}
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
        title="Your Account Successfully Created"
        message="We have sent an activation link to your email. Go check your email to verify your account."
        buttonText="Ok"
        onButtonPress={() => {
          setModalVisible(false);
          router.push('/login');
        }}
      />
    </SafeAreaView>
  );
}
