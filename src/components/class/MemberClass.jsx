import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import SidebarDashboard from "../admin/SidebarDashboard";

function MemberClass() {
    const [memberClass, setMemberClass] = useState([]);
    const { isAuthorized } = useContext(Context);
    const navigateTo = useNavigate();

    // Prevent running if authorization is still being checked
    if (isAuthorized === undefined) {
        return <p>Loading...</p>;
    }

    useEffect(() => {
        if (isAuthorized === false) {
            navigateTo("/");
            return;
        }

        axios.get("http://localhost:5000/api/class/member/classes", { withCredentials: true })
            .then((res) => {
                console.log("API Response:", res.data); // Debugging
                if (res.data && Array.isArray(res.data.classes)) {
                    setMemberClass(res.data.classes);
                } else {
                    console.error("Unexpected API response format:", res.data);
                    setMemberClass([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching classes:", error);
                setMemberClass([]);
            });
    }, [isAuthorized]);

    return (
        <div className="dashboard-container mb-4">
            <SidebarDashboard />
            <div>
                <div className="feature-container text-center">
                    <h2 className="feature-heading">Welcome to your Classes</h2>
                </div>

                <div className="container request-container">
                    <section className="my-classes">
                        <h2 className="mb-4 request-heading">My Classes</h2>

                        <div>
                            {memberClass.length > 0 ? (
                                memberClass.map((element) => (
                                    <div key={element._id} className="class-card mb-6">
                                        <p>{element.name}</p>
                                        <p>Class Code: {element.classCode || "N/A"}</p>
                                        <button className="manage-btn">
                                            <Link to={`/class/${element._id}`}>Manage Class</Link>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No classes available.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default MemberClass;
