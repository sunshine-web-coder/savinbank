import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Colors } from '@/constants/Colors';
import CustomButton from '../CustomButton';

interface AlertModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function AlertModal({ visible, onClose, title, message }: AlertModalProps) {
  return (
    <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
        <View style={tw`w-[80%] bg-white rounded-lg p-5 shadow-lg`}>
          <Text style={[tw`text-lg font-semibold`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>{title}</Text>
          {/* <Text style={[tw`text-sm mt-2`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }]}>{message}</Text> */}
          <CustomButton title="Ok"
          containerStyles={{borderRadius: 10, height: 40, marginTop: 15}}
          handlePress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
