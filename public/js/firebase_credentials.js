import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";


  const firebaseConfig = {
    apiKey: "AIzaSyC4Coi7SzW2U5A7GyC7fuyK-2b9ivkv_M8",
    authDomain: "theshoppingnote.firebaseapp.com",
    projectId: "theshoppingnote",
    storageBucket: "theshoppingnote.appspot.com",
    messagingSenderId: "298950710677",
    appId: "1:298950710677:web:12bc2ed77f37a7d8fd129c",
    measurementId: "G-EDE7Y4H78L"
  };

  const firebaseApp = initializeApp(firebaseConfig)

  export default firebaseApp
