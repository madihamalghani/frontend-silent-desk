import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import Sidebar from "./Sidebar";

function AdminStatusUpdate() {
    const { selectedClassId, isAuthorized, user } = useContext(Context);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!isAuthorized) {
            navigateTo("/login");
        }
    }, [isAuthorized, navigateTo]);

    useEffect(() => {
        if (!selectedClassId) {
            navigateTo("/");
        }
    }, [selectedClassId, navigateTo]);

    // Fetch members
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
                    toast.error("Error fetching members");
                    navigateTo("/notfound");
                    setLoading(false);
                });
        }
    }, [selectedClassId, navigateTo]);

    // Function to promote a member to admin
    const handlePromote = async (memberUserId) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/membership/promote/admin/${selectedClassId}`,
                { userId: memberUserId },
                { withCredentials: true }
            );
            console.log("Promote response:", res.data);
            toast.success("Member promoted to admin successfully!");
            // Update local state: change the member's role to "admin"
            setMembers((prev) =>
                prev.map((member) =>
                    member.userId._id === memberUserId ? { ...member, role: "admin" } : member
                )
            );
        } catch (error) {
            console.error("Error promoting member:", error.message);
            if (error.response && error.response.data) {
                console.error("Error response data:", error.response.data);
                toast.error(`Error promoting member: ${error.response.data.message}`);
            } else {
                toast.error("Error promoting member");
            }
        }
    };

    // Function to demote an admin to a regular member
    const handleDemote = async (memberUserId) => {
        console.log("Attempting to demote user with ID:", memberUserId);
        try {
            const res = await axios.put(
                `http://localhost:5000/api/membership/demote-admin/${selectedClassId}`,
                { userId: memberUserId },
                { withCredentials: true }
            );
            console.log("Demote response:", res.data);
            toast.success("Admin demoted to member successfully!");
            // Update local state: change the member's role to "user"
            setMembers((prev) =>
                prev.map((member) =>
                    member.userId._id === memberUserId ? { ...member, role: "user" } : member
                )
            );
        } catch (error) {
            console.error("Error demoting member:", error.response?.data || error);
            if (error.response && error.response.data) {
                toast.error(`Error demoting member: ${error.response.data.message}`);
            } else {
                toast.error("Error demoting member");
            }
        }
    };


    // remove member from class---------------------
    const handleRemoveMember = async (memberUserId) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/membership/remove/member/${selectedClassId}`,
                {
                    withCredentials: true,
                    data: { userId: memberUserId },
                }
            );
            toast.success("User removed from class successfully!");
            setMembers((prev) => prev.filter((member) => member.userId._id !== memberUserId));
        } catch (error) {
            console.error("Error removing member:", error.response?.data || error);
            if (error.response && error.response.data) {
                toast.error(`Error removing member: ${error.response.data.message}`);
            } else {
                toast.error("Error removing member");
            }
        }
    };


    if (loading) return <p>Loading...</p>;

    const isLoggedUserAdmin = members.some(
        (member) => member.userId._id === user._id && member.role === "admin"
    );

    return (
        <div className="dashboard-container mb-4">
            <Sidebar />
            <div>
                <div className="feature-container text-center">
                    <h2 className="feature-heading">Welcome to the Dashboard!</h2>
                </div>

                <div className="container request-container">
                    <section className="requests">
                        <h2 className="mb-4 request-heading">Manage Members</h2>
                        <div className="text-center">
                            {members.length === 0 ? (
                                <p>No pending requests found.</p>
                            ) : (
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>JoinedAt</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((member) => (
                                            <tr key={member._id}>
                                                <td>{member.classDisplayName}</td>
                                                <td>{new Date(member.joinedAt).toLocaleString()}</td>
                                                <td>
                                                    {isLoggedUserAdmin ? (
                                                        <>
                                                            <button
                                                                className="approve-btn"
                                                                onClick={() => handlePromote(member.userId._id)}

                                                                title={
                                                                    member.role === "admin"
                                                                        ? "Member is already an admin"
                                                                        : "Promote this member to admin"
                                                                }
                                                            >
                                                                Promote to Admin
                                                            </button>
                                                            <button
                                                                className="approve-btn"
                                                                onClick={() => handleDemote(member.userId._id)}
                                                                title={
                                                                    member.role !== "admin"
                                                                        ? "Member is not an admin"
                                                                        : "Demote this admin to member"
                                                                }
                                                            >
                                                                Demote to Member
                                                            </button>
                                                            <button
                                                                className="reject-btn"
                                                                onClick={() => handleRemoveMember(member.userId._id)}
                                                                title="Remove this member from class"
                                                            >
                                                                Remove Member
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span>No actions available</span>
                                                    )}

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default AdminStatusUpdate;
