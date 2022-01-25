// Import the functions you need from the SDKs you need
  
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js"

//onSnapshot listen to the db in real-time. The app doesn't need refresh for view the new data
 
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
const db = getFirestore()
  
export const saveNote = (productClass) =>{
  (productClass.product != '', productClass.amount != '')?
    addDoc(collection(db,'note'),{
      product: productClass.product,amount: productClass.amount,comment: productClass.comment
    }):
    console.log("error")
  }

  export const getNote = () => getDocs(collection(db,'note'))


  //function for view db in the real-time

  export const onGetNote = (calling) =>{
    onSnapshot(collection (db, 'note'),calling)
  }

  export const deleteNote = id => deleteDoc(doc(db,'note',id))

  export const getOneNote = id => getDoc(doc(db,'note',id))

  export const upDateNote =  (id, newFields) =>updateDoc(doc(db,'note',id), newFields)

  