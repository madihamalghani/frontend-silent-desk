import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import Sidebar from "./Sidebar";

function GetAllPendingRequests() {
    const { selectedClassId, isAuthorized } = useContext(Context);
    const [pendingRequests, setPendingRequests] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        if (!selectedClassId) {
            navigateTo("/");
        }
    }, [selectedClassId, navigateTo]);

    useEffect(() => {
        if (selectedClassId) {
            axios
                .get(
                    `http://localhost:5000/api/membership/get/pending-requests/${selectedClassId}`,
                    { withCredentials: true }
                )
                .then((res) => {
                    setPendingRequests(res.data.pendingRequests || []);
                })
                .catch((error) => {
                    console.error("Error fetching pending requests:", error);
toast.error("You are not an admin")
                });
        }
    }, [selectedClassId, navigateTo]);

    if (!isAuthorized) {
        navigateTo("/login");
        return null;
    }

    // Function to manage (approve/reject) a pending request
    const manageRequest = async (userId, action) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/membership/pending-request/status/${selectedClassId}`,
                { userId, status: action },
                { withCredentials: true }
            );
            if (response.data.success) {
                // Update UI: Remove the request that was just managed
                setPendingRequests((prevRequests) =>
                    prevRequests.filter((req) => req.userId._id !== userId)
                );
                // Show success toast
                toast.success(response.data.message || "Status updated successfully");
            }
        } catch (error) {
            console.error(
                `Error ${action === "approve" ? "approving" : "rejecting"} request:`,
                error
            );
            // Show error toast
            toast.error(
                error.response?.data?.message ||
                `Error ${action === "approve" ? "approving" : "rejecting"} request`
            );
        }
    };

    return (
        <>
            <div className="dashboard-container mb-4">
                <Sidebar />
                <div>
                    <div className="feature-container text-center">
                        <h2 className="feature-heading">Welcome to the Dashboard!</h2>
                    </div>

                    <div className="container request-container">
                        <section className="requests">
                            <h2 className="mb-4 request-heading">Pending Join Requests</h2>
                            <div className="text-center">
                                {pendingRequests.length === 0 ? (
                                    <p>No pending requests found.</p>
                                ) : (
                                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Request Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pendingRequests.map((request) => (
                                                <tr key={request._id}>
                                                    <td>{request.classDisplayName}</td>
                                                    <td>{request.formattedJoinDate}</td>
                                                    <td>
                                                        <button
                                                            className="approve-btn"
                                                            onClick={() =>
                                                                manageRequest(request.userId._id, "approve")
                                                            }
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="reject-btn"
                                                            onClick={() =>
                                                                manageRequest(request.userId._id, "reject")
                                                            }
                                                        >
                                                            Block
                                                        </button>
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
        </>
    );
}

export default GetAllPendingRequests;
