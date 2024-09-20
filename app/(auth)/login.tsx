import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import { Link } from 'expo-router';
import useFormValidation from '@/hooks/useFormValidation';
import tw from 'twrnc';
import AuthHeader from '@/components/AuthHeader';
import { router } from 'expo-router';

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const { errors, validateField, validateForm } = useFormValidation();

  const handleLogin = () => {
    if (validateForm(undefined, undefined, undefined, password, undefined, undefined, undefined, emailOrPhone)) {
      router.push('/biometric');
      setEmailOrPhone('');
      setPassword('');
    } else {
      // Handle validation errors
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={tw`px-5 flex-1 pt-[80px] pb-10`}>
          <AuthHeader title="Welcome to Savin" subtitle="Before you use the features in the Savin application, please sign in first." />
          <View style={tw`mt-[27px]`}>
            <View style={tw`flex flex-col gap-4`}>
              <InputField
                label="Email Address/Phone Number"
                placeholder="Enter your email or phone number"
                value={emailOrPhone}
                onChangeText={value => {
                  setEmailOrPhone(value);
                  validateField('emailOrPhone', value);
                }}
                error={errors.emailOrPhone}
              />
              <InputField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={value => {
                  setPassword(value);
                  validateField('password', value);
                }}
                secureTextEntry={true}
                isPassword={true}
                error={errors.password}
              />
            </View>
            <Link href="/forgot-password" style={[tw`text-right text-sm font-semibold leading-[16.80px] mt-5`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.primary }]}>
              Forgot Password?
            </Link>
            <View style={tw`my-6`}>
              <CustomButton title="Sign In" handlePress={handleLogin} textStyles={{ color: Colors.light.textWhite }} />
            </View>

            <Text style={[tw`text-xs text-center font-semibold leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>
              Don’t have an account?{' '}
              <Link href="/register" style={{ color: Colors.light.primary }}>
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
