import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import SidebarDashboard from "../admin/SidebarDashboard";

function MemberClass() {
    const [memberClass, setMemberClass] = useState([]);
    const { isAuthorized, setSelectedClassId } = useContext(Context);
    const navigateTo = useNavigate();

    // Prevent rendering until authorization status is known
    if (isAuthorized === undefined) {
        return <p>Loading...</p>;
    }

    useEffect(() => {
        if (isAuthorized === false) {
            navigateTo("/");
            return;
        }

        // Fetch classes where the user has a membership role of "user"
        axios
            .get("http://localhost:5000/api/class/member/classes", { withCredentials: true })
            .then((res) => {
                console.log("API Response:", res.data); // For debugging
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
    }, [isAuthorized, navigateTo]);

    // Function to set the selected class ID in context
    const handleSelectClass = (id) => {
        setSelectedClassId(id);
    };

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
                                        <button
                                            className="manage-btn"
                                            onClick={() => handleSelectClass(element._id)}
                                        >
                                            <Link to={`/class/${element._id}/approved/members`}>Select Class</Link>
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
