import React from 'react';
import { Slot, Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboardingscreentwo" options={{ headerShown: false }} />
    </Stack>
  );
}
