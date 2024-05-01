import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import ChatItem from './ChatItem';
import { useRouter } from 'expo-router';

export default function ChatList({ users, currentUser }) {
  const router = useRouter();
  return (
    <FlatList 
      data={users}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => 
        <ChatItem 
          item={item} 
          currentUser={currentUser}
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
  },
});