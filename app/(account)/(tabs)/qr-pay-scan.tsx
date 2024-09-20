import { View, Text, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import tw from 'twrnc';
import CustomHeader from '@/components/CustomHeader';
import { Colors } from '@/constants/Colors';
import { GalleryIcon, PaymentCodeIcon, ScanBarcodeIcon } from '@/components/SvgIcon';
import { CameraView, CameraType, useCameraPermissions, Camera, BarcodeScanningResult } from 'expo-camera';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function QrPayScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current; // Initialize scale value

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        await requestPermission(); // This should be called without any arguments
      }
    };

    getCameraPermissions();

    // Start infinite zoom animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1, // Zoom in
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Zoom out
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();
  }, [requestPermission, scaleAnim]);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);

    // Navigate to another screen and pass the scanned data
    router.push({
      pathname: '/qr-pay-summary',
      params: { type, data } // Pass the scanned type and data as parameters
    });

    // Reset scan state
    setTimeout(() => setScanned(false), 2000); // Delay reset to prevent immediate re-scan
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={tw`flex-1 px-5 items-center gap-2 justify-center`}>
        <Text style={tw`text-center pb-[10px]`}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" buttonStyle={tw`border-0 w-[200px]`} />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 relative bg-black`}>
      <CustomHeader title="" headerStyle={tw`justify-between absolute top-7 z-50`} showShareButton={false} />
      <CameraView
        style={tw`flex-1`}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'pdf417']
        }}
      ></CameraView>

      {/* QR Code overlay with black rounded corners and zoom animation */}
      <Animated.View
        style={[
          tw`absolute inset-0 items-center -top-[50px] justify-center`,
          {
            backgroundColor: 'transparent', // Darken the surrounding area
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <View
          style={[
            tw`w-[250px] h-[250px] relative` // Adjust the size to your needs
          ]}
        >
          {/* Top Left Corner */}
          <View style={tw`absolute top-0 left-0 w-[50px] h-[50px] border-t-4 border-l-4 border-white rounded-tl-[20px]`} />
          {/* Top Right Corner */}
          <View style={tw`absolute top-0 right-0 w-[50px] h-[50px] border-t-4 border-r-4 border-white rounded-tr-[20px]`} />
          {/* Bottom Left Corner */}
          <View style={tw`absolute bottom-0 left-0 w-[50px] h-[50px] border-b-4 border-l-4 border-white rounded-bl-[20px]`} />
          {/* Bottom Right Corner */}
          <View style={tw`absolute bottom-0 right-0 w-[50px] h-[50px] border-b-4 border-r-4 border-white rounded-br-[20px]`} />
        </View>
      </Animated.View>

      {scanned && (
        <TouchableOpacity style={tw`absolute hidden bottom-[300px] bg-red-500 z-50`} onPress={() => setScanned(false)}>
          <Text>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}

      <View style={tw`bg-transparent absolute bottom-0 w-full`}>
        <View style={tw`text-white items-end justify-end px-5 py-4`}>
          <TouchableOpacity style={[tw`w-[42px] h-[42px] rounded-full items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
            <GalleryIcon />
          </TouchableOpacity>
        </View>
        <View style={tw`bg-white gap-[19px] w-full min-h-[174px] px-5 pt-[24px] pb-[36px] rounded-t-[30px]`}>
          <Text style={[tw`text-base`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>You can also pay with</Text>
          <View style={tw`flex-row gap-5 justify-between`}>
            <TouchableOpacity
              style={[tw`flex-1 gap-[8px] min-h-[79px] py-[15px] rounded-[10px] items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}
              onPress={() => router.push('/qr-pay-summary')}
            >
              <ScanBarcodeIcon />
              <Text style={[tw`text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[tw`flex-1 gap-[8px] min-h-[79px] py-[15px] rounded-[10px] items-center justify-center`, { backgroundColor: Colors.light.secondaryLightGrey }]}>
              <PaymentCodeIcon />
              <Text style={[tw`text-sm leading-[16.80px]`, { fontFamily: 'PlusJakartaSans_semibold', color: Colors.light.mainBlack }]}>Payment Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
