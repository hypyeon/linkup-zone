export default createRoomId = (user1, user2) => {
  const sortedIds = [user1, user2].sort();
  return sortedIds.join('-');
}