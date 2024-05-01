import { avoidGMT } from '../components/Clock';

export default function convertMsgTime(createdAt, senderZone, receiverZone) {
  // "createdAt" should be: DateTime.now();
  // "senderZone" should be: user?.timezone;
  // "receiverZone" should be: item.timezone;
  const senderDT = createdAt.setZone(senderZone);
  const receiverDT = createdAt.setZone(receiverZone);
  const senderUTC = avoidGMT(senderZone);
  const receiverUTC = avoidGMT(receiverZone);

  const senderTime = senderDT.toFormat('t');
  const receiverTime = receiverDT.toFormat('t');

  const senderInfo = `${senderUTC} ${senderTime}`;
  const receiverInfo = `${receiverUTC} ${receiverTime}`;

  return {
    sender: senderInfo,
    receiver: receiverInfo
  }
}