import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../main';

// Import icons from react-icons (using Font Awesome icons as an example)
import {
    FaBullhorn,
    FaClipboardList,
    FaCog,
    FaEnvelopeOpenText,
    FaHome,
    FaInfoCircle,
    FaPaperPlane,
    FaRegPaperPlane,
    FaReply,
    FaUserEdit,
    FaUsers
} from 'react-icons/fa';

function Sidebar() {
    const { selectedClassId } = useContext(Context);

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sidebar">
            <h3 className="d-flex align-items-center">
                {/* You can add a profile icon here if needed */}
                <FaUserEdit className="me-2" /> Admin
            </h3>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link link-body-emphasis" aria-current="page">
                        <FaHome className="me-2" />
                        Home
                    </Link>
                </li>
                <li>
                    {selectedClassId ? (
                        <Link to={`/class/${selectedClassId}/pending-requests`} className="nav-link link-body-emphasis">
                            <FaClipboardList className="me-2" />
                            Requests
                        </Link>
                    ) : (
                        <span className="nav-link disabled link-body-emphasis">
                            <FaClipboardList className="me-2" />
                            Requests
                        </span>
                    )}
                </li>
                <li>
                    <Link to="/class/inbox/message/received" className="nav-link link-body-emphasis">
                        <FaEnvelopeOpenText className="me-2" />
                        Received Messages
                    </Link>
                </li>
                <li>
                    <Link to={`/all/announcements/:id`} className="nav-link link-body-emphasis">
                        <FaBullhorn className="me-2" />
                        Announcements
                    </Link>
                </li>
                <li>
                    <Link to="/class/inbox/message/setting" className="nav-link link-body-emphasis">
                        <FaPaperPlane className="me-2" />
                        Sent Operations
                    </Link>
                </li>
                <li>
                    <Link to="/reply/:messageId" className="nav-link link-body-emphasis">
                        <FaReply className="me-2" />
                        Reply message
                    </Link>
                </li>
                <li>
                    <Link to="/class/inbox/message/sent" className="nav-link link-body-emphasis">
                        <FaRegPaperPlane className="me-2" />
                        Sent Messages
                    </Link>
                </li>
                <li>
                    <Link to={`/class/:id/approved/members`} className="nav-link link-body-emphasis">
                        <FaUsers className="me-2" />
                        Members
                    </Link>
                </li>
                <li>
                    <Link to={`/class/:id/admin/update`} className="nav-link link-body-emphasis">
                        <FaUserEdit className="me-2" />
                        Update Status
                    </Link>
                </li>
                <li>
                    <Link to={`/class/:id/update/details`} className="nav-link link-body-emphasis">
                        <FaInfoCircle className="me-2" />
                        Update Class Details
                    </Link>
                </li>
                <li>
                    <Link to="/class/:id/user/settings" className="nav-link link-body-emphasis">
                        <FaCog className="me-2" />
                        Settings
                    </Link>
                </li>
                
            </ul>
            <hr />
        </div>
    );
}

export default Sidebar;
