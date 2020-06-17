import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

// Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAFwgGS81idS0xCER6dbsoxq6ylT3uvYXU',
  authDomain: 'revents-853a2.firebaseapp.com',
  databaseURL: 'https://revents-853a2.firebaseio.com',
  projectId: 'revents-853a2',
  storageBucket: 'revents-853a2.appspot.com',
  messagingSenderId: '586476252838',
  appId: '1:586476252838:web:0c13836f3b07e7e11c4e67',
  measurementId: 'G-S277TNP60J',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
