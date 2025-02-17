import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../main';

function Sidebar() {
    const { selectedClassId } = useContext(Context);

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar">
            <h3 className="d-flex align-items-center">
                {/* <img className="profile_dashboard" src="../src/assets/username.png"  /> */}
                Admin
            </h3>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link link-body-emphasis" aria-current="page">
                        {/* <img className="sidebar-img" src="../src/assets/Home.png"  /> */}
                        Home
                    </Link>
                </li>


                {/* If a class is selected, show the dynamic Requests link */}
                <li>
                    {selectedClassId ? (
                        <Link to={`/class/${selectedClassId}/pending-requests`} className="nav-link link-body-emphasis">
                            {/* <img className="sidebar-img" src="../src/assets/requests.png"  /> */}
                            Requests
                        </Link>
                    ) : (
                        // Optionally, you can disable or hide the link if no class is selected
                        <span className="nav-link disabled link-body-emphasis">
                            {/* <img className="sidebar-img" src="../src/assets/requests.png"  /> */}
                            Requests
                        </span>
                    )}
                </li>
                <li>
                    <Link to="/class/inbox/message/received" className="nav-link link-body-emphasis">
                        {/* <img className="sidebar-img" src="../src/assets/mail.png"  /> */}
                        Received Messages
                    </Link>
                </li>
                <li>
                    <Link to="/class/inbox/message/setting" className="nav-link link-body-emphasis">
                        {/* <img className="sidebar-img" src="../src/assets/mail.png"  /> */}
                        Sent Operations
                    </Link>
                </li>
                <li>
                    <Link to="/reply/:messageId" className="nav-link link-body-emphasis">
                        {/* <img className="sidebar-img" src="../src/assets/mail.png"  /> */}
                        Reply message
                    </Link>
                </li>
                <li>
                    <Link to="/class/inbox/message/sent" className="nav-link link-body-emphasis">
                        {/* <img className="sidebar-img" src="../src/assets/mail.png"  /> */}
                        Sent Messages
                    </Link>
                </li>
                <li>
                    <Link to={`/class/:id/approved/members`} className="nav-link link-body-emphasis">
                        {/* <img className="sidebar-img" src="members"  /> */}
                        Members
                    </Link>
                </li>
                <li>
                    <Link to={`/class/:id/admin/update`} className="nav-link link-body-emphasis">
                        {/* <img className="sidebar-img" src="members"  /> */}
                        Update Status
                    </Link>
                </li>
                <li>
                    <Link to={`/class/:id/update/details`} className="nav-link link-body-emphasis">
                        {/* <img className="sidebar-img" src="members"  /> */}
                        Update Class Details
                    </Link>
                </li>
                <li>
                    <Link to="/class/:id/user/settings" className="nav-link link-body-emphasis">
                        {/* <img className="sidebar-img" src="../src/assets/setting.png" /> */}
                        Settings
                    </Link>
                </li>
                <li>
                    <Link to="/" className="nav-link link-body-emphasis">
                        {/* <img className="sidebar-img" src="../src/assets/logout.png" /> */}
                        Logout
                    </Link>
                </li>
            </ul>
            <hr />
        </div>
    );
}

export default Sidebar;
