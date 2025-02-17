import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import Sidebar from "../admin/Sidebar";

function EditMessage() {
    const { messageId } = useParams();
    const { user } = useContext(Context);
    const [messageText, setMessageText] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!messageId) return;

        console.log("Fetching message with ID:", messageId); // Debugging

        const fetchMessage = async () => {
            setLoading(true);
            try {
                const res = await axios.put(
                    `http://localhost:5000/api/message/edit/sent-message/${messageId}`,  // Adjust if needed
                    { withCredentials: true }
                );
                if (res.data && res.data.message) {
                    setMessageText(res.data.message.message);
                } else {
                    toast.error("Message not found.");
                }
            } catch (error) {
                console.error("Error fetching message:", error);
                toast.error("Failed to fetch message.");
            }
            setLoading(false); // Ensure loading state is updated in all cases
        };

        fetchMessage();
    }, [messageId]);

    const handleUpdate = async () => {
        if (!messageText.trim()) {
            toast.error("Message cannot be empty.");
            return;
        }
        try {
            await axios.put(
                `http://localhost:5000/api/message/edit/sent-message/${messageId}`,
                { message: messageText },
                { withCredentials: true }
            );
            toast.success("Message updated successfully.");
            navigate("/inbox");
        } catch (error) {
            console.error("Error updating message:", error);
            toast.error("Failed to update message.");
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container mb-4">
                <Sidebar />
                <p>Loading message...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container mb-4">
            <Sidebar />
            <div className="main-content">
                <div className="text-center">
                    <h2 className="feature-heading">Edit Message</h2>
                </div>
                <div className="container request-container">
                    <textarea
                        className="edit-textarea"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Edit your message here..."
                    ></textarea>
                    <div className="text-center">
                        <button className="button" onClick={handleUpdate}>
                            <span className="button-content">Update Message</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditMessage;
