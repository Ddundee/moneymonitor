import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCSV7_HngyVTdDzGxdx7LRXGOwzl2CzcBE",
  authDomain: "expense-tracker-e5876.firebaseapp.com",
  projectId: "expense-tracker-e5876",
  storageBucket: "expense-tracker-e5876.appspot.com",
  messagingSenderId: "103847317177",
  appId: "1:103847317177:web:17328566b36a50ef1a5568"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);