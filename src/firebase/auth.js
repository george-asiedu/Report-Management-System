import { auth } from ".";
import {
  signInWithEmailAndPassword,
  signOut,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";


export const signIn = async (mail, password) => {
  setPersistence(auth, browserLocalPersistence).then(() => {
    signInWithEmailAndPassword(auth, mail, password);
  })

};

export const exitApp = async () => {
  await signOut(auth);
};
