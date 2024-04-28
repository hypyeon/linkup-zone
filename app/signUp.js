import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import useCustomFonts from '../constants/fonts';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import Loading from '../components/Loading';

export default function SignUp() {
  useCustomFonts();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const pwRef = useRef("");
  const usernameRef = useRef("");
  const timezoneRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !pwRef.current || !usernameRef.current || !timezoneRef.current) {
      Alert.alert("Required field(s) are missing");
      return;
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Image style={{height: hp(32)}} resizeMode='contain' source={require('../assets/images/signup.png')} />
      </View>
      <View>
        <Text style={styles.title}>Welcome back!</Text>
        <View>
          <View style={styles.textInput}>
            <Entypo name="mail" size={24} color={primaryColor} />
            <TextInput 
              placeholder="Email address" 
              style={styles.finlandica}
              onChangeText={(v) => emailRef.current = v}
            />
          </View>
          <View style={styles.textInput}>
            <Entypo name="lock" size={24} color={primaryColor} />
            <TextInput 
              placeholder="Password" 
              style={styles.finlandica}
              secureTextEntry={true}
              onChangeText={(v) => pwRef.current = v}
            />
          </View>
        </View>

        <View>
          {
            loading ? (
              <Loading />
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
                  <Text style={styles.button}>Sign In</Text>
                </TouchableOpacity> 
                <View style={{marginTop: 12}}>
                  <Text className="text-gray-500" style={[styles.finlandica, {textAlign: 'center'}]}>Already have an account? 
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