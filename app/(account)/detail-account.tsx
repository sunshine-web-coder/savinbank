import { View, Text, RefreshControl, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '@/components/CustomHeader';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { Colors } from '@/constants/Colors';
import InputField from '@/components/InputField';
import images from '@/constants/images';
import { EditIcon } from '@/components/SvgIcon';
import WarningModal from '@/components/modal/WarningModal';
import { router } from 'expo-router';

export default function DetailAccountScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [fullName, setFullName] = useState('Olivia Vicenthie');
  const [email, setEmail] = useState('oliviavee@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('08123456789');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [currentAction, setCurrentAction] = useState<string>(''); // Store the current action (name or phone)

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const showWarningModal = (actionType: 'name' | 'phone') => {
    if (actionType === 'name') {
      setModalTitle('Are You Sure to Change Your name?');
      setModalMessage('By pressing the continue button, you will be directed to change your name. Please enter your real name.');
      setCurrentAction('editName'); // Set action for PIN routing
    } else if (actionType === 'phone') {
      setModalTitle('Are You Sure to Change Your Phone Number?');
      setModalMessage('By pressing the continue button, you will be directed to change your registered phone number. Please enter your active phone number.');
      setCurrentAction('editPhone'); // Set action for PIN routing
    }
    setModalVisible(true);
  };

  const onCancelPress = () => {
    setModalVisible(false);
    console.log('Cancel Pressed');
  };

  const onContinuePress = () => {
    setModalVisible(false);
    // Navigate to the PIN screen with action parameter (editName or editPhone)
    router.push(`/enter-pin?action=${currentAction}`);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Detail Account" headerStyle={tw`justify-start gap-[80px]`} showFlashButton={false} showShareButton={false} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        <View style={tw`flex-1 px-5 pb-10`}>
          <View style={tw`gap-[8px] items-center justify-center`}>
            <Image source={images.profileImg} style={tw`w-[80px] h-[80px] rounded-full`} />
            <Text
              style={[tw`text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}
            >
              Olivia Vicenthie
            </Text>
          </View>

          <View style={tw`gap-4 mt-[25px]`}>
            <View style={tw`relative`}>
              <InputField
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                inputStyles={tw`text-xs bg-[${Colors.light.secondaryLightGrey}]`}
                labelStyles={tw`text-base`}
              />
              <TouchableOpacity
                activeOpacity={1}
                style={tw`w-[40px] absolute items-center rounded-[10px] justify-center right-0 top-[30px] z-10 h-[49px]`}
                onPress={() => showWarningModal('name')}
              >
                <EditIcon />
              </TouchableOpacity>
            </View>
            <View style={tw`relative`}>
              <InputField
                label="Email"
                value={email}
                onChangeText={setEmail}
                inputStyles={tw`text-xs bg-[${Colors.light.secondaryLightGrey}]`}
                labelStyles={tw`text-base`}
              />
            </View>
            <View style={tw`relative`}>
              <InputField
                label="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                inputStyles={tw`text-xs bg-[${Colors.light.secondaryLightGrey}]`}
                labelStyles={tw`text-base`}
              />
              <TouchableOpacity
                activeOpacity={1}
                style={tw`w-[40px] absolute items-center rounded-[10px] justify-center right-0 top-[30px] z-10 h-[49px]`}
                onPress={() => showWarningModal('phone')}
              >
                <EditIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Warning Modal */}
      <WarningModal
        visible={modalVisible}
        image={images.successImg}
        title={modalTitle}
        message={modalMessage}
        continueButtonText="Continue"
        cancelButtonText="Cancel"
        onContinuePress={onContinuePress}
        onCancelPress={onCancelPress}
      />
    </SafeAreaView>
  );
}
