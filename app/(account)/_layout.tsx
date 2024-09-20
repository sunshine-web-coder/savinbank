import React from 'react';
import { Stack } from 'expo-router';

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="notification" options={{ headerShown: false }} />
      <Stack.Screen name="qr-pay-summary" options={{ headerShown: false }} />
      <Stack.Screen name="enter-pin" options={{ headerShown: false }} />
      <Stack.Screen name="payment-success" options={{ headerShown: false }} />
      <Stack.Screen name="features" options={{ headerShown: false }} />
      <Stack.Screen name="transfer-fund" options={{ headerShown: false }} />
      <Stack.Screen name="add-receiver" options={{ headerShown: false }} />
      <Stack.Screen name="transfer-money" options={{ headerShown: false }} />
      <Stack.Screen name="add-new-card" options={{ headerShown: false }} />
      <Stack.Screen name="add-new-card-otp" options={{ headerShown: false }} />
      <Stack.Screen name="detail-account" options={{ headerShown: false }} />
      <Stack.Screen name="language" options={{ headerShown: false }} />
      <Stack.Screen name="change-pin" options={{ headerShown: false }} />
      <Stack.Screen name="contact-us" options={{ headerShown: false }} />
    </Stack>
  );
}
