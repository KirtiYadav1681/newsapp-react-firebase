import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcoHcGJbGWbYtlt_064YzuCVm5FPpsCfI",
  authDomain: "news-app-37a06.firebaseapp.com",
  projectId: "news-app-37a06",
  storageBucket: "news-app-37a06.appspot.com",
  messagingSenderId: "176151759806",
  appId: "1:176151759806:web:350d358e1a7bb5369507ef",
  measurementId: "G-V27P4W9RKZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
