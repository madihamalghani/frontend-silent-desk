import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from "react-hot-toast";
import { Context } from '../../main';

function JoinClass() {
    const [classCode, setClassCode] = useState("");  // User enters class code
    const [classData, setClassData] = useState(null);  // Stores found class details
    const [classDisplayName, setClassDisplayName] = useState("");  // User display name for request
    const { isAuthorized } = useContext(Context);

    const findClass = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`http://localhost:5000/api/class/found/bycode?classCode=${classCode}`, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            });

            toast.success(data.message);
            setClassData(data.class);  // Store class details
            setClassCode(""); 
        } catch (error) {
            console.error(error.response?.data?.message || "Class not found");
            toast.error(error.response?.data?.message || "An error occurred");
            setClassData(null);
        }
    };

    const sendJoinRequest = async (e) => {
        e.preventDefault();
        if (!classDisplayName.trim()) {
            return toast.error("Please provide a display name");
        }
        if (!classData || !classData.classCode) {
            return toast.error("Invalid class data. Please try again.");
        }

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/membership/join/request",
                { classCode: classData.classCode, classDisplayName },  // Sending classCode + displayName
                { withCredentials: true, headers: { "Content-Type": "application/json" } }
            );

            toast.success(data.message || "Request sent successfully!");
            setClassDisplayName("");
        } catch (error) {
            console.error(error.response?.data?.message || "Request failed");
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <>
            <div className="container feature-heading-container mb-4">
                <h2 className="feature-heading">Join a Class and Be a Part of the Community!</h2>
            </div>

            <div className="option-form-container mb-6">
                <div className="col-md-10">
                    <div className="p-5 border rounded-3 card-design mb-3">
                        <h3>Find a Class</h3>
                        <p>Enter the class code provided by your teacher, friend, or colleague to join the discussion.</p>
                        <div className="input_container">
                            <input
                                value={classCode}
                                onChange={(e) => setClassCode(e.target.value)}
                                placeholder="Enter class code"
                                name="class-code"
                                type="text"
                                className="input_field"
                                id="class-code-field"
                            />
                            <button className="button" onClick={findClass}>
                                <span className="button-content">Find Class</span>
                            </button>
                        </div>
                    </div>
                </div>

                {classData ? (
                    <div className="col-md-10">
                        <div className="p-5 border rounded-3 card-design">
                            <h3>Class Details</h3>
                            <p><strong>Class Name:</strong> {classData.name}</p>
                            <p><strong>Class Code:</strong> {classData.classCode}</p>
                            <p><strong>Created By:</strong> {classData.teacherName}</p>
                            <p><strong>Description:</strong> {classData.description || "No description available"}</p>

                            <div className="input_container mt-3">
                                <label>Your Display Name:</label>
                                <input
                                    value={classDisplayName}
                                    onChange={(e) => setClassDisplayName(e.target.value)}
                                    placeholder="Enter your display name"
                                    type="text"
                                    className="input_field"
                                />
                            </div>
                            <button className="button mt-3" onClick={sendJoinRequest}>
                                <span className="button-content">Send Request</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="col-md-10">
                        <div className="p-5 border rounded-3 card-design">
                            <h3>No class found yet</h3>
                            <p>Please enter a class code and click "Find Class" to search.</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default JoinClass;
