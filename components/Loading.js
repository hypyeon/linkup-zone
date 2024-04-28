import { View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function Loading({size}) {
  return (
    <View style={{height: size, aspectRatio: 1}}>
      <LottieView style={{flex: 0.5}} source={require('../assets/animations/loading.json')} autoPlay loop />
    </View>
  )
}