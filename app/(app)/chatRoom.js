import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import React, { useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import MessageList from '../../components/MessageList';
import createRoomId from '../../context/createRoomId';
import { setDoc, doc, Timestamp, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Alert } from 'react-native';
import { DateTime } from 'luxon';

export default function ChatRoom() {
  const router = useRouter();
  const { user } = useAuth(); // logged in user
  const item = useLocalSearchParams(); // user to chat with
  // console.log('item data:', item);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    createRoomIfNotExists();
    let roomId = createRoomId(user?.userId, item.userId);
    const docRef = doc(db, 'rooms', roomId);
    const msgRef = collection(docRef, 'messages');
    const q = query(msgRef, orderBy('createdAt', 'asc'));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMsg = snapshot.docs.map(doc => {
        return doc.data();
      });
      setMessages([...allMsg]);
    });
    return unsub;
  }, []);
  const createRoomIfNotExists = async () => {
    let roomId = createRoomId(user?.userId, item.userId);
    // console.log('room created:', roomId);
    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    });
  }; 

  const textRef = useRef('');
  const inputRef = useRef(null);
  const handleSendMsg = async () => {
    let msg = textRef.current.trim();
    if (!msg) return;
    try {
      let roomId = createRoomId(user?.userId, item.userId);
      const docRef = doc(db, 'rooms', roomId);
      const msgRef = collection(docRef, 'messages');
      textRef.current = '';
      if (inputRef.current) inputRef?.current?.clear();

      // converting the message created time to 2 timezones
      const createdAt = Timestamp.fromDate(new Date());
      const senderCreatedAt = DateTime.fromJSDate(createdAt.toDate()).setZone(user?.timezone);
      const receiverCreatedAt = DateTime.fromJSDate(createdAt.toDate()).setZone(item.timezone);
      const newDoc = await addDoc(msgRef, {
        userId: user?.userId,
        text: msg,
        senderName: user?.username,
        senderZone: user?.timezone,
        senderCreatedAt: senderCreatedAt.toJSDate(), 
        receiverCreatedAt: receiverCreatedAt.toJSDate(), 
      });
      console.log(newDoc['senderCreatedAt'], newDoc['receiverCreatedAt']);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  // console.log('messages:', messages);

  return (
    <View style={styles.container}>
      <ChatRoomHeader user={item} router={router} />
      <View style={styles.messages}>
        <MessageList messages={messages} currentUser={user} />
      </View>
      <View style={styles.typeMsg}>
          <TextInput
            placeholder="Type a message..."
            style={styles.input}
            onChangeText={value => textRef.current = value}
            ref={inputRef}
          />
          <Pressable 
            style={styles.send}
            onPress={handleSendMsg}
          >
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
  messages: {
    height: '70%',
    //backgroundColor: 'blue',
    zIndex: -1,
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