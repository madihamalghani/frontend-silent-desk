import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Context } from "../../main";
import Sidebar from "../admin/Sidebar";

function Announcement() {
    const { selectedClassId: contextClassId, isAuthorized } = useContext(Context);
    const [selectedClassId, setSelectedClassId] = useState(
        () => localStorage.getItem("selectedClassId") || contextClassId
    );
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    // Save selectedClassId in localStorage whenever it changes
    useEffect(() => {
        if (contextClassId) {
            localStorage.setItem("selectedClassId", contextClassId);
            setSelectedClassId(contextClassId);
        }
    }, [contextClassId]);

    useEffect(() => {
        if (!selectedClassId) {
            toast.error("No class selected!");
            return;
        }

        const fetchAnnouncements = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/announcement/get/all/${selectedClassId}`,
                    { withCredentials: true }
                );
                setAnnouncements(response.data.announcements);
            } catch (error) {
                console.error("Error fetching announcements:", error);
                toast.error("Failed to fetch announcements.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, [selectedClassId]);

    if (!isAuthorized) {
        return <p>You must be logged in to view announcements.</p>;
    }

    return (
        <div className="dashboard-container mb-4">
            <Sidebar />
            <div className="main-content">
                <div className="text-center mb-4">
                    <h2 className="feature-heading">Announcements</h2>
                </div>
                <div className="container request-container">
                    <section className="announcements">
                        {loading ? (
                            <p>Loading announcements...</p>
                        ) : announcements.length > 0 ? (
                            announcements.map((announcement, index) => (
                                <div className="announcement-box" key={announcement._id || index}>
                                    <p>
                                        <strong>
                                            {new Date(announcement.timestamp).toLocaleString()}
                                        </strong>
                                    </p>
                                    <p>{announcement.content}</p>
                                </div>
                            ))
                        ) : (
                            <p>No announcements found.</p>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Announcement;
