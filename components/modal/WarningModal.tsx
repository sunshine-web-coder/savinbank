import { View, Text, Image, StyleProp, TextStyle, ViewStyle, ImageStyle, ImageSourcePropType, Modal } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import CustomButton from '../CustomButton';
import { Colors } from '@/constants/Colors';
import images from '@/constants/images';

interface WarningModalProps {
  visible: boolean;
  image?: ImageSourcePropType;
  title: string;
  message?: string;
  continueButtonText?: string; // Text for Continue button
  cancelButtonText?: string; // Text for Cancel button
  onContinuePress?: () => void; // Handler for Continue button
  onCancelPress?: () => void; // Handler for Cancel button
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>; // Style for buttons container
  continueButtonTextStyle?: StyleProp<TextStyle>; // Style for Continue button text
  cancelButtonTextStyle?: StyleProp<TextStyle>; // Style for Cancel button text
  buttonIconSource?: ImageSourcePropType;
  buttonIconStyles?: StyleProp<ImageStyle>;
}

const WarningModal: React.FC<WarningModalProps> = ({
  visible,
  image,
  title,
  message,
  continueButtonText = 'Continue', // Default text for Continue button
  cancelButtonText = 'Cancel', // Default text for Cancel button
  onContinuePress,
  onCancelPress,
  containerStyle,
  titleStyle,
  messageStyle,
  imageStyle,
  buttonContainerStyle,
  continueButtonTextStyle, // New prop for Continue button text style
  cancelButtonTextStyle, // New prop for Cancel button text style
  buttonIconSource,
  buttonIconStyles
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancelPress} // Close modal on Cancel press
    >
      <View style={tw`flex-1 justify-end`}>
        <View style={tw`absolute inset-0 bg-black opacity-50`} />
        <View style={[tw`p-7 flex items-center gap-4 shadow-md rounded-t-[40px] w-full bg-white z-30`, containerStyle]}>
          {image && <Image source={images.warningImg} style={[tw`w-[140px] h-[140px]`, imageStyle]} />}
          <View style={tw`min-h-[63px] flex-col justify-start items-center gap-2 flex`}>
            <Text style={[tw`text-base text-center font-semibold leading-tight`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }, titleStyle]}>{title}</Text>
            {message && (
              <Text style={[tw`max-w-[283px] text-center text-xs font-normal leading-[18px]`, { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary }, messageStyle]}>{message}</Text>
            )}
          </View>

          {/* Buttons Container */}
          <View style={tw`flex-row justify-between gap-4 w-full mt-4`}>
            {/* Cancel Button */}
            {onCancelPress && (
              <CustomButton
                title={cancelButtonText}
                handlePress={onCancelPress}
                containerStyles={[tw`flex-1 border border-[${Colors.light.primary}] bg-[${Colors.light.textWhite}]`, buttonContainerStyle]}
                textStyles={tw`text-[${Colors.light.primary}]`} // Applying Cancel button text style
                iconInButton={buttonIconSource}
                iconStyle={buttonIconStyles}
              />
            )}

            {/* Continue Button */}
            {onContinuePress && (
              <CustomButton
                title={continueButtonText}
                handlePress={onContinuePress}
                containerStyles={[tw`flex-1`, buttonContainerStyle]}
                textStyles={continueButtonTextStyle} // Applying Continue button text style
                iconInButton={buttonIconSource}
                iconStyle={buttonIconStyles}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WarningModal;
