import React from 'react';
import { FaChalkboardTeacher, FaCog, FaHome, FaSignInAlt, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SidebarDashboard() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar">
            <h3 className="d-flex align-items-center">
                <FaChalkboardTeacher className="me-2" size={32} />
                Admin
            </h3>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link link-body-emphasis" aria-current="page">
                        <FaHome className="me-2" size={20} />
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/admin/classes" className="nav-link link-body-emphasis">
                        <FaChalkboardTeacher className="me-2" size={20} />
                        Admin Classes
                    </Link>
                </li>
                <li>
                    <Link to="/member/classes" className="nav-link link-body-emphasis">
                        <FaUsers className="me-2" size={20} />
                        Membership Class
                    </Link>
                </li>
                <li>
                    <Link to="/join/class" className="nav-link link-body-emphasis">
                        <FaSignInAlt className="me-2" size={20} />
                        Join Class
                    </Link>
                </li>
                <li>
                    <Link to="/class/user/settings" className="nav-link link-body-emphasis">
                        <FaCog className="me-2" size={20} />
                        Settings
                    </Link>
                </li>
            </ul>
            <hr />
        </div>
    );
}

export default SidebarDashboard;
