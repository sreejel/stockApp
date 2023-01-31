import Router from 'next/router';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyD1pE3k0geZztodyNDyJfNP8MaJl_djXrU",
    authDomain: "stockapp-55e10.firebaseapp.com",
    projectId: "stockapp-55e10",
    storageBucket: "stockapp-55e10.appspot.com",
    messagingSenderId: "603638560564",
    appId: "1:603638560564:web:fbc7f39e34a8acd775d761",
    measurementId: "G-PBPQEQXJYL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInwithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            sessionStorage.setItem("userAuthenticated",true);
            sessionStorage.setItem("userName",result.user.displayName);
            sessionStorage.setItem("userEmail",result.user.email);
            sessionStorage.setItem("photo",result.user.photoURL);
            Router.push('/home');
        })
        .catch((error) => {
            console.log(error);
        })
};
