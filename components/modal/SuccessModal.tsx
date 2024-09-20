import {
  View,
  Text,
  Image,
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageStyle,
  ImageSourcePropType,
  Modal
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import CustomButton from '../CustomButton';
import { Colors } from '@/constants/Colors';

interface SuccessModalProps {
  visible: boolean;
  image?: ImageSourcePropType;
  title: string;
  message?: string;
  buttonText?: string;
  onButtonPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>; // Add buttonContainerStyle
  buttonIconSource?: ImageSourcePropType;
  buttonIconStyles?: StyleProp<ImageStyle>;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  image,
  title,
  message,
  buttonText,
  onButtonPress,
  containerStyle,
  titleStyle,
  messageStyle,
  imageStyle,
  buttonContainerStyle, // Destructure buttonContainerStyle
  buttonIconSource,
  buttonIconStyles
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onButtonPress}
    >
      <View style={tw`flex-1 justify-end`}>
        <View style={tw`absolute inset-0 bg-black opacity-50`} />
        <View
          style={[
            tw`p-7 flex items-center gap-4 shadow-md rounded-t-[40px] w-full bg-white z-30`,
            containerStyle
          ]}
        >
          {image && (
            <Image source={image} style={[tw`w-[140px] h-[140px]`, imageStyle]} />
          )}
          <View style={tw`min-h-[63px] flex-col justify-start items-center gap-2 flex`}>
            <Text
              style={[
                tw`text-base text-center font-semibold leading-tight`,
                { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack },
                titleStyle
              ]}
            >
              {title}
            </Text>
            {message && (
              <Text
                style={[
                  tw`max-w-[283px] text-center text-xs font-normal leading-[18px]`,
                  { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary },
                  messageStyle
                ]}
              >
                {message}
              </Text>
            )}
          </View>
          {onButtonPress && (
            <CustomButton
              title={buttonText}
              handlePress={onButtonPress}
              containerStyles={buttonContainerStyle} // Pass buttonContainerStyle
              iconInButton={buttonIconSource}
              iconStyle={buttonIconStyles}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
