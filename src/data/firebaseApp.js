import { initializeApp } from "firebase/app";

// vvv app setup vvv
const firebaseConfig = {
  apiKey: "AIzaSyC8PjZEfZoL5cJlGBXaFPYkpEQlva72ixk",
  authDomain: "logos-3.firebaseapp.com",
  projectId: "logos-3",
  storageBucket: "logos-3.appspot.com",
  messagingSenderId: "680298592026",
  appId: "1:680298592026:web:8ee012dfa0afbbaebc9ea3",
  measurementId: "G-CMCJFC9SQS"
};
const app = initializeApp(firebaseConfig);
// ^^^ app setup ^^^

export default app;