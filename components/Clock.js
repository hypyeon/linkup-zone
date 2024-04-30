import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, Image } from 'react-native';
import { DateTime } from 'luxon';
import useCustomFonts from '../constants/CustomFonts';
// import moment from 'moment-timezone';

export function avoidGMT(zoneName) {
  const timeZoneAbbrev = {
    "Asia/Seoul": "KST",    // South Korea
    "Asia/Tokyo": "JST",    // Japan
    "Asia/Shanghai": "CST", // China Standard Time
    "Asia/Taipei": "CST",   // Taiwan
    "Asia/Hong_Kong": "HKT",// Hong Kong
    "Asia/Singapore": "SGT",// Singapore
    "Asia/Bangkok": "ICT",  // Thailand
    "Asia/Kolkata": "IST",  // India
    "Asia/Dubai": "GST",    // United Arab Emirates
  };
  const dt = DateTime.local().setZone(zoneName);
  if (timeZoneAbbrev.hasOwnProperty(zoneName)) {
    return timeZoneAbbrev[zoneName];
  } else {
    return dt.toFormat('ZZZZ');
  }
}

export default function Clock({ zoneName }) {
  const { onLayoutRootView } = useCustomFonts();

  const dt = DateTime.local().setZone(zoneName);
  const utc = "UTC" + dt.toFormat('ZZ');

  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const intervalId = setInterval(() => {
      const dt = DateTime.local().setZone(zoneName);
      const time = dt.toFormat('tt');
      setCurrentTime(time);
    }, 100);

    return () => clearInterval(intervalId);
  }, [zoneName]);

  const formattedTime = [
    avoidGMT(zoneName),
    utc,
    dt.toFormat('MMMM dd, yyyy')
  ]

  const cityName = zoneName.split('/')[1].replace('_', ' ');

  return (
    <View style={styles.defaultTime} onLayout={onLayoutRootView}>
      <View style={styles.userTimeZone}>
        <Text style={{fontSize: 26, fontFamily: 'NSC-Med', letterSpacing: -1}}>{formattedTime[0]}</Text>
        <Text style={{fontSize: 12, fontFamily: 'Fin-Med', color: 'rgb(68, 164, 186)'}}>{cityName}</Text>
        <Text style={{fontSize: 10, fontFamily: 'NSC-Li', letterSpacing: 0.5}}>{formattedTime[1]}</Text>
      </View>
      <View style={styles.userTimeDate}>
        <Text style={{fontSize: 24, fontFamily: 'NSC-Reg', letterSpacing: 3}}>{currentTime}</Text>
        <Text style={{fontSize: 13, fontFamily: 'NSC-Reg', letterSpacing: 0.5, color: 'dimgray'}}>{formattedTime[2]}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '76%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F9F9F9',
    zIndex: -1,
    overflowY: 'scroll',
    paddingVertical: 32,
  },
  defaultTime: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTimeZone: {
    width: 95,
    height: 95,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "50%",
    gap: 0,
    backgroundColor: 'white',
    zIndex: 2,
  },
  userTimeDate: {
    paddingVertical: 12,
    paddingLeft: 27,
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
    borderRadius: 30,
    backgroundColor: '#ECECEC',
    marginLeft: -36,
  },
});
