import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

 apiKey: "AIzaSyCxM5XQC0VC1iua_itLZpMHbVwoHYtHTKQ",
 authDomain: "sos-psi.firebaseapp.com",
 projectId: "sos-psi",

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);