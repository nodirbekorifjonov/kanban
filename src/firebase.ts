// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBdAXoQFr06e7_uGLtpzVBs7AUXgYbi2rs",
    authDomain: "kanban-70876.firebaseapp.com",
    projectId: "kanban-70876",
    storageBucket: "kanban-70876.firebasestorage.app",
    messagingSenderId: "1079330147391",
    appId: "1:1079330147391:web:48153dce515f9515b2bc8a",
    measurementId: "G-7X41KDN4M8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export { db }