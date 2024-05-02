import { FlatList, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import ContactItem from './ContactItem';
import { useRouter } from 'expo-router';

export default function ContactList({ users }) {
  const router = useRouter();
  return (
    <FlatList 
      data={users}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => 
        <ContactItem 
          item={item} 
          index={index} 
          router={router}
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //marginTop: 16,
  },
});