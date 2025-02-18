import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';

function Herosection() {
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
            <header className="header mb-4">
                <div className="header-content">
                    <h1>A Safe Space for Honest Conversations!</h1>
                    <p>Join your class, send anonymous feedback, and see what others think about you—without revealing identities.</p>

                    {/* Buttons that navigate based on authorization */}
                    <button className="text-light header-button" onClick={() => handleNavigation('/createclass')}>
                        Create Class
                    </button>
                    <button className="text-light header-button" onClick={() => handleNavigation('/join/class')}>
                        Join Class
                    </button>
                </div>

                <img src="../src/assets/mainphoto.svg" alt="header photo" />
            </header>
        </>
    );
}

export default Herosection;
