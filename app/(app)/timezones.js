import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomHeaders from '../../components/CustomHeaders';
import NavBar from '../../components/NavBar';
import TimeZoneDisplay from '../../components/TimeZoneDisplay';

export default function Timezones() {

  return (
    <View style={styles.container}>
      <CustomHeaders title="Time Zones" />
      <TimeZoneDisplay />
      <NavBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});