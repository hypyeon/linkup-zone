import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import MessageItem from './MessageItem';

export default function MessageList({ messages, currentUser }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingTop: 20}}
    >
      {messages.map((message, index) => {
        return (
          <MessageItem 
            message={message} 
            key={index} 
            currentUser={currentUser}
          />
        )
      })}
    </ScrollView>
  )
}