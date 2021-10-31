import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./auth-context";

// // Import the functions you need from the SDKs you need
// import { firebase } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// firebase.initializeApp({
//   apiKey: "AIzaSyBdVrwmASEvxgoQBmiyd94luXR5G9BkFcU",
//   authDomain: "react-http-3051a.firebaseapp.com",
//   databaseURL: "https://react-http-3051a-default-rtdb.firebaseio.com",
//   projectId: "react-http-3051a",
//   storageBucket: "react-http-3051a.appspot.com",
//   messagingSenderId: "603568763820",
//   appId: "1:603568763820:web:5464b4115e37cdcdf4c009",
// });

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
