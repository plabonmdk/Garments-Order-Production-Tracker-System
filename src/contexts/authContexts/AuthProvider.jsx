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
import { data } from "react-router";

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Register
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //  Login
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //  Google Login
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //  Update Profile
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // Reset Password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //  Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //  Auth Observer
  useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    if (currentUser?.email) {
      const loggedUser = { email: currentUser.email };
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/getToken`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loggedUser),
        });
        const data = await res.json();
        console.log(data)
        localStorage.setItem("access-token", data.token);
      } catch (error) {
        console.error("Token fetch failed:", error);
      }
    }
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
