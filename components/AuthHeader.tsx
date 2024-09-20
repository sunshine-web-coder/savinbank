import { View, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Colors } from '@/constants/Colors';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  titleStyle,
  subtitleStyle,
  containerStyle
}) => {
  return (
    <View
      style={[
        tw`mx-auto max-w-[258px] min-h-[68px] flex-col justify-start items-center gap-2 flex`,
        containerStyle
      ]}
    >
      <Text
        style={[
          tw`text-xl font-semibold leading-normal`,
          { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack },
          titleStyle
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          tw`text-center text-[12px] font-normal leading-[18px]`,
          { fontFamily: 'PlusJakartaSans_normal', color: Colors.light.secondary },
          subtitleStyle
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default AuthHeader;
