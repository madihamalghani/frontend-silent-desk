import React from 'react'

function Features() {
    return (
        <>
        <div className="container feature-heading-container">
        <h2 className="feature-heading"> Why Use This App?</h2>
    </div>
    <div className="container">
        <div className="feature-container margintop mb-3">
            <div>
                <h3>Anonymous Messaging</h3>
                <div className="feature-icon">
                    <img src="../src/assets/chat.png" alt="Anonymous Messaging"/>
                </div>
                <p>Send feedback without revealing your identity.</p>
            </div>
            <div>
                <h3>Safe & Secure</h3>
                <div className="feature-icon">
                    <img src="../src/assets/security.png" alt="Anonymous Messaging"/>
                </div>
                <p>No personal data is collected.</p>
            </div>
            
            <div>
                <h3>Easy to Use</h3>
                <div className="feature-icon">
                    <img src="../src/assets/convenient.png" alt="Anonymous Messaging"/>
                </div>
                <p>Join with a single code.</p>
            </div>
        </div>
    </div>

        </>
    )
}

export default Features
