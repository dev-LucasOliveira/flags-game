import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

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
const db = getFirestore(app);

export const getUser = async (data) => {
  const user = await getDoc(doc(db, 'users', data.id))
  return user;
}

export const setNewUser = async (data) => {
  await setDoc(doc(db, 'users', data.id), data);
}

export const updateRecord = async (data) => {
  await updateDoc(doc(db, 'users', data.id), {
    record: data.record,
  })
}
export const auth = getAuth(app);