import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function LandingPage() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="gray" />
    </View>
  )
};