'use strict'
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
  updateDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js"

import {activeUserLet} from './auth.js'

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
  

let user = '';

//create id with uid (auth.js)

export const activeUser = (userAc)=>{
 return user = userAc  // return uidDocRef
}


//Reset idNote



let idNote = crypto.randomUUID()
export const saveNote = (productClass) =>{
  (productClass.product != '', productClass.amount != '')?
  setDoc(doc(db,`users/${user}/notes/${idNote}`),{
      product: productClass.product,
      amount: productClass.amount,
      comment: productClass.comment,
      id: idNote
    }):console.log("error")
  }
  
  // delete idNote
  export const getNote = () => getDocs(collection(db,`${user}/notes`))

  //function for view db in the real-time

  export const onGetNote = (calling) =>{
    (user === '') ? console.log('empty') : onSnapshot(doc (db,`${user}/notes`),calling)
    console.log(user)
  }

  export const deleteNote = id => deleteDoc(doc(db,`${user}/notes`,id))

  export const getOneNote = id => getDoc(doc(db,`${user}/notes`,id))

  export const upDateNote =  (id, newFields) =>updateDoc(doc(db,`${user}/notes`,id), newFields)

