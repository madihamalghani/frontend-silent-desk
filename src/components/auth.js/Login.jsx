import axios from 'axios';
import { default as React, useContext, useState } from 'react';
import { toast } from "react-hot-toast";
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../main';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {isAuthorized,setIsAuthorized}=useContext(Context);
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
        const {data}=await axios.post('http://localhost:5000/api/auth/login',{email,password},{withCredentials:true,headers
        :{
            "Content-Type":"application/json"
        }})
        toast.success(data.message)
        setEmail("");
        setPassword("");
        setIsAuthorized(true);

        }catch(error){
            console.error(error.response?.data?.message || "Login failed");
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }
    if(isAuthorized){
        return <Navigate to={"/"}/>
    }
    return (
        
        <>
        <div className="mega-form-container mb-4">    
    <form className="form_container" onSubmit={handleLogin}>
        <div className="title_container">
            <p className="title">Login to your Account</p>
            <span className="subtitle">Login to join classes, send feedback, and engage in anonymous discussions.</span>
        </div>
        <br/>
        
        <div className="input_container">
            <label className="input_label" htmlFor="email_field">Email</label>
            <img className="icon-form" src="../src/assets/mail.png" />
            <input placeholder="name@mail.com" name="email" type="email" className="input_field" value={email} onChange={(e)=>setEmail(e.target.value) } id="email_field"/>
        </div>
        <div className="input_container">
            <label className="input_label" htmlFor="password_field">Password</label>
            <img className="icon-form" src="../src/assets/password.png" />

            <input placeholder="Password" name="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value) } className="input_field" id="password_field"/>
        </div>
        <button type="submit" className="form_btn" >Login</button>
        <p className="note">Terms of use & Conditions</p>
        <p>Don't have an account? Click here to <Link to="/register">Signup</Link></p>

    </form>
    <div>
        <img src="../src/assets/login.svg"/>
    </div>
</div>

        </>
    )
}

export default Login
