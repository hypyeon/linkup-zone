import { View, Image, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useAuth } from '../context/auth';
import useCustomFonts from '../constants/CustomFonts';

let tz = require("../assets/images/Clock.png");
let ct = require("../assets/images/Contacts.png");
let ch = require("../assets/images/Chat.png");
let lo = require("../assets/images/Logout.png");

export default function NavBar() {
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  }
  const { onLayoutRootView } = useCustomFonts();

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Pressable onPress={() => router.push('timezones')}>
        <Image source={tz} style={styles.img} />
      </Pressable>
      <Pressable onPress={() => router.push('contacts')}>
        <Image source={ct} style={styles.img} />
      </Pressable>
      <Pressable onPress={() => router.push('chats')}>
        <Image source={ch} style={styles.img} />
      </Pressable>
      <Menu>
        <MenuTrigger>
          <Image source={lo} style={styles.img} />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: 'white',
              borderRadius: 10,
              paddingHorizontal: wp(2),
              paddingVertical: hp(1),
              color: 'dimgray',
              width: 'fit-content',
              marginRight: wp(5),
            },
          }}
        >
          <MenuOption onSelect={() => handleLogout} text='Sign Out' />
        </MenuOptions>
      </Menu>
    </View>
  )
}

const primaryColor = "rgb(68, 164, 186)";
const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: primaryColor,
    gap: wp(13),
  },
  img: {
    width: wp(9),
    marginTop: hp(1.5),
    resizeMode: 'contain',
  }
});