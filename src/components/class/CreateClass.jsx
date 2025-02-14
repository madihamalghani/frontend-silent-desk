import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

function CreateClass() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    
    const { isAuthorized } = useContext(Context);
    const navigateTo = useNavigate();

    // Ensure the user is authorized before rendering
    useEffect(() => {
        if (isAuthorized === false) {
            navigateTo("/");
        }
    }, [isAuthorized, navigateTo]);

    if (isAuthorized === undefined) {
        return <p>Loading...</p>;
    }

    // Function to create a class
    const createClass = async (e) => {
        e.preventDefault();
        console.log("Submitting class creation...");

        try {
            const { data } = await axios.post(
                'http://localhost:5000/api/class/create',
                { name, description, category },
                { withCredentials: true, headers: { "Content-Type": "application/json" } }
            );

            console.log("API Response:", data); // Debugging
            toast.success(data.message);

            // Reset form fields
            setName("");
            setDescription("");
            setCategory("");

            // Navigate to the dashboard after success
            navigateTo("/admin/dashboard");
        } catch (error) {
            console.error("Error:", error.response?.data?.message || error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="mega-form-container mb-4">
            <form className="form_container" onSubmit={createClass}>
                <div className="title_container">
                    <p className="title">Create Your Class & Build a Community</p>
                    <span className="subtitle">Set up your class space, invite students, and start anonymous discussions!</span>
                </div>

                <div className="input-group">
                    <label className="input_label" htmlFor="class-name">Class Name</label>
                    <input
                        className="input_field"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="class-name"
                        placeholder="Enter class name"
                        required
                    />
                </div>

                <div className="input-group">
                    <label className="input_label" htmlFor="class-description">Class Description</label>
                    <textarea
                        className="input_field"
                        id="class-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your class"
                    />
                </div>

                <div className="input-group">
                    <label className="input_label" htmlFor="category">Class Type</label>
                    <select
                        className="input_field"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Classmates">Classmates</option>
                        <option value="Colleague">Colleagues</option>
                        <option value="Friends">Friends</option>
                        <option value="Anonymous Discussion">Anonymous Discussion</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Submit button (fixed issue with <Link>) */}
                <button type="submit" className="form_btn">Create Class</button>
            </form>

            <div className="text-center">
                <h2 className="create-class-heading text-center">Create Class</h2>
                <img src="../src/assets/createclass.svg" alt="Create Class Illustration" />
            </div>
        </div>
    );
}

export default CreateClass;
