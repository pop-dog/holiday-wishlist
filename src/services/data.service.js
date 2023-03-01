import { db } from '../firebase';

import { collection, getDocs, getDoc, addDoc, deleteDoc, doc, query, updateDoc, setDoc  } from 'firebase/firestore';

class DataService {

    add = (collectionName, newDoc) => {
        return addDoc(collection(db, collectionName), newDoc);
    }

    addWithId = (collectionName, newDoc, id) => {
        return setDoc(doc(db, collectionName, id), newDoc);
    }

    deleteRef = (ref) => {
        return deleteDoc(ref);
    }

    getRef = (ref) => {
        return getDoc(ref);
    }

    update = (collectionName, id, updateData) => {
        const uDoc = doc(db, collectionName, id);
        return updateDoc(uDoc, updateData);
    }

    delete = (collectionName, id) => {
        const commitmentDoc = doc(db, collectionName, id);
        return deleteDoc(commitmentDoc);
    }

    deleteByRef = (documentRef) => {
        return deleteDoc(documentRef);
    }

    all = (collectionName, whereClause) => {        
        if (whereClause && Array.isArray(whereClause)) return getDocs(query(collection(db, collectionName), ...whereClause));
        else if (whereClause) return getDocs(query(collection(db, collectionName), whereClause)); 
        else return getDocs(collection(db, collectionName));
        
    }

    get = (collectionName, id) => {
        return getDoc(doc(db, collectionName, id));
    }

    getByRef = (documentRef) => {
        return getDoc(documentRef);
    }
}

export default new DataService();