//user in specific Class Setting
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import Sidebar from "../admin/Sidebar";

function Setting() {
    const { isAuthorized, selectedClassId, user } = useContext(Context);
    const navigateTo = useNavigate();
    const [memberDetails, setMemberDetails] = useState(null);

    // Redirect if not authorized
    useEffect(() => {
        if (!isAuthorized) {
            navigateTo("/login");
        }
    }, [isAuthorized, navigateTo]);

    // Fetch membership list for the selected class and extract logged in user's membership details
    useEffect(() => {
        const fetchMembershipDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/membership/list/members/${selectedClassId}`,
                    { withCredentials: true }
                );

                const members = response.data.members;
                const loggedUserMembership = members.find(
                    (member) => member.userId._id === user._id
                );

                if (loggedUserMembership) {
                    setMemberDetails(loggedUserMembership);
                } else {
                    toast.error("Logged in user is not a member of the selected class.");
                }
            } catch (error) {
                console.error("Error fetching membership details:", error);
                toast.error("Unable to fetch membership details.");
            }
        };

        if (selectedClassId && user?._id) {
            fetchMembershipDetails();
        }
    }, [selectedClassId, user, navigateTo]);

    // Function to leave the class
    const leaveClass = async () => {
        const confirmLeave = window.confirm(
            "Are you sure you want to leave this class?"
        );
        if (!confirmLeave) return;

        try {
            const response = await axios.delete(
                `http://localhost:5000/api/membership/leave/as-member/${selectedClassId}`,
                { withCredentials: true }
            );
            console.log("Leave class response:", response.data);
            toast.success("You have left the class successfully!");
            // Optionally, you can redirect the user after leaving the class.
            navigateTo("/");
        } catch (error) {
            console.error("Error leaving the class:", error);
            toast.error(
                error.response?.data?.message || "Unable to leave the class."
            );
        }
    };


    return (
        <div className="dashboard-container mb-4">
            <Sidebar />
            <div>
                <div className="text-center">
                    <h2 className="feature-heading">Welcome to the Settings!</h2>
                </div>
                <section className="profile-settings">
                    <h2 className="profile-heading">Profile Information</h2>
                    {memberDetails ? (
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>{memberDetails.classDisplayName}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{memberDetails.userId.email}</td>
                                </tr>
                                <tr>
                                    <th>Role:</th>
                                    <td>{memberDetails.role}</td>
                                </tr>
                                <tr>
                                    <th>Joined:</th>
                                    <td>
                                        {new Date(memberDetails.joinedAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p>Loading your profile details...</p>
                    )}
                </section>
                <section className="profile-settings">
                    <h2 className="profile-heading">Danger Zone</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Wanna Leave This Class?</td>
                                <td>
                                    <button className="remove-btn" onClick={leaveClass}>
                                        Leave This Class
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Do you want to delete your account from the website permanently?
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}

export default Setting;
