// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBE1xuFncad-cgFgkDgRwO0hQkNb8aF1KI",
    authDomain: "thiagometro-bf771.firebaseapp.com",
    projectId: "thiagometro-bf771",
    storageBucket: "thiagometro-bf771.appspot.com",
    messagingSenderId: "969109893719",
    appId: "1:969109893719:web:b0c85ed83f5ec031ab2912"
  };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

