import React from 'react';
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Button from '@/components/Button';
import images from '@/constants/images';
import { Colors } from '@/constants/Colors';

interface NewReceiverModalProps {
  visible: boolean;
  bankName: string;
  accountNumber: string;
  onClose: () => void;
  onNext: () => void;
}

export default function NewReceiverModal({ visible, bankName, accountNumber, onClose, onNext }: NewReceiverModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={tw`flex-1 justify-end bg-[rgba(0,0,0,0.5)]`}>
        <View style={tw`bg-white min-h-[384px] rounded-t-[40px] p-5`}>
          <Text style={[tw`text-center text-[${Colors.light.mainBlack}] text-base leading-tight`, { fontFamily: 'PlusJakartaSans_semibold' }]}>New Receiver</Text>
          <View style={tw`flex-col bg-[${Colors.light.secondaryLightGrey}] p-5 rounded-[10px] gap-[8px] items-center justify-between mt-4`}>
            <Image source={images.avatar1} style={tw`w-[50px] h-[50px] rounded-full`} />
            <View style={tw`items-center gap-[8px] justify-center`}>
              <Text style={tw`text-base font-bold`}>Anastasia Huzhie</Text>
              <Text style={tw`text-sm text-gray-600`}>
                {bankName} - {accountNumber}
              </Text>
            </View>
          </View>
          <View style={tw`mt-5 gap-[19px]`}>
            <Button title="Next" onPress={onNext} buttonStyle={tw`rounded-[100px] border-0`} />
            <Button title="Cancel" onPress={onClose} buttonStyle={tw`rounded-[100px] border-0 bg-white border border-[${Colors.light.primary}]`} textStyle={tw`text-[${Colors.light.primary}]`} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
