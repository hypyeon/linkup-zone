import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useRouter } from 'expo-router';

export default function ChatRoom() {

  const item = useLocalSearchParams();
  console.log('item data:', item);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ChatRoomHeader user={item} router={router} />
      <Text>Chat Room</Text>
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