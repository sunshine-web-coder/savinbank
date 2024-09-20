import React, { useState, useRef } from 'react';
import { View, TextInput, StyleProp, ViewStyle, TextStyle, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';

type PinInputProps = {
  length: number; // Number of digits in the PIN
  onComplete: (pin: string) => void; // Callback when PIN entry is complete
  containerStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
};

export default function EnterPin({ length = 4, onComplete, containerStyles, inputStyles }: PinInputProps) {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handlePinChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;

    setPin(newPin);

    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newPin.every(digit => digit !== '')) {
      onComplete(newPin.join(''));
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !pin[index]) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[tw`flex-row gap-4 justify-between`, containerStyles]}>
      {pin.map((digit, index) => (
        <View key={index} style={tw`relative`}>
          <TextInput
            value={digit}
            onChangeText={text => handlePinChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            ref={el => (inputsRef.current[index] = el)}
            style={[tw`p-5 py-2 min-h-[64px] text-center bg-[#F4F4F4] rounded-lg ${digit && 'border border-[#4A90E2]'}`, inputStyles]}
            maxLength={1}
            keyboardType="numeric"
            secureTextEntry={false} // Keep this false to control the custom icon display
          />
          {digit ? (
            <MaterialIcons
              name="lens" // Dot icon from MaterialIcons
              size={16} // Adjust the size to fit your design
              color="#4A90E2"
              style={tw`absolute top-1/2 left-[40px] -mt-2 -ml-3`} // Center the icon over the input
            />
          ) : null}
          {!digit ? (
            <MaterialIcons
              name="lens" // Dot icon from MaterialIcons
              size={16} // Adjust the size to fit your design
              color="#BABABA"
              style={tw`absolute top-1/2 left-[40px] -mt-2 -ml-3`} // Center the icon over the input
            />
          ) : null}
        </View>
      ))}
    </View>
  );
}
