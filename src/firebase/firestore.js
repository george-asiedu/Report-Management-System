import { db, storage } from "./";
import {
  onSnapshot,
  setDoc,
  where,
  doc,
  query,
  collection,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  uploadBytes,
  ref,
  deleteObject,
} from "firebase/storage";
import { v4 as idv4 } from "uuid";

export const getDocuments = ({ path, getData }) => {
  const getQuery = query(collection(db, path));
  onSnapshot(getQuery, (qss) => {
    let temp = [];
    qss.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() });
    });
    getData(temp);
    temp = [];
  });
};

export const findOne = ({ path, type, searchString }) => {
  let q = query(collection(db, path), where(type, "==", searchString));
  let temp = {};
  onSnapshot(q, (rss) => {
    rss.forEach((doc) => {
      temp = { id: doc.id, ...doc.data() };
    });
  });
  return temp;
};

export const getDocument = ({ path, id, getData }) => {
  const getDoc = doc(db, path, id);
  onSnapshot(getDoc, (doc) => getData(doc.data()));
};

export const deleteDocument = async ({ path, id }) => {
  const deleteRef = doc(db, path, id);
  await deleteDoc(deleteRef);
};

export const updateDocument = async ({ path, id, data }) => {
  const updateRef = doc(db, path, id);
  await updateDoc(updateRef, data);
};

export const searchQuery = ({ path, type, searchString, getData }) => {
  const sQ = query(collection(db, path), where(type, "==", searchString));
  onSnapshot(sQ, (qss) => {
    let temp = [];
    qss.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() });
    });
    getData(temp);
    temp = [];
  });
};

export const addDocument = async ({ path, id, data }) => {
  await setDoc(doc(db, path, id), { ...data, timeStamp: serverTimestamp() });
};

export const uploadFile = async ({ path, file, getLink }) => {
  const fileRef = ref(storage, path + "-" + idv4().slice(0, 10));
  await uploadBytes(fileRef, file).then(() => {
    getDownloadURL(fileRef).then((url) => getLink(url));
  });
};

export const deleteFile = async ({ url }) => {
  console.log(url);
  const deleteRef = ref(storage, url);
  await deleteObject(deleteRef);
};
