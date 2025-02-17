import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import Sidebar from "../admin/Sidebar";

function DealWithMessages() {
    const { user } = useContext(Context);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch received messages when user is available
    useEffect(() => {
        if (!user) return; // Wait until user data is available

        const fetchMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/message/send/anonymous",
                    { withCredentials: true }
                );
                setMessages(res.data.messages || []);
            } catch (error) {
                console.error("Error fetching messages:", error);
                toast.error("Failed to load messages.");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [user]);

    // Handler to delete a message directly on the page
    const handleDelete = async (messageId) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                await axios.delete(
                    `http://localhost:5000/api/message/delete/single-message/${messageId}`,
                    { withCredentials: true }
                );
                toast.success("Message deleted successfully.");
                // Remove the deleted message from the state
                setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
            } catch (error) {
                console.error("Error deleting message:", error);
                toast.error("Failed to delete message.");
            }
        }
    };

    if (!user) {
        return <p>Loading user data...</p>;
    }

    return (
        <div className="dashboard-container mb-4">
            <Sidebar />
            <div className="main-content">
                <div className="text-center">
                    <h2 className="feature-heading">Received Messages</h2>
                </div>
                <div className="container request-container">
                    {loading ? (
                        <p>Loading messages...</p>
                    ) : messages.length > 0 ? (
                        messages.map((msg) => (
                            <div className="message-box" key={msg._id}>
                                <p>{msg.message}</p>
                                <span> {"-Anonymous"}</span>
                                <div className="button-group" style={{ marginTop: "1rem" }}>
                                    <button
                                        className="button " 
                                        onClick={() => handleDelete(msg._id)}
                                    >
                                        <span className="button-content" style={{color:"white"}}>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No messages received.</p>
                    )}
                </div>
                <div className="container request-container">
                    <p>
                        If you want to send a message to your classmate, click the button below.
                    </p>
                    <div className="text-center">
                        <button className="button" onClick={() => navigate("/send")}>
                            <span className="button-content">Go to Send Page</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DealWithMessages;
