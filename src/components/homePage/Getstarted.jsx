import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';

function Getstarted() {
    const { isAuthorized,user } = useContext(Context); 
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        if (!isAuthorized) {
            navigate('/register'); 
        } else {
            navigate(path);
        }
    };

    return (
        <>
 <div className="container mb-6">
        <h2 className="card-heading">Get Started – Join, Create, or Login!</h2>
    </div>
    <div className="container margintop">
        <div className="row container text-center mb-6">


            <div className="col-md-4">
                <div className="h-100 p-5  border rounded-3 card-design mb-3">
                    <h3>Create Class</h3>
                    <p>Be the leader of your class! Create a space where students can share feedback anonymously. Build
                        a culture of honest opinions.</p>
                    <button className="button">
                        <span className="button-content" onClick={() => handleNavigation('/createclass')}>Create Class</span>
                    </button>
                </div>
            </div>
            <div className="col-md-4">
                <div className="h-100 p-5  border rounded-3 card-design">
                    <h3>Join Class</h3>
                    <p>Step into a world of anonymous feedback! Find your class, register, and start receiving messages
                        without revealing your identity.</p>

                    <button className="button">
                        <span className="button-content" onClick={() => handleNavigation('/join/class')}>Join Class</span>
                    </button>
                </div>
            </div>
            <div className="col-md-4">
                <div className="h-100 p-5 border rounded-3 card-design">
                    <h3>Login to Class</h3>
                    <p>Already part of a class? Just enter your details and access your private dashboard. Read
                        messages, interact anonymously, and see what your classmates have to say!</p>
                    <button className="button">
                        <span className="button-content" onClick={() => handleNavigation('/login')}>Login</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

export default Getstarted
