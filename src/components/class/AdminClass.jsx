import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import SidebarDashboard from "../admin/SidebarDashboard";
function AdminClass() {
    const { isAuthorized, classes, setClasses, setSelectedClassId } = useContext(Context);
    const navigateTo = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/class/admin/classes", { withCredentials: true })
            .then((res) => {
                if (res.data && Array.isArray(res.data.classes)) {
                    setClasses(res.data.classes); // Store class objects in context
                } else {
                    console.error("Unexpected API response format:", res.data);
                    setClasses([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching classes:", error);
                setClasses([]);
            });
    }, [setClasses]);

    useEffect(() => {
        if (isAuthorized === false) {
            navigateTo("/");
        }
    }, [isAuthorized, navigateTo]);

    if (isAuthorized === undefined) {
        return <p>Loading...</p>;
    }

    // Function to set the selected class ID when a class is chosen
    const handleSelectClass = (id) => {
        setSelectedClassId(id);
    };

    return (
        <>
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
                            {classes.length > 0 ? (
                                classes.map((element) => (
                                    <div key={element._id} className="class-card mb-6">
                                        <p>Class Name: {element.name}</p>
                                        <p>Class Code: {element.classCode}</p>
                                        <button
                                            className="manage-btn"
                                            onClick={() => handleSelectClass(element._id)}
                                        >
                                            <Link to={`/class/${element._id}/dashboard`}>Select Class</Link>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>You are not admin in any class.</p>
                            )}
                        </div>

                    </section>
                </div>
            </div>
        </div>
        </>
    );
}

export default AdminClass;
