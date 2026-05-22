import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import MyAccount from "./pages/MyAccount";
import Footer from "./components/Footer";

function App() {
  const [theme, setTheme] = useState("");
  // saved theme in local storage
  useEffect(() =>{
  const savedTheme = localStorage.getItem("theme");
  if(savedTheme){
    setTheme(savedTheme);
  }
  },[])
  // Apply class to body
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme",theme)
  },[theme]);

  return (
    <>
    <ToastContainer/>
    
    <Router>
      <Routes>
        
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
        <Route path="/login" element={<Login />} />
        <Route path = '/profile/:userId' element = {<MyAccount/>}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
    </Router>
     
    </>
  );
}

export default App;