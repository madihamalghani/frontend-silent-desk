import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import Sidebar from "../admin/Sidebar";

function ReplyMessage() {
    const { messageId } = useParams();
    const { user } = useContext(Context);
    const [originalMessage, setOriginalMessage] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch the original message by its ID
    useEffect(() => {
        if (!messageId) return;
        const fetchReceivedMessages = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/message/received/anonymous",
                    { withCredentials: true }
                );
    
                const foundMessage = res.data.messages.find((msg) => msg._id === messageId);
                if (foundMessage) {
                    setOriginalMessage(foundMessage);
                } else {
                    toast.error("Message not found.");
                }
            } catch (error) {
                console.error("Error fetching received messages:", error);
                toast.error("Failed to load the original message.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchReceivedMessages();
    }, [messageId]);

    const handleReply = async () => {
        if (!replyMessage.trim()) {
            toast.error("Please enter your reply.");
            return;
        }
        try {
            await axios.post(
                `http://localhost:5000/api/message/reply/${messageId}`,
                { messageId, replyMessage, isAnonymous: true },
                { withCredentials: true }
            );
            toast.success("Reply sent successfully.");
            setReplyMessage(""); // Reset the reply textarea
            navigate("/class/inbox/message/sent");
        } catch (error) {
            console.error("Error sending reply:", error);
            toast.error("Failed to send reply.");
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container mb-4">
                <Sidebar />
                <p className="text-center">Loading message...</p>
            </div>
        );
    }

    if (!originalMessage) {
        return (
            <div className="dashboard-container mb-4">
                <Sidebar />
                <p className="text-center text-danger">Original message not found.</p>
            </div>
        );
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
                    <h2 className="request-heading mb-4">Original Message</h2>
                    <div className="message-box">
                                    <p>{originalMessage.message}</p>
                                    <span>- { "Anonymous"}</span>
                                </div>
                    </section>
                    <section className="reply-section">
                    <h2 className="request-heading mt-4">Your Reply(Sent Anonymously)</h2>
                        <textarea
                            className="write-message"
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            placeholder="Write your reply here..."
                        ></textarea>
                        <div className="text-center">
                            <button className="button" onClick={handleReply}>
                                <span className="button-content">Send Reply</span>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
            </div>
        
    );
}

export default ReplyMessage;
