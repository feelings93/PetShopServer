import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyCw47amc5lpIeGeAH1r5LIPs-XK8mBxCuU',
  authDomain: 'doan1-343302.firebaseapp.com',
  projectId: 'doan1-343302',
  storageBucket: 'doan1-343302.appspot.com',
  messagingSenderId: '268766015201',
  appId: '1:268766015201:web:dc52ee966d2c9c76ce51a0',
  measurementId: 'G-7JJDE7Q10M',
};
const firebaseapp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseapp);
