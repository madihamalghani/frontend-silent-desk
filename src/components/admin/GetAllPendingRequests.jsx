import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

function GetAllPendingRequests() {
    const { id } = useParams(); // Get classId from URL
    console.log(id);
    const [pendingRequests, setPendingRequests] = useState([]); // Use an array
    const navigateTo = useNavigate();
    const { isAuthorized, user } = useContext(Context);

    // Fetch pending requests
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/membership/get/pending-requests/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setPendingRequests(res.data.pendingRequests || []); // ✅ Make sure it's an array
            })
            .catch((error) => {
                navigateTo("/notfound");
            });
    }, [id]);


    if (!isAuthorized) {
        navigateTo("/login");
        return null;
    }

    return (
        <section className="pending-requests page">
            <div className="container">
                <h1>Pending Requests for Class {id}</h1>
                {pendingRequests.length === 0 ? (
                    <p>No pending requests found.</p>
                ) : (
                    <ul>
                        {pendingRequests.map((request) => (
                            <li key={request._id}>
                                <p>Name: {request.classDisplayName}</p>  {/* ✅ Use classDisplayName instead */}
                                <p>Status: {request.status}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default GetAllPendingRequests;
