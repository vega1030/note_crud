  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword , googleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js"


  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC4Coi7SzW2U5A7GyC7fuyK-2b9ivkv_M8",
    authDomain: "theshoppingnote.firebaseapp.com",
    projectId: "theshoppingnote",
    storageBucket: "theshoppingnote.appspot.com",
    messagingSenderId: "298950710677",
    appId: "1:298950710677:web:12bc2ed77f37a7d8fd129c",
    measurementId: "G-EDE7Y4H78L"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  export const googleAuth = signInWithPopup(auth, provider)
  .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });