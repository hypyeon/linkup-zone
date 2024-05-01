import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
// import { router } from 'expo-router';
import useCustomFonts from '../constants/CustomFonts';
import createRoomId from '../context/createRoomId';
import { doc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ChatItem({ item, router, currentUser }) {
  const { onLayoutRootView } = useCustomFonts();

  const colorPalette = ['#e8dff5', '#fce1e4', '#fcf4dd', '#ddedea', '#daeaf6'];
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  const selectedColor = colorPalette[randomIndex];
  
  const openChat = () => {
    router.push({ pathname: '/chatRoom', params: item})
  };

  const [lastMsg, setLastMsg] = useState(undefined);
  useEffect(() => {
    let roomId = createRoomId(currentUser?.userId, item.userId);
    const docRef = doc(db, 'rooms', roomId);
    const msgRef = collection(docRef, 'messages');
    const q = query(msgRef, orderBy('createdAt', 'desc'));
    let unsub = onSnapshot(q, (snapshot) => {
      let allMsg = snapshot.docs.map(doc => {
        return doc.data();
      });
      setLastMsg(allMsg[0]? allMsg[0] : null);
    });
    return unsub;
  }, []);

  // console.log('lastMessage:', lastMsg)

  const renderLastMsg = () => {
    if (typeof lastMsg === 'undefined') {
      return 'Loading...';
    }
    if (lastMsg) {
      if (currentUser.userId === lastMsg.userId) {
        return 'You: ' + lastMsg.text;
      }
      return lastMsg.text;
    } else {
      return 'Say Hi! 🙌';
    }
  };

  const renderDate = () => {
    if (lastMsg) {
      return lastMsg.timeStampDate;
    }
    return ' ';
  };

  return (
    <Pressable 
      style={styles.container} 
      onLayout={onLayoutRootView}
      onPress={openChat}
    >
      <View style={styles.userData}>
        <View style={[styles.userInitial, {backgroundColor: selectedColor}]}>
          <Text style={styles.initial}>{item?.username.charAt(0)}</Text>
        </View>
        <View style={{flexDirection: 'column', gap: 4}}>
          <Text style={styles.userName}>
            {item?.username}
          </Text>
          <Text style={{fontFamily: 'NSC-Li', fontSize: 12, letterSpacing: 0.25}}>
            {renderLastMsg()}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{color: primaryColor, fontFamily: 'Fin-Reg', fontSize: 12}}>
          {renderDate()}
        </Text>
      </View>
    </Pressable>
  )
}

const primaryColor = "rgb(68, 164, 186)";
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  userInitial: {
    width: 55,
    height: 55,
    borderRadius: "50%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  initial: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'NSC-Black',
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0.75,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'NSC-Med',
  },
  userData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});