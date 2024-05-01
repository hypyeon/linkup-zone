import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { avoidGMT } from './Clock';
import { DateTime } from 'luxon';
// import { router } from 'expo-router';
import useCustomFonts from '../constants/CustomFonts';
import renderUserInfo from '../context/renderUserInfo';

export default function ContactItem({ item, router }) {
  const { onLayoutRootView } = useCustomFonts();

  const openChat = () => {
    router.push({ pathname: '/chatRoom', params: item})
  };

  function shortenName(fullName) {
    const parts = fullName.split(' ');
    if (parts.length < 2) {
      return fullName;
    }
    const firstName = parts[0];
    const lastNameInitial = parts[parts.length - 1].charAt(0) + '.';
    return firstName + ' ' + lastNameInitial;
  }

  const zoneName = item?.timezone;
  const userInfoObj = renderUserInfo(zoneName);

  const colorPalette = ['#e8dff5', '#fce1e4', '#fcf4dd', '#ddedea', '#daeaf6'];
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  const selectedColor = colorPalette[randomIndex];
  
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={[styles.userInitial, {backgroundColor: selectedColor}]}>
        <Text style={styles.initial}>{item?.username.charAt(0)}</Text>
      </View>
      <View>
        <Text style={styles.userName}>
          {shortenName(item?.username)}
        </Text>
      </View>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Text style={styles.userTimeZone}>
          {userInfoObj['zone']} {userInfoObj['time']}
        </Text>
        <Text style={styles.userDate}>
          {userInfoObj['date']}
        </Text>
      </View>
      <View style={styles.buttons}>
        <View>
          <Pressable style={styles.chatBtn} onPress={openChat}>
            <Text style={styles.btnTxt}>Chat Now</Text>
          </Pressable>
        </View>
        <View>
          <Pressable style={styles.schedBtn}>
            <Text style={styles.btnTxt}>Send Later</Text>
          </Pressable>
        </View>
      </View>
    </View>
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
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    paddingVertical: 12,
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
  userTimeZone: {
    fontSize: 14,
    color: primaryColor,
    fontFamily: 'NSC-SB',
    letterSpacing: 0.5,
  },
  userDate: {
    fontSize: 12,
    color: 'dimgray',
    fontFamily: 'Fin-Reg',
    letterSpacing: 0.25,
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 90,
    gap: 8,
  },
  chatBtn: {
    backgroundColor: '#75B8CB',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  schedBtn: {
    backgroundColor: '#77CBB9',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontFamily: 'NSC-Black',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});