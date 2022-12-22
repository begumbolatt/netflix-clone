import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBVXwcieCWByTxRmSxC-vM31gO4NzTQn-o",
    authDomain: "react-netflix-clone-117c6.firebaseapp.com",
    projectId: "react-netflix-clone-117c6",
    storageBucket: "react-netflix-clone-117c6.appspot.com",
    messagingSenderId: "1001949020230",
    appId: "1:1001949020230:web:543c43517a1976e8bd4a47",
    measurementId: "G-6BFWKCSDYN"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);