import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from "firebase/firestore";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log('user registered: ', user);
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        updateUserData(user.uid);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({ ...user, username: data.username, timezone: data.timezone, userId: data.userId });
    }
  }

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, data: response?.user }
    } catch (e) {
      let msg = e.message;
      if (msg.includes('auth/invalid-email')) msg="Invalid email address.";
      if (msg.includes('auth/invalid-login-credential')) msg="Invalid credentials.";
      return { success: false, msg };
    }
  }
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true }
    } catch (e) {
      return { success: false, msg: e.message }
    }
  }
  const register = async (email, password, username, timezone) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('response.user: ', response?.user);
      await setDoc(doc(db, 'users', response?.user?.uid), {
        email,
        username,
        timezone,
        userId: response?.user?.uid
      });
      return { success: true, data: response?.user }
    } catch (e) {
      let msg = e.message;
      if (msg.includes('auth/email-already-in-use')) msg="Email already in use.";
      if (msg.includes('auth/invalid-email')) msg="Invalid email address.";
      return { success: false, msg };
    }
  }

  return (
    <Auth.Provider 
      value={
        { user, isAuthenticated, login, logout, register }
      }>
      {children}
    </Auth.Provider>
  )
}

export const useAuth = () => {
  const value = useContext(Auth);

  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return value;
}