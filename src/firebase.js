import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBBNFKxPXkpBrglC5zFk18MwCncxHuPT-M",
    authDomain: "netflix-clone-8c20f.firebaseapp.com",
    projectId: "netflix-clone-8c20f",
    storageBucket: "netflix-clone-8c20f.appspot.com",
    messagingSenderId: "945360222561",
    appId: "1:945360222561:web:d36b4960bce73e9ca7ad20",
    measurementId: "G-85TH5X3ZN6"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export {auth};
  export default db;