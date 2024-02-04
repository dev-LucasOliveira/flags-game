import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJKX5LGFNV945pzhqDnOtnDVcwbgPDLWY",
  authDomain: "the-fun-flags-game.firebaseapp.com",
  projectId: "the-fun-flags-game",
  storageBucket: "the-fun-flags-game.appspot.com",
  messagingSenderId: "993937077739",
  appId: "1:993937077739:web:826cb4655ec310787555ae",
  measurementId: "G-LMHYDDPLBX"
};


const app = initializeApp(firebaseConfig);

export const db = async () => await getFirestore(app);
export const auth = getAuth(app);