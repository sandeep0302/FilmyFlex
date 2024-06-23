import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA4tGL_PWRlXipNsz_EAJk9wpoGqNEa3DU",
  authDomain: "netflix-clone-d16eb.firebaseapp.com",
  projectId: "netflix-clone-d16eb",
  storageBucket: "netflix-clone-d16eb.appspot.com",
  messagingSenderId: "174965074643",
  appId: "1:174965074643:web:3b99235441159285a48226"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name ,email, password) => {
try {
    const res =  await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection(db,"user"),{
      uid:user.uid,
      name,
      authProvider:"local",
      email,  
    });
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const login = async(email,password) => {
try {
   await signInWithEmailAndPassword(auth,email,password);

} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const logout =  () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};