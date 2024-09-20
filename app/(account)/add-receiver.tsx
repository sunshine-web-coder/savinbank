import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import tw from 'twrnc';
import BankSelectModal from '@/components/modal/BankSelectModal';
import { Colors } from '@/constants/Colors';
import NewReceiverModal from '@/components/modal/NewReceiverModal';
import { useReceiver } from '@/provider/ReceiverProvider';
import { router } from 'expo-router';

export default function AddReceiver() {
  const [bankLogo, setBankLogo] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [banks, setBanks] = useState<{ name: string; logo: string }[]>([]);
  const [showReceiverModal, setShowReceiverModal] = useState<boolean>(false);

  const { bankName, accountNumber, setReceiverDetails } = useReceiver();

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch('https://nigerianbanks.xyz/');
        const data = await response.json();
        setBanks(data);
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };

    fetchBanks();
  }, []);

  const handleSelectBank = (bank: { name: string; logo: string }) => {
    setReceiverDetails(bank.name, accountNumber); // Set the global state
    setBankLogo(bank.logo);
    setIsModalVisible(false);
  };

  const handleNextPress = () => {
    if (bankName && accountNumber) {
      setShowReceiverModal(true);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <CustomHeader title="Transfer to New Receiver" headerStyle={tw`justify-start gap-[40px]`} showFlashButton={false} showShareButton={false} />

      <View style={tw`flex-1 px-5 mt-[25px]`}>
        {/* Account Number Input */}
        <View style={tw`mb-[20px]`}>
          <InputField
            label="Account Number"
            placeholder="Account Number"
            value={accountNumber}
            onChangeText={value => setReceiverDetails(bankName, value)} // Update global state for account number
            inputStyles={tw`bg-[${Colors.light.secondaryLightGrey}] p-4 text-sm`}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>

        {/* Bank Name Input */}
        <Text style={[tw`text-neutral-900 text-sm font-semibold leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Bank Name</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={tw`flex-row items-center bg-[${Colors.light.secondaryLightGrey}] rounded-[10px] p-4 text-[#575757] text-sm mt-2`}>
          {bankLogo && <Image source={{ uri: bankLogo }} style={tw`w-6 h-6 mr-2`} resizeMode="contain" />}
          <Text style={tw`text-[#575757] text-sm`}>{bankName || 'Select Bank'}</Text>
        </TouchableOpacity>
      </View>

      {/* "Next" Button */}
      <View style={tw`p-5`}>
        <Button title="Next" onPress={handleNextPress} buttonStyle={tw`rounded-[100px] border-0`} disabled={!bankName || !accountNumber} />
      </View>

      {/* Bank Select Modal */}
      <BankSelectModal visible={isModalVisible} onSelectBank={handleSelectBank} onClose={() => setIsModalVisible(false)} banks={banks} />

      {/* New Receiver Modal */}
      <NewReceiverModal visible={showReceiverModal} bankName={bankName} accountNumber={accountNumber} onClose={() => setShowReceiverModal(false)} onNext={() => router.push('/transfer-money')} />
    </SafeAreaView>
  );
}
