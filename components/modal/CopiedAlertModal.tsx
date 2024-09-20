import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { Colors } from '@/constants/Colors';
import CustomButton from '../CustomButton';
import images from '@/constants/images';

interface CopiedAlertModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CopiedAlertModal({ visible, onClose }: CopiedAlertModalProps) {
  return (
    <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={tw`flex-1 relative justify-center items-center bg-black bg-opacity-5`}>
        <View style={tw`absolute bottom-40 bg-white rounded-lg p-3 py-3 shadow-lg`}>
          <View style={tw`flex-row items-center gap-2`}>
            <Image source={images.logo} resizeMode='contain' alt='logo' style={tw`w-4 h-4`} />
            <Text style={[tw`text-sm`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Copied</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
