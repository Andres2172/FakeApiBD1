import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAczDOVz6nQWgY1_R4-SYwehXKP3TyWnyU",
  authDomain: "fakeapi-127a4.firebaseapp.com",
  projectId: "fakeapi-127a4",
  storageBucket: "fakeapi-127a4.firebasestorage.app",
  messagingSenderId: "911118425075",
  appId: "1:911118425075:web:989b184a67689539fb1086"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };