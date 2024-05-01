import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import renderUserInfo from '../context/renderUserInfo';

const ios = Platform.OS === 'ios';

export default function ChatRoomHeader({ user, router }) {
  const { top } = useSafeAreaInsets();
  const zoneName = user?.timezone;
  const userInfoObj = renderUserInfo(zoneName);

  return (
    <View style={styles.container}>
      <View style={[styles.top, {
            paddingTop: ios ? top : top + hp(1)
          }]}>
        <Pressable onPress={() => router.back()}>
          <Entypo name="chevron-left" size={24} color='white' />
        </Pressable>
      </View>
      <View style={styles.userInfo}>
        <Text style={{fontSize: 16, fontFamily: 'NSC-SB', color: '#33363D'}}>{user.username}</Text>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{fontFamily: 'NSC-SB', letterSpacing: 0.25, color: primaryColor}}>{userInfoObj['zone']} {userInfoObj['time']}</Text>
          <Text style={{fontFamily: 'Fin-Reg', fontSize: 12, color: 'gray'}}>{userInfoObj['date']}</Text>
        </View>
      </View>
    </View>
  )
}

const primaryColor = "rgb(68, 164, 186)";
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
  },
  top: {
    width: '100%',
    backgroundColor: primaryColor,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  back: {
    fontSize: 16,
    color: '#007AFF',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
});