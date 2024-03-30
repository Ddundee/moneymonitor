import { FirebaseOptions, initializeApp } from "firebase/app";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig:FirebaseOptions = {
  apiKey: "AIzaSyCSV7_HngyVTdDzGxdx7LRXGOwzl2CzcBE",
  authDomain: "expense-tracker-e5876.firebaseapp.com",
  projectId: "expense-tracker-e5876",
  storageBucket: "expense-tracker-e5876.appspot.com",
  messagingSenderId: "103847317177",
  appId: "1:103847317177:web:17328566b36a50ef1a5568"
};

export const app = initializeApp(firebaseConfig);

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(process.env.SITE_KEY ? process.env.SITE_KEY : ""),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});