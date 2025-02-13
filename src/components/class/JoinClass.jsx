import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from "react-hot-toast";
import { Context } from '../../main';

function JoinClass() {
    const [classCode, setClassCode] = useState("");
    const [classData, setClassData] = useState(null);  // Store class details
    const [error, setError] = useState(null); // Store error message
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
            setError(null);  // Clear previous error if successful
            setClassCode(""); 
        } catch (error) {
            console.error(error.response?.data?.message || "An error occurred");
            toast.error(error.response?.data?.message || "An error occurred");
            setClassData(null);
            setError("No class found. Please check the class code."); // Set error message
        }
    };

    return (
        <>
            <div className="container feature-heading-container mb-4">
                <h2 className="feature-heading">Find Your Class</h2>
            </div>

            <div className="option-form-container mb-6">
                <div className="col-md-10">
                    <div className="p-5 border rounded-3 card-design mb-3">
                        <h3>Join a Class</h3>
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

                {/* 🟢 Error Message (if no class found) */}
                {error && (
                    <div className="col-md-10">
                        <div className="p-4 border rounded-3 card-design text-center text-danger">
                            <h4>{error}</h4>
                        </div>
                    </div>
                )}

                {/* 🟢 Display the class details if found */}
                {classData && (
                    <div className="col-md-10">
                        <div className="p-5 border rounded-3 card-design">
                            <h3>Class Details</h3>
                            <p><strong>Class Name:</strong> {classData.name}</p>
                            <p><strong>Class Code:</strong> {classData.classCode}</p>
                            <p><strong>Created By:</strong> {classData.teacherName}</p>
                            <p><strong>Description:</strong> {classData.description || "No description available"}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default JoinClass;
