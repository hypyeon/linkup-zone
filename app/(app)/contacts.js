import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useAuth } from '../../context/auth';
import CustomHeaders from '../../components/CustomHeaders';
import NavBar from '../../components/NavBar';

export default function Contacts() {
  const { user } = useAuth();
  console.log('user data: ', user);

  return (
    <View style={styles.container}>
      <CustomHeaders title="Contacts" />
      {/* Contact List goes here */}
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