import { default as React, useContext } from 'react';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import Sidebar from './Sidebar';
function adminDashboard() {
    const { isAuthorized } = useContext(Context);

    const navigate = useNavigate(); // Get navigation function

    if (!isAuthorized) {
        toast.error("You need to log in to access this page.");
        navigate("/"); // Redirect to login page
        return null; // Stop rendering the component
    }

    return (
        <Sidebar/>
        
    )
}

export default adminDashboard
