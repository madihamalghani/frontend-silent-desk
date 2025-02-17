import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Context } from "../../main";
import Sidebar from "../admin/Sidebar";

function MessageSender() {
    const { selectedClassId, selectedRecipientId } = useContext(Context);
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (!selectedRecipientId || !selectedClassId || !message) {
            toast.error("Please ensure you have selected a recipient, a class, and written a message.");
            return;
        }

        axios
            .post(
                "http://localhost:5000/api/message/create",
                {
                    recipientId: selectedRecipientId,
                    classId: selectedClassId,
                    message,
                    isAnonymous: true,
                },
                { withCredentials: true }
            )
            .then(() => {
                toast.success("Message sent successfully!");
                setMessage("");
            })
            .catch((error) => {
                console.error("Error sending message:", error);
                toast.error("Failed to send message. Please try again.");
            });
    };

    return (
        <div className="dashboard-container mb-4">
            <Sidebar />
            <div>
                <div className="text-center">
                    <h2 className="feature-heading">Welcome to the Dashboard!</h2>
                </div>
                <div className="send-message-to">
                    <h3 className="send-message-to-heading mb-3">Write your Message:</h3>
                    <textarea
                        className="write-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here..."
                    ></textarea>
                    <br />
                    <div className="text-center">
                        <button className="button" onClick={handleSendMessage}>
                            <span className="button-content">Send Anonymous Message</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageSender;
