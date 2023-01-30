// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_AUTH_API_KEY,
    authDomain: "cinematic-74470.firebaseapp.com",
    projectId: "cinematic-74470",
    storageBucket: "cinematic-74470.appspot.com",
    messagingSenderId: "565246553639",
    appId: "1:565246553639:web:b9ca346660d6427ba6e802"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);