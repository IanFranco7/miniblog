import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDBRqYTLtbqqZIkAMXht-5eu4AwHtTXuTc",
  authDomain: "miniblog-a6025.firebaseapp.com",
  projectId: "miniblog-a6025",
  storageBucket: "miniblog-a6025.appspot.com",
  messagingSenderId: "87637332229",
  appId: "1:87637332229:web:97d67574d3839ad385e76c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}