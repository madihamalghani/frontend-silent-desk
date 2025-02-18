import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import Sidebar from "./Sidebar";

function SelectedClass() {
    const { isAuthorized, selectedClassId } = useContext(Context);
    const navigateTo = useNavigate();
    const [classDetails, setClassDetails] = useState(null);
    const [announcement, setAnnouncement] = useState("");

    // Redirect if not authorized
    useEffect(() => {
        if (!isAuthorized) {
            navigateTo("/login");
        }
    }, [isAuthorized, navigateTo]);

    // Fetch class details when selectedClassId is available
    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/class/details/${selectedClassId}`,
                    { withCredentials: true }
                );
                console.log("API Response:", response.data);
                setClassDetails(response.data.class);
                toast.success(response.data.message || "Class details loaded!");
            } catch (error) {
                console.error("Error fetching class details:", error);
                toast.error("Unable to fetch class details.");
            }
        };

        if (selectedClassId) {
            fetchClassDetails();
        }
    }, [selectedClassId]);

    // Handle announcement submission with toast notifications
    const handleAnnouncementSubmit = async () => {
        if (!announcement.trim()) {
            toast.error("Announcement cannot be empty!");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/api/announcement/create/${selectedClassId}`,
                { content: announcement },
                { withCredentials: true }
            );
            toast.success(response.data.message || "Announcement posted successfully!");
            setAnnouncement(""); // Clear the input field
        } catch (error) {
            console.error("Error posting announcement:", error);
            toast.error("Failed to post announcement.");
        }
    };

    return (
        <div className="dashboard-container mb-4">
            <Sidebar />
            <div>
                <div className="text-center mb-6">
                    <h2 className="feature-heading">
                        {classDetails
                            ? `Welcome to ${classDetails.name}`
                            : "Loading class details..."}
                    </h2>
                </div>

                <section className="class-details mb-4">
                    <h2 className="class-detail-heading mb-4">Class Details</h2>
                    {classDetails ? (
                        <>
                            <p>
                                <strong>Class Code:</strong> {classDetails.classCode}
                            </p>
                            <p>
                                <strong>Description:</strong> {classDetails.description}
                            </p>
                            <div className="text-center">
                                <button className="button">
                                    <span className="button-content">
                                        <Link
                                            className="link-decoration"
                                            to={`/class/${selectedClassId}/update/details`}
                                        >
                                            Edit Description
                                        </Link>
                                    </span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>Loading class details...</p>
                    )}
                </section>

                {/* Announcement Section */}
                <section className="announcements mb-4">
                    <h2 className="announcement-heading">Make an Announcement</h2>
                    <div className="input_container">
                        <textarea
                            className="write-message"
                            value={announcement}
                            onChange={(e) => setAnnouncement(e.target.value)}
                            placeholder="Type your message here..."
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button className="button" onClick={handleAnnouncementSubmit}>
                            <span className="button-content">Announce Message</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SelectedClass;
