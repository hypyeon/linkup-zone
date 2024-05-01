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

import { DateTime } from 'luxon';

function convertMsgTime(createdAt) {
  
}