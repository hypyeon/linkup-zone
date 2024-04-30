import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useCustomFonts from '../constants/CustomFonts.js';
import { useRouter } from 'expo-router';

export default function Landing() {
  const router = useRouter();
  const { onLayoutRootView } = useCustomFonts();

  let img1 = require("../assets/images/landing-1.png");
  let img2 = require("../assets/images/landing-2.png");
  let img3 = require("../assets/images/landing-3.png");

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={[styles.header, styles.boxShadow]}>
        <LinearGradient 
          colors={['#75B8CB', 'rgba(119, 203, 185, 0.8)']} 
          start={{x: 0, y: 1}} 
          end={{x: 1, y: 0}}
          style={[styles.gradient, styles.bottomBorder]} 
        />
        <Text style={[styles.headerText, styles.textShadow]}>LINKUP ZONE</Text>
      </View>
      <View style={styles.intro}>
        <View style={styles.box}>
          <Image source={img1} style={styles.image} />
          <Text style={styles.boxFont}>
            Synchronizing real-time clocks, now you can chat effortlessly without the need to ask, "What time is it there?"
          </Text>
        </View>
        <View style={[styles.box, styles.middle]}>
          <Text style={[styles.boxFont, styles.boxFontMiddle]}>
            Say goodbye to the hassle of coordinating time differences with friends and colleagues from around the world. 
          </Text>
          <Image source={img2} style={styles.image} />
        </View>
        <View style={styles.box}>
          <Image source={img3} style={styles.image} />
          <Text style={styles.boxFont}>
            Experience the convenience of global connectivity with Linkup Zone!
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Pressable onPress={() => router.push("signIn")} style={[styles.button, styles.signInBtn]}>
          <Text style={[styles.buttonText, styles.textShadow, styles.signInText]}>Sign In</Text>
        </Pressable>
        <Pressable onPress={() => router.push("signUp")} style={[styles.button, styles.signUpBtn]}>
          <Text style={[styles.buttonText, styles.textShadow, styles.signUpText]}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    paddingBottom: 36,
    paddingTop: 36,
    width: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: 'relative',
  },
  boxShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  gradient: {
    position: 'absolute',
    //zIndex: 1,
    //width: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  bottomBorder: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerText: {
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Fin-Bold',
    color: 'white',
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 1.5,
  },
  intro: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    gap: 32,
  },
  box: {
    width: '95%',
    height: 84,
    padding: 16,
    marginLeft: '5%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 1.5,
    shadowOpacity: 0.8,
    flexDirection: 'row',
    gap: 4,
  },
  boxFont: {
    fontSize: 12,
    width: '78%',
    textAlign: 'right',
    letterSpacing: -0.1,
    lineHeight: 16,
    fontFamily: 'Fin-Reg',
  },
  middle: {
    marginLeft: 0,
    marginRight: '5%',
    justifyContent: 'flex-start',
    gap: 14,
  },
  boxFontMiddle: {
    textAlign: 'left',
  },
  image: {
    width: '15%',
    resizeMode: 'contain',
  },
  button: {
    borderRadius: 10,
    marginBottom: 64,
  },
  signInBtn: {
    backgroundColor: 'white',
    borderColor: 'rgba(68, 164, 186, 0.75)',
    borderWidth: 2,
  },
  signUpBtn: {
    backgroundColor: 'rgba(68, 164, 186, 0.75)',
  },
  row: {
    width: '85%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  borderRadius: {
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'NSC-SB',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 32,
    paddingRight: 32,
  },
  signInText: {
    color: 'rgb(68, 164, 186)',
  },
  signUpText: {
    color: 'white',
  },
});