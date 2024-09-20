import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useState } from 'react';
import tw from 'twrnc';
import InputField from '../InputField';
import { Colors } from '@/constants/Colors';

type Bank = {
  id: string;
  name: string;
  logo: string; // Add logo field for bank logos
};

export default function SearchSelectBanks() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  // Mock data for the banks with logos
  const banks: Bank[] = [
    { id: '1', name: 'Bank One', logo: 'https://i.imgur.com/abcd1.png' },
    { id: '2', name: 'Bank Two', logo: 'https://i.imgur.com/abcd2.png' },
    { id: '3', name: 'Bank Three', logo: 'https://i.imgur.com/abcd3.png' },
    { id: '4', name: 'Bank Four', logo: 'https://i.imgur.com/abcd4.png' },
    { id: '5', name: 'Bank Five', logo: 'https://i.imgur.com/abcd5.png' }
  ];

  // Filter banks based on search query
  const filteredBanks = banks.filter(bank => bank.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Handle bank selection
  const handleSelectBank = (bank: Bank) => {
    setSelectedBank(bank);
    setSearchQuery(bank.name);
    setDropdownVisible(false);
  };
  return (
    <View style={tw``}>
      {/* Search Input Field */}
      <InputField
        placeholder="Search for a bank"
        value={searchQuery}
        onChangeText={text => {
          setSearchQuery(text);
          setDropdownVisible(true);
        }}
        inputStyles={[tw`w-full rounded-[100px] text-[#575757] text-sm font-normal leading-[16.80px]`, { backgroundColor: Colors.light.secondaryLightGrey }]}
      />

      {/* Dropdown List */}
      {isDropdownVisible && filteredBanks.length > 0 && (
        <View style={tw`bg-white border border-[#e6e6e6] mt-2 rounded-[10px]`}>
          <FlatList
            data={filteredBanks}
            keyExtractor={bank => bank.id}
            renderItem={({ item: bank }) => (
              <TouchableOpacity style={tw`py-3 px-4 flex-row items-center border-b border-gray-200`} onPress={() => handleSelectBank(bank)}>
                <Image source={{ uri: bank.logo }} style={tw`w-10 h-10 mr-4 rounded-full`} />
                <Text style={tw`text-base text-[#171717]`}>{bank.name}</Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={<View style={tw`h-1`} />} // Extra padding at the bottom
          />
        </View>
      )}

      {/* Display selected bank */}
      {selectedBank && (
        <View style={tw`mt-5`}>
          <Text style={[tw`text-base text-[#171717]`, { fontFamily: 'PlusJakartaSans_semibold' }]}>Selected Bank: {selectedBank.name}</Text>
        </View>
      )}
    </View>
  );
}
