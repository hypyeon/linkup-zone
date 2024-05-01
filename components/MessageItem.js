import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function MessageItem({ message, currentUser }) {
  

  if (currentUser?.userId == message?.userId) {
    return (
      <View style={styles.sent}>
        <View style={[styles.bubble, styles.sentRadius]}>
          <Text style={styles.font}>
            {message?.text}
          </Text>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.received}>
        <View style={[styles.bubble, styles.receivedRadius]}>
          <Text style={styles.font}>
            {message?.text}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 36,
  },
  received: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 36,
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
  },
  sentRadius: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: "12%",
    borderBottomLeftRadius: "12%",
    borderTopLeftRadius: "12%",
    backgroundColor: 'white',
  },
  receivedRadius: {
    borderTopRightRadius: "12%",
    borderBottomRightRadius: "12%",
    borderBottomLeftRadius: "12%",
    borderTopLeftRadius: 0,
    backgroundColor: '#F1FBFB',
  },
  font: {
    fontFamily: 'NSC-Reg',
    letterSpacing: 0.25,
    fontSize: 14,
  }
});