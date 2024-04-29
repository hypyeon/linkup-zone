import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React from 'react';

const ios = Platform.OS === 'ios';
export default function CustomKeyboardView({ children }) {
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={ios ? 'padding' : 'height'}
    >
      <ScrollView 
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});