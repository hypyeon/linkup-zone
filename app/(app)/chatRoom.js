import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ChatRoom() {

  const item = useLocalSearchParams();
  // console.log('item data:', item);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ChatRoomHeader user={item} router={router} />
      <View>
        <Text>Messages go here</Text>
      </View>
      <View style={styles.typeMsg}>
          <TextInput
            placeholder="Type a message..."
            style={styles.input}
          />
          <Pressable style={styles.send}>
            <MaterialCommunityIcons name="send-circle" size={40} color={primaryColor} />          
          </Pressable>
        </View>
    </View>
  )
}

const primaryColor = "rgb(68, 164, 186)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeMsg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 14,
    paddingBottom: 36,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  send: {
    marginRight: 4,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: "25%",
    width: '83%',
    marginLeft: 8,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 0.5,
  }
});