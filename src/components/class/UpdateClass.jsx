import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main"; // Adjust the path as needed
import Sidebar from "../admin/Sidebar";

function UpdateClass() {
    const { isAuthorized,selectedClassId } = useContext(Context);
    const navigateTo = useNavigate();
  

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);

    // Redirect if not authorized
    useEffect(() => {
        if (!isAuthorized) {
            navigateTo("/login");
        }
    }, [isAuthorized, navigateTo]);

    // Fetch class details to pre-fill the form
    useEffect(() => {
        if (selectedClassId) {
            axios
                .get(`http://localhost:5000/api/class/details/${selectedClassId}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    console.log("API response:", res.data);
                    // Assuming your API returns { success: true, class: { ... } }
                    const currentDetails = res.data.class;
                    setFormData({
                        name: currentDetails.name || "",
                        description: currentDetails.description || "",
                    });
                })
                .catch((error) => {
                    console.error("Error fetching class details:", error);
                    toast.error("Unable to fetch current class details.");
                });
        }
    }, [selectedClassId]);

    // Handler for input changes
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Handler for form submission (using PUT to update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.put(
                `http://localhost:5000/api/class/update/details/${selectedClassId}`,
                formData,
                { withCredentials: true }
            );
            if (res.data.success) {
                toast.success("Class details updated successfully!");
            } else {
                toast.error("Failed to update class details.");
            }
        } catch (error) {
            console.error("Error updating class details:", error);
            toast.error(
                error.response?.data?.message || "Error updating class details."
            );
        }
        setLoading(false);
    };

    return (
        <div className="dashboard-container mb-4">
            <Sidebar />
            <div className="container my-4">
                <div className="text-center mb-4">
                    <h2 className="feature-heading">Update Class Details</h2>
                </div>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="className" className="form-label">
                                    <strong>Class Name</strong>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="className"
                                    name="name"
                                    placeholder="Enter class name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classDescription" className="form-label">
                                    <strong>Class Description</strong>
                                </label>
                                <textarea
                                    className="form-control"
                                    id="classDescription"
                                    name="description"
                                    placeholder="Enter class description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="form_btn"
                                    disabled={loading}
                                >
                                    {loading ? "Updating..." : "Update Class Details"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateClass;
