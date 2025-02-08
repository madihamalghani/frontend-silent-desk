import React from 'react';
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-column">
                        <h3>Silent Desk</h3>
                        <p>A safe space for honest conversations. Join, create, and engage in anonymous feedback seamlessly.</p>
                    </div>

                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/work">How it Works</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Connect With Us</h3>
                        <p>Email: support@silentdesk.com</p>
                        <div className="social-icons">
                            <Link to={'/'} target='_blank'><FaFacebook /></Link>
                            <Link to={'/'} target='_blank'><FaYoutube /></Link>
                            <Link to={'/'} target='_blank'><FaLinkedin /></Link>
                            {/* <Link to={'/'} target='_blank'><RiInstagramFill/></Link> */}
                            <Link to={'/'} target='_blank'><FaGithub /></Link>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">&copy; Madiha Fatima. All rights reserved.</p>
                </div>
            </footer>


        </>
    )
}

export default Footer
