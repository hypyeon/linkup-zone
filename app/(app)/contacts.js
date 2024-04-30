import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import CustomHeaders from '../../components/CustomHeaders';
import NavBar from '../../components/NavBar';
import ContactList from '../../components/ContactList';
import { usersRef } from '../../firebaseConfig';
import { getDocs, query, where } from 'firebase/firestore';
import Loading from '../../components/Loading';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Contacts() {
  const { user } = useAuth();
  // console.log('user data: ', user);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.userId) {
      getUsers();
    }
  }, []);
  const getUsers = async () => {
    try {
      const q = query(usersRef, where('userId', '!=', user?.userId));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach(doc => {
        data.push({...doc.data()});
      });
      setUsers(data);
    } catch (error) {
      console.error('Error getting users:', error);
    }
  }
  // console.log('got users: ', users);

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