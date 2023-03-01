import { useContext, createContext, useEffect, useState, useRef } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup,
    updateCurrentUser,
    sendPasswordResetEmail,
    sendEmailVerification
} from 'firebase/auth';
import { auth } from '../firebase';
import userService from '../services/user.service';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState();
    const [displayName, setDisplayName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();

        return signInWithPopup(auth, provider);
    };

    const createUser = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const sendVerification = async (u) => {
        return sendEmailVerification(u);
    }

    const logout = () => {
        setIsAdmin(false);
        setDisplayName('');
        setUser(null);
        setUsername('');
        return signOut(auth);
    }

    const getUserId = () => {
        if (user) return user.uid;
        else return '';
    }

    const triggerResetEmail = async (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const updateDisplayName = (newDisplayName) => {
        setDisplayName(newDisplayName);
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setLoggedIn(true);
                setUser(currentUser);
                setUsername(currentUser.email);
                let userDoc = await userService.get(currentUser.uid);
                let userData = userDoc.data();
                if (userData) {
                    setIsAdmin(userData.isAdmin);
                    setDisplayName(userData.displayName);
                }
                setCheckingStatus(false);
            } else {
                setCheckingStatus(false);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn, googleSignIn, loggedIn, checkingStatus, getUserId, updateDisplayName, displayName, username, isAdmin, setDisplayName, setUsername, setIsAdmin, triggerResetEmail, sendVerification }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};