import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import useCustomFonts from '../constants/CustomFonts.js';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import Loading from '../components/Loading';
import { Temporal } from '@js-temporal/polyfill';
import { useAuth } from '../context/auth';
import { Alert } from 'react-native';
// import CustomKeyboardView from '../components/CustomKeyboardView';

export default function SignUp() {
  const { onLayoutRootView } = useCustomFonts();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const pwRef = useRef("");
  const usernameRef = useRef("");

  const now = Temporal.Now.timeZoneId();
  const timezoneRef = useRef(now);

  const formatTimeZone = (timeZoneId) => {
    const timeZone = Temporal.TimeZone.from(timeZoneId);
    const offset = timeZone.getOffsetStringFor(Temporal.Now.instant());
    return `${timeZoneId} (UTC${offset})`;
  };

  const { register } = useAuth();

  const handleRegister = async () => {
    if (!emailRef.current || !pwRef.current || !usernameRef.current) {
      Alert.alert("Required field(s) missing");
      return;
    }
    setLoading(true);
    let response = await register(emailRef.current, pwRef.current, usernameRef.current, timezoneRef.current); 
    setLoading(false);

    console.log('response: ', response);
    if (!response.success) {
      Alert.alert('Sign Up Error', response.msg);
      return;
    }
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View>
        <Image style={{height: hp(32)}} resizeMode='contain' source={require('../assets/images/signup.png')} />
      </View>
      <View>
        <Text style={styles.title}>Register as a New Linkup Zoner</Text>
        <View>
          <View style={styles.textInput}>
            <Entypo name="mail" size={24} color={primaryColor} />
            <TextInput 
              placeholder="Email address" 
              style={styles.finlandica}
              onChangeText={(v) => emailRef.current = v}
              autoCapitalize='none'
            />
          </View>
          <View style={styles.textInput}>
            <FontAwesome5 name="user-alt" size={24} color={primaryColor} />
            <TextInput 
              placeholder="Username" 
              style={styles.finlandica}
              onChangeText={(v) => usernameRef.current = v}
            />
          </View>
          <View style={styles.textInput}>
            <Entypo name="lock" size={24} color={primaryColor} />
            <TextInput 
              placeholder="Password" 
              style={styles.finlandica}
              secureTextEntry={true}
              onChangeText={(v) => pwRef.current = v}
              autoCapitalize='none'
            />
          </View>
          <View style={styles.textInput}>
            <Entypo name="globe" size={24} color={primaryColor} />
            <Text style={styles.finlandica}>{formatTimeZone(timezoneRef.current)}</Text>
          </View>
          
        </View>

        <View>
          {
            loading ? (
              <View className="flex-row justify-center">
                <Loading size={hp(20)} />
              </View>
            ) : (
              <View>
                <TouchableOpacity 
                  style={{
                    backgroundColor: primaryColor, 
                    padding: 12, 
                    borderRadius: 8, 
                    margin: 'auto',
                    alignItems: 'center', 
                    marginTop: 20
                  }} 
                  onPress={handleRegister}>
                  <Text style={styles.button}>Sign Up</Text>
                </TouchableOpacity> 
                <View style={{marginTop: 12}}>
                  <Text style={[styles.finlandica, {textAlign: 'center', color: 'dimgray'}]}>Already have an account? 
                    <Text style={{color: primaryColor, fontFamily: 'NotoSansCherokee-SemiBold'}} onPress={() => router.push('signIn')}> Sign In</Text>
                  </Text>
                </View>
              </View>
            )
          }
        </View>
      </View>
    </View>
  )
}

const primaryColor = "rgb(68, 164, 186)";
const styles = StyleSheet.create({  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: primaryColor,
    marginBottom: 12,
    marginTop: 20,
    fontFamily: 'Finlandica-Bold',
    width: wp(70),
    textAlign: 'center',
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(68, 164, 186)',
    width: wp(70),
    marginVertical: 10,
    gap: 12,
    paddingBottom: 4,
  },
  finlandica: {
    fontSize: 14,
    fontFamily: 'Finlandica-Regular',
  },
  button: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NotoSansCherokee-Black',
  },
});