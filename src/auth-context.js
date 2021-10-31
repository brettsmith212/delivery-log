import React, { useState } from "react";

import firebase from "./Firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react/cjs/react.development";

// component wide state
const AuthContext = React.createContext({
  isLoggedIn: false,
  dashes: [],
  setDashes: () => {},
  user: {},
  auth: {},
  signIn: () => {},
  signOut: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashes, setDashes] = useState([]);

  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        if (res.ok) {
          console.log(res);
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const signOut = () => {
    setIsLoggedIn(false);
    auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        dashes: dashes,
        setDashes: setDashes,
        user: user,
        auth: auth,
        signIn: signInWithGoogle,
        signOut: signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
