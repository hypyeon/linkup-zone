import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
// import { router } from 'expo-router';
import useCustomFonts from '../constants/CustomFonts';

export default function ChatItem({ item, router }) {
  const { onLayoutRootView } = useCustomFonts();

  const colorPalette = ['#e8dff5', '#fce1e4', '#fcf4dd', '#ddedea', '#daeaf6'];
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  const selectedColor = colorPalette[randomIndex];
  
  const openChat = () => {
    router.push({ pathname: '/chatRoom', params: item})
  };

  return (
    <Pressable 
      style={styles.container} 
      onLayout={onLayoutRootView}
      onPress={openChat}
    >
      <View style={styles.userData}>
        <View style={[styles.userInitial, {backgroundColor: selectedColor}]}>
          <Text style={styles.initial}>{item?.username.charAt(0)}</Text>
        </View>
        <View style={{flexDirection: 'column', gap: 4}}>
          <Text style={styles.userName}>
            {item?.username}
          </Text>
          <Text style={{fontFamily: 'NSC-Li', fontSize: 12, letterSpacing: 0.25}}>Message content</Text>
        </View>
      </View>
      <View>
        <Text style={{color: primaryColor, fontFamily: 'NSC-Reg'}}>12:00</Text>
      </View>
    </Pressable>
  )
}

const primaryColor = "rgb(68, 164, 186)";
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  userInitial: {
    width: 55,
    height: 55,
    borderRadius: "50%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'NSC-Black',
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0.75,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'NSC-Med',
  },
  userData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});