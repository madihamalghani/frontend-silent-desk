import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main"; // adjust the path as necessary
import Sidebar from "../admin/Sidebar";

function ApprovedMembers() {
    const { selectedClassId, isAuthorized, user } = useContext(Context);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigateTo = useNavigate();

    // Redirect if not authorized
    useEffect(() => {
        if (!isAuthorized) {
            navigateTo("/login");
        }
    }, [isAuthorized, navigateTo]);

    // Redirect if no class is selected
    useEffect(() => {
        if (!selectedClassId) {
            navigateTo("/");
        }
    }, [selectedClassId, navigateTo]);

    useEffect(() => {
        if (selectedClassId) {
            axios
                .get(`http://localhost:5000/api/membership/list/members/${selectedClassId}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log("API response:", res.data);
                    setMembers(res.data.members || []);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching members:", error);
                    navigateTo("/notfound");
                    setLoading(false);
                });
        }
    }, [selectedClassId, navigateTo]);

    if (loading) return <p>Loading...</p>;


    return (
        <div className="dashboard-container mb-4">
            <Sidebar />

            {/* Main content */}
            <div>
                <div className="text-center">
                    <h2 className="feature-heading">Welcome to the Class Members!</h2>
                </div>

                <div className="send-message-to">
                    <h3 className="send-message-to-heading">Send Message To:</h3>
                    <table>
                        <tbody>
                            {members.length === 0 ? (
                                <tr>
                                    <td colSpan="3">No approved members found.</td>
                                </tr>
                            ) : (
                                members.map((member) => (
                                    <tr key={member._id}>
                                        <th>Member:</th>
                                        <td>{member.classDisplayName}</td>
                                        <td>
                                            <button className="approve-btn">
                                                <a href="/send-now" className="link-decoration">
                                                    Select Member
                                                </a>
                                            </button>
                                        </td>
                                        
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ApprovedMembers;
