import React, { useState } from 'react';
import { View, Text, ScrollView, Image, ImageBackground, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import CustomHeader from '@/components/CustomHeader';
import images from '@/constants/images';
import { Colors } from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import InputField from '@/components/InputField';
import CustomCheckbox from '@/components/CustomCheckbox';
import Button from '@/components/Button';
import { router } from 'expo-router';

const cardData = [
  {
    name: 'Olivia Vichentie',
    bgImg: images.patternImgMainBlack,
    cardNumber: '3296 1547 0800 8739',
    validThru: '07/27',
    color: Colors.light.mainBlack
  }
];

export default function AddNewCardScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiredDate, setExpiredDate] = useState('');
  const [dailyTransactionLimit, setDailyTransactionLimit] = useState('');
  const [isChecked, setIsChecked] = useState(true);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleAddCard = () => {
    // Validate inputs here if needed
    if (!cardNumber || !expiredDate || !dailyTransactionLimit) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Proceed to the next step
    router.push('/add-new-card-otp');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Add New Card" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />
      <ScrollView contentContainerStyle={tw`flex-grow`} showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 px-5 pb-10`}>
          {cardData.map((cardDetails, i) => (
            <ImageBackground key={i} source={cardDetails.bgImg} style={tw`p-5 relative overflow-hidden rounded-[20px] bg-[${cardDetails.color}]`} imageStyle={tw`rounded-[20px]`} resizeMode="cover">
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`gap-[4px]`}>
                  <Text style={[tw`text-white text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal' }]}>Name</Text>
                  <Text style={[tw`text-white text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>{cardDetails.name}</Text>
                </View>
                <Image source={images.visaLogo} style={tw`w-[55px] h-[18px]`} alt="Visa Logo" />
              </View>
              <Text style={[tw`text-white text-xl leading-tight my-[24px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>{cardDetails.cardNumber}</Text>
              <View style={tw`flex-row justify-between`}>
                <View style={tw`gap-[4px]`}>
                  <Text style={[tw`text-white text-xs leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal' }]}>Valid Thru</Text>
                  <Text style={[tw`text-white text-xl leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>{cardDetails.validThru}</Text>
                </View>
                <Feather name="eye-off" size={24} color="white" style={tw`relative top-4`} />
              </View>
            </ImageBackground>
          ))}
          <View style={tw`gap-4 mt-5`}>
            <InputField
              label="Card Number"
              placeholder="Enter Card Number"
              value={cardNumber}
              onChangeText={setCardNumber}
              inputStyles={tw`text-xs bg-[${Colors.light.secondaryLightGrey}]`}
              labelStyles={tw`text-base`}
            />
            <InputField
              label="Expired Date"
              placeholder="MM/YY"
              value={expiredDate}
              onChangeText={setExpiredDate}
              inputStyles={tw`text-xs bg-[${Colors.light.secondaryLightGrey}]`}
              labelStyles={tw`text-base`}
            />
            <View style={tw`relative`}>
              <Text style={[tw`absolute text-[${Colors.light.secondary}] text-lg top-[41px] left-3 z-10`, { fontFamily: 'PlusJakartaSans_normal' }]}>₦</Text>
              <InputField
                label="Daily Transaction Limit"
                placeholder="Enter Limit"
                value={dailyTransactionLimit}
                onChangeText={setDailyTransactionLimit}
                inputStyles={tw`text-xs pl-[33px] bg-[${Colors.light.secondaryLightGrey}]`}
                labelStyles={tw`text-base`}
              />
            </View>
            <View style={tw`p-4 bg-[${Colors.light.secondaryLightGrey}] rounded-[10px]`}>
              <Text style={[tw`text-sm text-[${Colors.light.mainBlack}] leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Save & Agree</Text>
              <Text style={[tw`text-xs leading-[18px]`, { fontFamily: 'PlusJakartaSans_normal' }]}>
                By saving your card here, you agree to our verification and authorization process that provides you a better payment experience.
              </Text>
              <View style={tw`border border-[#EDEDED] my-3`} />
              <CustomCheckbox checked={isChecked} onPress={toggleCheckbox} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={tw`p-5`}>
        <Button title="Add New Card" onPress={handleAddCard} buttonStyle={tw`rounded-[100px] border-0`} />
      </View>
    </SafeAreaView>
  );
}
