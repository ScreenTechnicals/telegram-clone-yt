import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDk6VzXoNS3nTvCo38NBNGVV3iJnBgLn4U",
  authDomain: "telegram-clone-yt.firebaseapp.com",
  projectId: "telegram-clone-yt",
  storageBucket: "telegram-clone-yt.appspot.com",
  messagingSenderId: "1082678069648",
  appId: "1:1082678069648:web:30b95d965807dbef340b15",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const storage = getStorage(app);
