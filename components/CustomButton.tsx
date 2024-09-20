import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle, TextStyle, Image, ImageSourcePropType, ImageStyle } from 'react-native';
import { Colors } from '../constants/Colors';
import tw from 'twrnc';

type CustomButtonProps = {
  title?: string;
  handlePress: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  isLoading?: boolean;
  iconInButton?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  accessibilityLabel?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  iconInButton,
  iconStyle,
  accessibilityLabel,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        tw`w-full h-[51px] rounded-[100px] items-center justify-center flex-row`,
        { backgroundColor: Colors.light.btnColor },
        containerStyles
      ]}
      accessibilityLabel={accessibilityLabel}
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.light.textWhite} />
      ) : (
        <>
          {iconInButton && (
            <Image
              source={iconInButton}
              style={[tw`w-[24px] h-[24px] mr-2`, iconStyle]}
              resizeMode="contain"
            />
          )}
          {title && (
            <Text
              style={[
                tw`text-base font-semibold leading-tight`,
                { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.textWhite },
                textStyles
              ]}
            >
              {title}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
