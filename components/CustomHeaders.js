import { View, Text, Platform, StyleSheet } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useCustomFonts from '../constants/CustomFonts.js';

const ios = Platform.OS === 'ios';

export default function CustomHeaders({title}) {
  const { top } = useSafeAreaInsets();
  const { onLayoutRootView } = useCustomFonts();

  return (
    <View 
      style={
        [styles.container, {
          paddingTop: ios ? top + hp(2) : top + hp(3)
        }]
      }
      onLayout={onLayoutRootView}
      >
      <Text 
        style={styles.text}>
        {title}
      </Text>
    </View>
  )
}

const primaryColor = "rgb(68, 164, 186)";
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingHorizontal: wp(8),
    paddingBottom: hp(2),
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    width: '100%',
  },
  text: {
    fontSize: hp(2.75), 
    fontFamily: 'Fin-SB',
    color: primaryColor
  }
});