import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import Footer from './components/Layout/Footer.jsx';
import Navbar from './components/Layout/Navbar.jsx';
import AdminDashboard from './components/admin/adminDashboard.jsx';
import Login from './components/auth.js/Login.jsx';
import Register from './components/auth.js/Register.jsx';
import AdminClass from './components/class/AdminClass.jsx';
import CreateClass from './components/class/CreateClass.jsx';
import MemberClass from './components/class/MemberClass.jsx';
import Home from './components/homePage/Home.jsx';
import NotFound from './components/notFound/notFound.jsx';
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
        <Route path="*" element={<NotFound/>} />
        <Route path="/createclass" element={<CreateClass/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/classes" element={<AdminClass/>} />
        <Route path="/member/classes" element={<MemberClass/>} />




          {/* 
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