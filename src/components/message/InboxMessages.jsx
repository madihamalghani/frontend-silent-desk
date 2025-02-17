import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import Sidebar from "../admin/Sidebar";

function InboxMessages() {
    const { user } = useContext(Context);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Navigation Hook

    useEffect(() => {
        if (!user) return; // Wait for user data

        const fetchMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/message/received/anonymous",
                    { withCredentials: true }
                );
                setMessages(res.data.messages || []); // Store received messages
            } catch (error) {
                console.error("Error fetching messages:", error);
                toast.error(error.response?.data?.message || "Failed to load messages.");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [user]); // Runs only when user is available

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div className="dashboard-container mb-4">
            <Sidebar />
            <div className="main-content">
                <div className="text-center">
                    <h2 className="feature-heading">Welcome to Your Inbox!</h2>
                </div>
                <div className="container request-container">
                    <section className="messages">
                        <h2 className="request-heading mb-4">Anonymous Messages</h2>

                        {loading ? (
                            <p>Loading messages...</p>
                        ) : messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <div className="message-box" key={index}>
                                    <p>{msg.message}</p>
                                    <span>- { "Anonymous"}</span>
                                </div>
                            ))
                        ) : (
                            <p>No messages yet.</p>
                        )}
                    </section>
                </div>

                <div class="container request-container">
                <div class="send-message">
                    <p>If you want to send message to your classmate. Just click on the link given below. Select options and send your messages.</p>
                    <div class="text-center">
                        <button class="button">
                            <span class="button-content">Go to Send Page</span>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InboxMessages;
