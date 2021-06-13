import React, { useEffect } from "react";
import "./App.css";
import Routes from "./route";
import { BrowserRouter } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
// import HomeScreen from './HomeScreen';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // login
        dispatch(
          login({
          uid:userAuth.uid,
          email:userAuth.email
          
        })
        );

      } else {
        dispatch(logout);
        // logout
      }
    });
    // cleanup function
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      {/* <HomeScreen/> */}

      <BrowserRouter>
        <div>
          <Routes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
