import { View, Text, TextInput } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { SearchIcon } from '../SvgIcon';

export default function TransactionSearch() {
  return (
    <View style={tw`relative flex-row`}>
      <SearchIcon style={tw`absolute top-4 left-4 z-10`} />
      <TextInput
        placeholder="Search Transaction"
        style={[
          tw`w-full h-[46px] text-[#171717] pl-[43px] pr-4 pt-[15px] pb-3.5 placeholder:text-[#575757] text-sm font-normal leading-[16.80px] bg-[#f6f6f6] rounded-[100px]`,
          { fontFamily: 'PlusJakartaSans_normal' }
        ]}
      />
    </View>
  );
}
