import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import Footer from './components/Layout/Footer.jsx';
import Navbar from './components/Layout/Navbar.jsx';
import Login from './components/auth.js/Login.jsx';
import Register from './components/auth.js/Register.jsx';
import Home from './components/homePage/Home.jsx';
import { Context } from './main';
function App() {
    const {isAuthorized,setIsAuthorized,user,setUser} =useContext(Context);
    useEffect(()=>{
    const fetchUser=async ()=>{
      try{
        const response=await axios.get("http://localhost:5000/api/auth/all/users",{withCredentials:true})
        setUser(response.data.user)
        setIsAuthorized(true)
      }
      catch(error){
        setIsAuthorized(false)
      }
    }
    fetchUser();
    // },[isAuthorized])
  },[])



  return (

    <>
    
      <Router>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
          {/* <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/jobs/getall" element={<Jobs/>} />
          <Route path="/job/:id" element={<JobDetails/>} />
          <Route path="/job/post" element={<PostJobs/>} />
          <Route path="/job/me" element={<MyJobs/>} />
          <Route path="*" element={<NotFound/>} />

          <Route path="/application/:id" element={<Application/>} />
          <Route path="/application/me" element={<MyApplications/>} /> */}
        </Routes>
        <Footer/>
        <Toaster/>
      </Router>
    </>
  )
}

export default App