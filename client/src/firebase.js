// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBIK7CfoxdZO9EL-QBQboumdtxy2KNR_Yg',
  authDomain: 'travker-app.firebaseapp.com',
  projectId: 'travker-app',
  storageBucket: 'travker-app.appspot.com',
  messagingSenderId: '128552652466',
  appId: '1:128552652466:web:811c928c2c315ef27e43ab',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
