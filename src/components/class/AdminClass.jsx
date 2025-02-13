import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import Sidebar from "../admin/Sidebar";

function AdminClass() {
    const [adminClass, setAdminClass] = useState([]); 
    const { isAuthorized } = useContext(Context);
    const navigateTo = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/class/admin/classes", { withCredentials: true })
            .then((res) => {
                if (res.data && Array.isArray(res.data.classes)) {
                    setAdminClass(res.data.classes);
                } else {
                    console.error("Unexpected API response format:", res.data);
                    setAdminClass([]); 
                }
            })
            .catch((error) => {
                console.error("Error fetching classes:", error);
                setAdminClass([]); 
            });
    }, []);

    useEffect(() => {
        if (isAuthorized === false) {
            navigateTo("/");
        }
    }, [isAuthorized, navigateTo]);

    // ✅ Prevents unmounting issues
    if (isAuthorized === undefined) {
        return <p>Loading...</p>;
    }

    return (
        <div className="dashboard-container mb-4">
            <Sidebar />
            <div>
                <div className="feature-container text-center">
                    <h2 className="feature-heading">Welcome to your Classes</h2>
                </div>

                <div className="container request-container">
                    <section className="my-classes" key={adminClass.length}>
                        <h2 className="mb-4 request-heading">My Classes</h2>

                        <div>
                            {adminClass.length > 0 ? (
                                adminClass.map((element) => (
                                    <div key={element._id} className="class-card mb-6">
                                        <p>{element.name}</p>
                                        <p>Class Code: {element.classCode}</p>
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

export default AdminClass;
