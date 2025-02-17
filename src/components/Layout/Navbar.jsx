import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main';
function Navbar() {
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();
    const handleLogout = async () => {

        try {
            const response = await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true })
            setIsAuthorized(false);
            toast.success(response.data.message);
            navigateTo("/home");
        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthorized(true);
        }
    }
    return (
        <>


            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom background-nav">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <span className="fs-4 marginleft color-white">Silent Desk</span>
                </Link>
                <ul className="nav nav-pills text-white marginright">
                    <li className="nav-item">
                        <Link to="/" className="nav-link navlinks fontnav text-white" aria-current="page">Home</Link>
                    </li>
                    {isAuthorized && (
                        <>
                            <li className="nav-item"><Link to="/createclass" className="nav-link navlinks fontnav text-white">Create Class</Link></li>
                            <li className="nav-item"><Link to="/join/class" className="nav-link navlinks fontnav text-white">Join Class</Link></li>
                            {/* <li className="nav-item"><Link to="/allclasses" className="nav-link navlinks fontnav text-white">All Classes</Link></li> */}
                            <li className="nav-item"><Link to="/admin/dashboard" className="nav-link navlinks fontnav text-white">Dashboard</Link></li>
                            <li className="nav-item">
                                <button className="nav-link navlinks fontnav text-white btn btn-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    )}

                    {!isAuthorized && (
                        <>
                            <li className="nav-item"><Link to="/register" className="nav-link navlinks fontnav text-white">Register</Link></li>
                            <li className="nav-item"><Link to="/login" className="nav-link navlinks fontnav text-white">Login</Link></li>
                            <li className="nav-item"><Link to="/work" className="nav-link navlinks fontnav text-white">How it Works</Link></li>

                        </>
                    )}

                    {/* <li className="nav-item"><Link to="/work" className="nav-link navlinks fontnav text-white">How it Works</Link></li> */}
                </ul>
            </header>

        </>
    )
}

export default Navbar