import React, { useState, forwardRef } from 'react';
import { TextInput, View, Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle, NativeSyntheticEvent, TextInputKeyPressEventData, KeyboardTypeOptions } from 'react-native';
import { Colors } from '../constants/Colors';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  containerStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  labelStyles?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  error?: string;
  showPhonePrefix?: boolean;
  showPhonePrefixValue?: string;
  readOnly?: boolean;
  onKeyPress?: (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  onFocus?: () => void; // Add onFocus prop
  onBlur?: () => void; // Add onBlur prop if needed
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number; // Add maxLength prop
  removeFocusBorder?: boolean; // New prop to remove focus border
};

const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,
      containerStyles,
      inputStyles,
      labelStyles,
      secureTextEntry = false,
      isPassword = false,
      error,
      showPhonePrefix = false,
      showPhonePrefixValue,
      readOnly = false,
      onKeyPress,
      onFocus, // Destructure onFocus
      onBlur, // Destructure onBlur
      keyboardType = 'default',
      maxLength, // Add maxLength to props
      removeFocusBorder = false // Destructure the new prop
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(!secureTextEntry);
    const [isFocused, setIsFocused] = useState(false);

    const inputBorderColor = error ? Colors.light.errorColor : '#5A63F6';

    return (
      <View style={[tw`w-full flex-col gap-2`, containerStyles]}>
        {label && <Text style={[tw`text-neutral-900 text-sm font-semibold leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold' }, labelStyles]}>{label}</Text>}
        <View style={tw`relative flex-row items-center`}>
          {showPhonePrefix && (
            <TextInput
              value={showPhonePrefixValue}
              editable={false}
              style={[
                tw`h-[50px] bg-[#e6e6e6] rounded-l-[10px] text-base p-4 text-[#171717]`,
                { width: '20%', textAlign: 'center' },
                inputStyles,
                isFocused && !removeFocusBorder && (error || !removeFocusBorder) ? { borderColor: inputBorderColor, borderWidth: 1 } : {}
              ]}
            />
          )}
          <TextInput
            ref={ref}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onKeyPress={onKeyPress}
            secureTextEntry={!showPassword && secureTextEntry}
            onFocus={() => {
              setIsFocused(true);
              onFocus && onFocus(); // Trigger onFocus if provided
            }}
            onBlur={() => {
              setIsFocused(false);
              onBlur && onBlur(); // Trigger onBlur if provided
            }}
            style={[
              tw`bg-[#e6e6e6] text-base p-4 min-h-[0px] pr-12 text-[#171717]`,
              inputStyles,
              { fontFamily: 'PlusJakartaSans_normal' },
              !removeFocusBorder && (isFocused || error) ? { borderColor: inputBorderColor, borderWidth: 1 } : {},
              showPhonePrefix ? tw`rounded-r-[10px] w-[80%] h-[50px]` : tw`rounded-[10px] w-full h-[50px]`
            ]}
            editable={!readOnly}
            keyboardType={keyboardType}
            maxLength={maxLength} // Add maxLength to the TextInput
          />
          {isPassword && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={tw`absolute right-0 px-4`}>
              <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color={Colors.light.secondary} />
            </TouchableOpacity>
          )}
        </View>
        {error && <Text style={[tw`my-1 text-sm`, { color: Colors.light.errorColor }]}>{error}</Text>}
      </View>
    );
  }
);

export default InputField;
