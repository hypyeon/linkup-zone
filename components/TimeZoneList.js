import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, Image } from 'react-native';
// import { DateTime } from 'luxon';
import useCustomFonts from '../constants/CustomFonts';
import moment from 'moment-timezone';

const allTimeZones = moment.tz.names();

export default function TimeZoneList({ onSelectTimeZone }) {
  const { onLayoutRootView } = useCustomFonts();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState(null);

  const handleSelectTimeZone = (timeZone) => {
    console.log('selected time zone: ', timeZone);
    onSelectTimeZone(timeZone);
    setSelectedTimeZone(timeZone);
    setSearchQuery('');
    setShowSearchInput(false);
  };

  const handleClearSelectedTimeZone = () => {
    setSelectedTimeZone(null);
    setShowSearchInput(true);
  };

  const filteredTimeZones = searchQuery
    ? allTimeZones.filter((timeZone) => timeZone.toLowerCase().includes(searchQuery.toLowerCase())) 
    : [];
  
  const plus = require('../assets/images/Add.png');
  
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {!showSearchInput && (
        <Pressable onPress={() => setShowSearchInput(!showSearchInput)}>
          <Image source={plus} />
        </Pressable>
      )}
      {showSearchInput && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search country..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      )}
      {selectedTimeZone && (
        <View style={styles.selectedTimeZone}>
          <Text style={styles.selectedTimeZoneText}>{selectedTimeZone}</Text>
          <Pressable onPress={handleClearSelectedTimeZone}>
            <Text>Clear</Text>
          </Pressable>
        </View>
      )}
      {filteredTimeZones.map((timeZone, index) => (
        <Pressable key={index} style={styles.timeZoneItem} onPress={() => handleSelectTimeZone(timeZone)}>
          <Text style={styles.timeZoneText}>{timeZone}</Text>
        </Pressable>
      ))}
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeZoneItem: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  timeZoneText: {
    fontSize: 16,
    fontFamily: 'NotoSansCherokee-Regular',
  },
  selectedTimeZone: {
    marginTop: 16,
    alignItems: 'center',
  },
  selectedTimeZoneText: {
    fontSize: 16,
    fontFamily: 'NotoSansCherokee-Regular',
  },
});
