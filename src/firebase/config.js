// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeeAcZGfKR9R2UZIX-OBbO0vsQuOZb2Mg",
  authDomain: "atlacatl-to-do.firebaseapp.com",
  projectId: "atlacatl-to-do",
  storageBucket: "atlacatl-to-do.appspot.com",
  messagingSenderId: "703039545765",
  appId: "1:703039545765:web:04f0c3ff6a02d70949884c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
