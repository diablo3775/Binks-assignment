import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCT7cvvJCSq2vswlFqU211BmAZlzTuXJAw",
  authDomain: "social-media-binks.firebaseapp.com",
  projectId: "social-media-binks",
  storageBucket: "social-media-binks.appspot.com",
  messagingSenderId: "247995714576",
  appId: "1:247995714576:web:5444e0d2f027d03b4fce95",
  measurementId: "G-ETZMZLN6M1"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, storage, database}
export default app;

