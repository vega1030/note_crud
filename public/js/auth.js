'use strict'


import firebaseApp from '../js/firebase_credentials.js';
import { getAuth, GoogleAuthProvider,signInWithRedirect,signInWithPopup,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import { activeUser } from './db_firebase.js';
export let activeUserLet = ''

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const testauth = document.getElementById('test-popup')
testauth.addEventListener('click',(e)=>{
    console.log('test')
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const mainContent = document.querySelector('#main_content')
        let welcomeMessage = document.querySelector('#welcomeMessage')
        const notes = document.querySelector('#contentNotes')
        mainContent.style.display='flex'
        notes.style.display='flex'
        welcomeMessage.style.display='none'
      
      
      // The signed-in user info.
        const user = result.user;
        // const photoUrl = user.photoURL
        const nameUser = user.displayName
        const photoUser = user.photoURL
        const navBar = document.querySelector('#navbar')
        const modelNavbar = 
        `
        <ul class = 'list-navbar'>
        <li>
          <img src=${photoUser}
          " class='photo_user' alt="" >
        </li>
        <li>
           <a href="" id='logOut'>Log out</a> 
        </li>
      </ul>
      `
      navBar.innerHTML = modelNavbar
      navBar.style.backgroundColor='var(--color-4smart-smartphone)'
      onAuthStateChanged(auth,(user)=>{
        if(user){
          
            activeUserLet = user.uid 
            activeUser(user.uid)
            console.log(activeUserLet)
            // activeUser(activeUserLet)
        }
        else{
            console.log('nada')
        }
    })

      e.preventDefault()
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

  })
const formAuth = document.querySelector('#signup-form')
 const logOut = document.querySelector('#logOut');

(logOut === null)? console.log('nulo'):
logOut.addEventListener('click', ()=>{
    signOut(auth).then(()=>{
        welcomeMessage.style.display='flex'
    })
})

console.log(activeUserLet)

formAuth.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('mi inicio')
} )

