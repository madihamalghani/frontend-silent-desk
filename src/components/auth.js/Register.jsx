import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from "react-hot-toast";
import { Navigate } from 'react-router-dom';
import { Context } from '../../main';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', 
                { username, email, password }, 
                {
                    withCredentials: true, 
                    headers: { "Content-Type": "application/json" }
                });

            toast.success(data.message);

            setEmail("");
            setPassword("");
            setUsername("");

            // Ensure that user data is returned from the backend and user is actually authenticated
            if (data.success && data.user) {
                setUser(data.user);  // Set the user context
                setIsAuthorized(true);
            } else {
                toast.error("Registration successful, but authentication failed. Please log in.");
            }
        } catch (error) {
            console.error(error.response?.data?.message); 
            toast.error(error.response?.data?.message || "Registration failed");
        }
    }

    if (isAuthorized) {
        return <Navigate to={"/"} />   // Redirect to homepage or dashboard
    }

    return (
        <div className="mega-form-container mb-4">
            <form className="form_container">
                <div className="title_container">
                    <p className="title">SignUp to your Account</p>
                    <span className="subtitle">Sign up to create or join classes, send feedback, and engage in anonymous discussions.</span>
                </div>
                <br />
                <div className="input_container">
                    <label className="input_label" htmlFor="name">User Name</label>
                    <img className="icon-form" src="../src/assets/username.png" />
                    <input placeholder="your name here" name="name" value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="input_field" id="name_field" />
                </div>
                <div className="input_container">
                    <label className="input_label" htmlFor="email_field">Email</label>
                    <img className="icon-form" src="../src/assets/mail.png" />
                    <input placeholder="name@mail.com" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input_field" id="email_field" />
                </div>
                <div className="input_container">
                    <label className="input_label" htmlFor="password_field">Password</label>
                    <img src="../src/assets/password.png" className="icon-form" />
                    <input placeholder="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input_field" id="password_field" />
                </div>

                <button type="submit" className="form_btn" onClick={handleRegister}>Register Now</button>
                <p className="note">Terms of use & Conditions</p>
                <p>Already have an account? Click here to <a href="/login">Login</a></p>
            </form>
            <div>
                <img src="../src/assets/signup.svg" />
            </div>
        </div>
    )
}

export default Register;
