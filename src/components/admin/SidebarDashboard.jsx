import React from 'react';
import { Link } from 'react-router-dom';
function SidebarDashboard() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar">
            <h3 className="d-flex align-items-center">
                <img className="profile_dashboard" src="../src/assets/username.png"  />
                Admin
            </h3>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link link-body-emphasis" aria-current="page">
                        <img className="sidebar-img" src="../src/assets/Home.png"  />
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/admin/classes" className="nav-link link-body-emphasis">
                        <img className="sidebar-img" src="../src/assets/myclasses.png"  />
                        Admin Classes
                    </Link>
                </li>
                <li>
                    <Link to="/member/classes" className="nav-link link-body-emphasis">
                        <img className="sidebar-img" src="../src/assets/myclasses.png"  />
                        Membership Class
                    </Link>
                </li>


                <li>
                    <Link to="/class/user/settings" className="nav-link link-body-emphasis">
                        <img className="sidebar-img" src="../src/assets/setting.png"  />
                        Settings
                    </Link>
                </li>
                <li>
                    <Link to="/" className="nav-link link-body-emphasis">
                        <img className="sidebar-img" src="../src/assets/logout.png"  />
                        Logout
                    </Link>
                </li>
            </ul>
            <hr />
        </div>
    );
}

export default SidebarDashboard
