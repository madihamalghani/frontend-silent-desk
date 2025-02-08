import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from "react-hot-toast";
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../main';
function Register() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
  const handleRegister=async(e)=>{
      e.preventDefault();
      try{
      const {data}=await axios.post('http://localhost:5000/api/auth/register',{username,email,password},{withCredentials:true,headers
      :{
          "Content-Type":"application/json"
      }})
      toast.success(data.message)
      setEmail("");
      setPassword("");
      setUsername("");
      setIsAuthorized(true);

      }catch(error){
          console.error(error.response?.data?.message); // Debugging
      toast.error(error.response.data.message)
      }
  }
  if(isAuthorized){
      return <Navigate to={"/"}/>
  }


  return (
    <>
      <div className="mega-form-container mb-4">
    <form className="form_container">
        <div className="title_container">
            <p className="title">SignUp to your Account</p>
            <span className="subtitle">Sign up to create or join classes, send feedback, and engage in anonymous discussions.</span>
        </div>
        <br/>
        <div className="input_container">
            <label className="input_label" htmlFor="name">User Name</label>
            <img className="icon-form" src="../src/assets/username.png" />
            <input placeholder="your name here" name="name" value={username}  onChange={(e)=>setUsername(e.target.value) } type="text" className="input_field" id="name_field"/>
        </div>
        <div className="input_container">
            <label className="input_label" htmlFor="email_field">Email</label>
            <img className="icon-form" src="../src/assets/mail.png" />

            <input placeholder="name@mail.com" name="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value) } className="input_field" id="email_field"/>
        </div>
        <div className="input_container">
            <label className="input_label" htmlFor="password_field">Password</label>
            <img src="../src/assets/password.png" className="icon-form" />
            <input placeholder="Password" name="password" type="password"  value={password} onChange={(e)=>setPassword(e.target.value) } className="input_field" id="password_field"/>
        </div>
        
        <button type="submit" className="form_btn"  onClick={handleRegister}><Link className="link-decoration" to="/">Register Now</Link> </button>
        <p className="note">Terms of use & Conditions</p>
        <p>Already have an account? Click here to <Link to="/login">Login</Link></p>

    </form>
    <div>
        <img src="../src/assets/signup.svg"/>
    </div>
</div>
    </>
  )
}

export default Register
