import React, { useState } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import tw from 'twrnc';
import { Colors } from '@/constants/Colors';
import { SearchIcon } from '../SvgIcon';
import { AntDesign } from '@expo/vector-icons';
import InputField from '../InputField';

type BankSelectModalProps = {
  visible: boolean;
  onSelectBank: (bank: { name: string; logo: any }) => void;
  onClose: () => void;
  banks: { name: string; logo: any }[];
};

export default function BankSelectModal({ visible, onSelectBank, onClose, banks }: BankSelectModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter banks based on the search query
  const filteredBanks = banks.filter(bank => bank.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      {/* Full-Screen Container */}
      <View style={tw`flex-1 bg-[rgba(0,0,0,0.5)]`}>
        {/* Modal Content */}
        <View style={tw`flex-1 bg-white pt-5 px-5`}>
          {/* Close Button */}
          <TouchableOpacity style={[tw`flex-row items-center gap-2 mb-4`]} onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
            <Text>Select Bank</Text>
          </TouchableOpacity>
          {/* Search Input */}
          <View style={[tw`relative mb-3`]}>
              <SearchIcon style={tw`absolute top-[17px] left-3 z-10`} />
              <InputField
                placeholder="Search banks"
                value={searchQuery}
                onChangeText={setSearchQuery}
                inputStyles={[tw`pl-[40px] w-full rounded-[100px] text-[#575757] text-sm font-normal leading-[16.80px]`, { backgroundColor: Colors.light.secondaryLightGrey }]}
              />
            </View>

          {/* Bank List */}
          <FlatList
            data={filteredBanks}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`flex-row items-center border-b border-b-gray-100 px-4 py-2`}
                onPress={() => {
                  onSelectBank(item);
                  onClose();
                }}
              >
                <Image  source={{ uri: item.logo }} style={tw`w-8 h-8 rounded-full mr-3`} />
                <Text style={[tw`text-sm text-[${Colors.light.mainBlack}]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
