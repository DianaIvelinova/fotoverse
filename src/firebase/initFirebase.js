import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAvkESZqcVza55VUaWDlQ09QOo5fV9I1vs",
  authDomain: "fotoverse-7ad1e.firebaseapp.com",
  projectId: "fotoverse-7ad1e",
  storageBucket: "fotoverse-7ad1e.appspot.com",
  messagingSenderId: "228810373129",
  appId: "1:228810373129:web:a68cd7cf347e047ec620d8",
  measurementId: "G-J7JN1B4W5G"
};

// Initializes Firebase
const app = initializeApp(firebaseConfig);

// Initializes Firebase Authentication and gets a reference to the service
export const auth = getAuth(app);

// Initializes Firebase Storage and gets a reference to the service
export const storage = getStorage(app);
