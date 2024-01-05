// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyCPT7N2sjfuZ83QA9Qb9oNp4BAUNPwFLR4",
    authDomain: "food-app-46606.firebaseapp.com",
    projectId: "food-app-46606",
    storageBucket: "food-app-46606.appspot.com",
    messagingSenderId: "139942594873",
    appId: "1:139942594873:web:f4f9671345af3c7ad000e8",
    measurementId: "G-TQVC6Q1E3N"
  };

const app = initializeApp(firebaseConfig);
let db=getFirestore(app);
let auth=getAuth(app);
let storage=getStorage(app);
export {db,auth,storage}
