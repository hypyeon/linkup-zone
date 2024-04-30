import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
// import { DateTime } from 'luxon';
import useCustomFonts from '../constants/CustomFonts';
import moment from 'moment-timezone';

export default function ZoneList() {
  const { onLayoutRootView } = useCustomFonts();
  const allTimeZones = moment.tz.names();
  
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {allTimeZones.map((timeZone, index) => (
          <View style={styles.each} key={index}>
            <Text>{timeZone}</Text>
          </View>
        ))}
      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  each: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  }
});
