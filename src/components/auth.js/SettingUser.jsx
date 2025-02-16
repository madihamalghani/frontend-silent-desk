import axios from "axios";
import React, { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import SidebarDashboard from "../admin/SidebarDashboard";

function SettingUser() {
    const { isAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    // Redirect if not authorized
    useEffect(() => {
        if (!isAuthorized) {
            navigateTo("/login");
        }
    }, [isAuthorized, navigateTo]);

    // Function to delete the account
    const deleteAccount = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account permanently? This action cannot be undone."
        );
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(
                "http://localhost:5000/api/auth/delete/account",
                { withCredentials: true }
            );
            toast.success(response.data.message || "Account deleted successfully!");
            // Optionally, log the user out and redirect to the homepage or login page
            navigateTo("/login");
        } catch (error) {
            console.error("Error deleting account:", error);
            toast.error(
                error.response?.data?.message || "Failed to delete account."
            );
        }
    };

    return (
        <div className="dashboard-container mb-4">
            <SidebarDashboard />
            <div>
                <div className="text-center">
                    <h2 className="feature-heading">Welcome to the Settings!</h2>
                </div>
                <section className="profile-settings">
                    <h2 className="profile-heading">Profile Information</h2>
                    {user ? (
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Joined At:</th>
                                    <td>{user.joinedAt}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p>Loading user details...</p>
                    )}
                </section>
                <section className="profile-settings">
                    <h2 className="profile-heading">Danger Zone</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Do you want to delete your account from the website permanently?
                                </td>
                                <td>
                                    <button className="remove-btn" onClick={deleteAccount}>
                                        Delete Account
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}

export default SettingUser;
