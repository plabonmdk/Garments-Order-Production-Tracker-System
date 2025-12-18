import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContexts';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/Firebase.init';

const AuthProvider = ({children}) => {

    const googleProvider = new GoogleAuthProvider()

    
const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
}

    const [user , setUser] = useState(null)

    const [loading , setLoading] = useState(true)

    const registerUser = (email , password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email , password)
    }


    const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

    const signInUser = (email , password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth , email , password)
    }


    const signInGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth , googleProvider)
    }


    const logOut = () => {
        setLoading(true)
       return signOut(auth)
    }



    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth , (currentUser) => {
           setUser(currentUser)
           setLoading(false)
           console.log(currentUser)
        })
        return () => {
            unSubscribe()
        }
    } , [])


    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        logOut,
        updateUserProfile,
        resetPassword

    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;