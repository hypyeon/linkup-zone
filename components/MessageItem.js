import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function MessageItem({ message, currentUser }) {

  if (currentUser?.userId == message?.userId) {
    return (
      <View style={[styles.msg, {justifyContent: 'flex-end', paddingRight: 24}]}>
        <View style={[styles.timeMsg, {alignItems: 'flex-end'}]}>
          <Text style={styles.timeTxt}>
            {message?.sentAt} | {message?.receivedAt}
          </Text>
          <View style={[styles.bubble, styles.sentRadius]}>
            <Text style={styles.font}>
              {message?.text}
            </Text>
          </View>
        </View>
      </View>
    )
  } else {
    return (
      <View style={[styles.msg, {justifyContent: 'flex-start', paddingLeft: 24}]}>
        <View style={[styles.timeMsg, {alignItems: 'flex-start'}]}>
          <Text style={styles.timeTxt}>
            {message?.sentAt} | {message?.receivedAt}
          </Text>
          <View style={[styles.bubble, styles.receivedRadius]}>
          <Text style={styles.font}>
            {message?.text}
          </Text>
        </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  msg: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  timeMsg: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  bubble: {
    paddingVertical: 8,
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
  },
  timeTxt: {
    fontFamily: 'NSC-Reg',
    fontSize: 10,
    color: 'gray',
    letterSpacing: 0.3,
    paddingHorizontal: 4,
    marginBottom: 2,
  },
});