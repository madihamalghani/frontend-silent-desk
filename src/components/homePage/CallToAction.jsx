import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';

function CallToAction() {
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
            <section className="cta">
                <div className="cta-content">
                    <h2>Ready to Get Started?</h2>
                    <p>Join your class, send anonymous feedback, and engage in honest conversations today!</p>
                    <div className="cta-buttons">
                        <button className="btn btn-light" onClick={() => handleNavigation('/createclass')}>Create Class</button>
                        <button className="cta-btn secondary" onClick={() => handleNavigation('/join/class')}>Join Class</button>
                    </div>
                </div>
            </section>

        </>
    )
}

export default CallToAction
