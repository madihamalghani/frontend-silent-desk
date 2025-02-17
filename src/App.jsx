import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import Footer from './components/Layout/Footer.jsx';
import Navbar from './components/Layout/Navbar.jsx';
import AdminStatusUpdate from './components/admin/AdminStatusUpdate.jsx';
import GetAllPendingRequests from './components/admin/GetAllPendingRequests.jsx';
import SelectedClass from './components/admin/SelectedClass.jsx';
import AdminDashboard from './components/admin/adminDashboard.jsx';
import Login from './components/auth.js/Login.jsx';
import Register from './components/auth.js/Register.jsx';
import SettingUser from './components/auth.js/SettingUser.jsx';
import AdminClass from './components/class/AdminClass.jsx';
import CreateClass from './components/class/CreateClass.jsx';
import JoinClass from './components/class/JoinClass.jsx';
import MemberClass from './components/class/MemberClass.jsx';
import Setting from './components/class/Setting.jsx';
import UpdateClass from './components/class/UpdateClass.jsx';
import Home from './components/homePage/Home.jsx';
import ApprovedMembers from './components/members/ApprovedMembers.jsx';
import DealWithMessages from './components/message/DealWithMessages.jsx';
import InboxMessages from './components/message/InboxMessages.jsx';
import MessageSender from './components/message/MessageSender.jsx';
// import ReplyMessage from './components/message/ReplyMessage.jsx';
import ReplyMessage from './components/message/ReplyMessage.jsx';
import ReplyToMessages from './components/message/ReplySpecificMessage.jsx';
import SentMessages from './components/message/SentMessages.jsx';
import NotFound from './components/notFound/notFound.jsx';
import { Context } from './main';
function App() {
    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/auth/all/users", { withCredentials: true })
                setUser(response.data.user)
                setIsAuthorized(true)
            }
            catch (error) {
                setIsAuthorized(false)
            }
        }
        fetchUser();
        // },[isAuthorized])
    }, [])



    return (

        <>

            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/createclass" element={<CreateClass />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/classes" element={<AdminClass />} />
                    <Route path="/member/classes" element={<MemberClass />} />
                    <Route path="/join/class" element={<JoinClass />} />
                    <Route path="/class/:id/pending-requests" element={<GetAllPendingRequests />} />
                    <Route path="/class/:id/dashboard" element={<SelectedClass/>} />
                    <Route path="/class/:id/approved/members" element={<ApprovedMembers/>} />
                    <Route path="/class/:id/update/details" element={<UpdateClass/>} />
                    <Route path="/class/:id/admin/update" element={<AdminStatusUpdate/>} />
                    <Route path="/class/:id/user/settings" element={<Setting/>} />
                    <Route path="/class/user/settings" element={<SettingUser/>} />
                    <Route path="/class/send/message" element={<MessageSender/>} />
                    <Route path="/class/inbox/message/received" element={<InboxMessages/>} />
                    <Route path="/class/inbox/message/sent" element={<SentMessages/>} />
                    <Route path="/class/inbox/message/setting" element={<DealWithMessages/>} />
                    <Route path="/reply/:messageId" element={<ReplyToMessages />} />
                    <Route path="/reply/message/:messageId" element={<ReplyMessage />} />

                    {/* 
          <Route path="/jobs/getall" element={<Jobs/>} />
          <Route path="/job/:id" element={<JobDetails/>} />
          <Route path="/job/post" element={<PostJobs/>} />
          <Route path="/job/me" element={<MyJobs/>} />
          <Route path="*" element={<NotFound/>} />

          <Route path="/application/:id" element={<Application/>} />
          <Route path="/application/me" element={<MyApplications/>} /> */}
                </Routes>
                <Footer />
                <Toaster />
            </Router>
        </>
    )
}

export default App