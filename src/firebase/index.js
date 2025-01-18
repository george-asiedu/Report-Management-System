
import {initializeApp} from 'firebase/app'
import {initializeFirestore, CACHE_SIZE_UNLIMITED} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFunctions} from 'firebase/functions'
import {getMessaging} from 'firebase/messaging'

// Testing API

const devConfig = {
  apiKey: "AIzaSyBbNZJmvQ0skScnAVWuQxrrTMXaZw0eYQY",
  authDomain: "logicians-ghana.firebaseapp.com",
  databaseURL: "https://logicians-ghana.firebaseio.com",
  projectId: "logicians-ghana",
  storageBucket: "logicians-ghana.appspot.com",
  messagingSenderId: "47563389294",
  appId: "1:47563389294:web:4c9fca57feafc2cd9aa97f",
  measurementId: "G-36M8NZB5BP",
};


  //Production


const app = initializeApp(devConfig)

//set Auth Persistence 

//set Firestore Persistence

export const auth = getAuth(app)

export const db  = initializeFirestore(app,{
  cacheSizeBytes:CACHE_SIZE_UNLIMITED
})

export const storage = getStorage(app)

export const msg = getMessaging(app)

export const func = getFunctions(app)
