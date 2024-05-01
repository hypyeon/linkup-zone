import { usersRef } from "../firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "./auth";

export default function fetchUserData() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.userId) {
      getUsers();
    }
  }, []);
  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.userId));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
  };
  return users;
}