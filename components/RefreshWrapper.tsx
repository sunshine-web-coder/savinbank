import { View, Text, Button, ScrollView, RefreshControl } from 'react-native';
import React, { useState } from 'react';

export default function RefreshWrapper({ children, onRefresh }:any) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    onRefresh?.(); // Call the refresh logic passed from the parent component
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulate refresh delay
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      {children}
    </ScrollView>
  );
}
