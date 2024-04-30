import { FlatList, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import ContactItem from './ContactItem';

export default function ContactList({ users }) {
  return (
    <FlatList 
      data={users}
      contentContainerStyle={styles.container}
      keyExtractor={(index) => index.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => <ContactItem item={item} index={index} />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
});