import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsq_rugtzwG_Pc-k6bifWK_psgLVbyr5c",
  authDomain: "infra-8cf5d.firebaseapp.com",
  projectId: "infra-8cf5d",
  storageBucket: "infra-8cf5d.appspot.com",
  messagingSenderId: "629532326544",
  appId: "1:629532326544:web:3c307fe4bcae232b35b615",
  measurementId: "G-BSF9FZDRQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db } ;