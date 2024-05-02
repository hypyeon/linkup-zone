import { View, Pressable, StyleSheet, TextInput, Text, Button } from 'react-native';
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
import DatePicker from '../../context/datePicker';
import renderUserInfo from '../../context/renderUserInfo';

export default function ScheduleSend() {
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

  const handleDateSelected = (date) => {
    // here will be the actual time in user's time zone that will be sent to the receiver... 
    // when selected date and time, it's automatically in UTC format. 
    // For example, I (PDT) chose 2024-05-02 12:00 PM, it shows: 2024-05-02T19:00:00.000Z 
    // Expected result is: 2024-05-02T12:00:00.000+09:00 (in KST), which is: 

    console.log(date);
    const dateToString = date.toISOString();
    const timeOnly = DateTime.fromISO(dateToString).toString().slice(0, -6);
    // now we got: 2024-05-02T12:00:00.000-07:00
    // we need to get: 2024-05-02T12:00:00.000+09:00
    // now we need to swap "-07:00" to "+09:00"
    // short offset value, we can get it by: 
    //DateTime.local().setZone(zoneName).toFormat('ZZ'); 
    const offSet = DateTime.local().setZone(item.timezone).toFormat('ZZ');
    console.log(timeOnly + offSet);
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
        receivedAt: timeStampObj['receiver'],
        scheduled: true
      });
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
      <View style={styles.type}>
        <DatePicker onDateSelected={handleDateSelected} userZone={renderUserInfo(item.timezone)['zone']} />
        <View style={styles.msgBtn}>
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
  type: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 14,
    paddingBottom: 42,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    gap: 8,
  },
  msgBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',  
  },
  send: {
    marginLeft: 4,
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