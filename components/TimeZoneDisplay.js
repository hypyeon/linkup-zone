import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, Image } from 'react-native';
import { DateTime } from 'luxon';
import useCustomFonts from '../constants/CustomFonts';
import moment from 'moment-timezone';
import { useRouter } from 'expo-router';
import Clock from './Clock';

export default function TimeZoneDisplay() {
  const { onLayoutRootView } = useCustomFonts();
  const router = useRouter();
  const userTime = DateTime.local().zoneName; 
  const timeSample1 = 'Asia/Seoul';
  const timeSample2 = 'Asia/Hong_Kong';
  const plus = require('../assets/images/Add.png');
  
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.clock}>
        <Clock zoneName={userTime} />
      </View>
      <View style={styles.clock}>
        <Clock zoneName={timeSample1} />
      </View>
      <View style={styles.clock}>
        <Clock zoneName={timeSample2} />
      </View>
      <Pressable onPress={() => router.push('zoneSearch')}>
        <Image source={plus} style={styles.addBtn} />
      </Pressable>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '75.5%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F9F9F9',
    zIndex: -1,
    overflowY: 'scroll',
    paddingVertical: 32,
  },
  clock: {
    marginBottom: 16,
  },
  addBtn: {
    width: 42,
    resizeMode: 'contain',
  },
});
