import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./component/Header/Header.js";
import Login from "./pages/Login/Login.js";
import Home from "./pages/Home/Home.js";
import Signup from "./pages/Signup/Signup.js";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./actions/userActions";
import { loadTask } from "./actions/taskActions";
import {useNavigate} from 'react-router-dom';

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("loadTask");
    dispatch(loadUser(navigate));


  }, []);

console.log(isAuthenticated);

  return (
    <>
      {isAuthenticated && <Header/>}
      <Routes>
        {!isAuthenticated && <Route path="/login" element={<Login />} />}
        {!isAuthenticated && <Route path="/signup" element={<Signup />} />}
        {isAuthenticated && <Route path="/home" element={<Home />} />}
      </Routes>
    </>
  );
}

export default App;
