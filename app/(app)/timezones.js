import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomHeaders from '../../components/CustomHeaders';
import NavBar from '../../components/NavBar';
import TimeZoneList from '../../components/TimeZoneList';

export default function Timezones() {
  const [selectedTimeZone, setSelectedTimeZone] = useState(null);

  const handleSelectTimeZone = (timeZone) => {
    setSelectedTimeZone(timeZone);
  };

  return (
    <View style={styles.container}>
      <CustomHeaders title="Time Zones" />
      <TimeZoneList onSelectTimeZone={handleSelectTimeZone} />
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