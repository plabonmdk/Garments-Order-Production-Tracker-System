import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContexts";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/Firebase.init";

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Register
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Login
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Google Login
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Update Profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // ✅ Reset Password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // ✅ Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ Auth Observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("Current User:", currentUser);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
