import { View, StyleSheet } from 'react-native';
import React from 'react';
import CustomHeaders from '../../components/CustomHeaders';
import NavBar from '../../components/NavBar';
import ContactList from '../../components/ContactList';
import Loading from '../../components/Loading';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import fetchUserData from '../../context/fetchUserData';

export default function Contacts() {
  const users = fetchUserData();
  return (
    <View style={styles.container}>
      <CustomHeaders title="Contacts" />
      {
        users.length > 0 ? (
          <ContactList users={users} />
        ) : (
          <Loading size={hp(20)} />
        )
      }
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