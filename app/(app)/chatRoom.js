import { View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/auth';
import MessageList from '../../components/MessageList';
import createRoomId from '../../context/createRoomId';
import { setDoc, doc, Timestamp, collection, addDoc, query, orderBy, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Alert } from 'react-native';
import { DateTime } from 'luxon';
import convertMsgTime from '../../context/convertMsgTime';

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
      const now = DateTime.now();
      const timeStampObj = convertMsgTime(now, user?.timezone, item.timezone);
      // console.log(timeStampObj);
      const newDoc = await addDoc(msgRef, {
        createdAt: Timestamp.fromDate(new Date()),
        userId: user?.userId,
        text: msg,
        sender: user?.username,
        receiver: item.username,
        timeStampDate: timeStampObj['date'],
        sentAt: timeStampObj['sender'],
        receivedAt: timeStampObj['receiver'] 
      });
      /*
      const newDocSnapshot = await getDoc(newDoc);
      if (newDocSnapshot.exists()) {
        console.log('New message data:', newDocSnapshot.data());
      } else {
        console.log('New message does not exist.');
      }
      */
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
    //zIndex: 2,
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