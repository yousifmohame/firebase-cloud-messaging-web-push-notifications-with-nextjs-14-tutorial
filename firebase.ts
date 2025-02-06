import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA1NB3xLMUvAGg1ni4m1JK_qrI96CSnGI",
  authDomain: "filmy-6bd1a.firebaseapp.com",
  databaseURL: "https://filmy-6bd1a-default-rtdb.firebaseio.com",
  projectId: "filmy-6bd1a",
  storageBucket: "filmy-6bd1a.appspot.com",
  messagingSenderId: "409354230199",
  appId: "1:409354230199:web:978e2be5c80f52a197b032",
  measurementId: "G-3CGY3MPEKT"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
