import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomHeaders from '../../components/CustomHeaders';
import NavBar from '../../components/NavBar';
import ZoneList from '../../components/ZoneList';

export default function ZoneSearch() {

  return (
    <View style={styles.container}>
      <CustomHeaders title="Time Zone List" />
      <ZoneList />
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