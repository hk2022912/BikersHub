// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDNi7JjuZkwLxcAkffSd7pU_Aqy6OzvUoA",
  authDomain: "bhtry-80957.firebaseapp.com",
  projectId: "bhtry-80957",
  storageBucket: "bhtry-80957.appspot.com",
  messagingSenderId: "539371611230",
  appId: "1:539371611230:web:65c53b05f3497c1d1500cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);


