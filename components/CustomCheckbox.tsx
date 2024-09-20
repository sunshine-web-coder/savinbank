import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`flex-row gap-2 items-center`} activeOpacity={1}>
      <MaterialCommunityIcons name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color={checked ? '#5A63F6' : '#5A63F6'} />
      <Text style={[tw`text-xs font-normal leading-[14.40px]`, { fontFamily: 'PlusJakartaSans_normal' }]}>
        I agree with all &nbsp;
        <Link href="/" style={{ color: Colors.light.primary }}>
          Terms & Conditions
        </Link>&nbsp;
        applied.
      </Text>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
