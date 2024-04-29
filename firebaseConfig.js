import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js"; // hidden for security reasons - please reach out to the author for the config file

let app, auth;
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth, app };
export const db = getFirestore(app);
export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');