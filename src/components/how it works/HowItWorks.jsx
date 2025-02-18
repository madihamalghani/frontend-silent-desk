import "bootstrap/dist/css/bootstrap.min.css";
import { FaBullhorn, FaCommentDots, FaReply, FaShieldAlt, FaUserFriends, FaUserTag } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaUserFriends size={40} className="text-primary" />,
            title: "Create or Join a Class",
            description: "Anyone can create a class or join an existing one to participate."
        },
        {
            icon: <FaCommentDots size={40} className="text-success" />,
            title: "Anonymous Messaging",
            description: "Registered students can send anonymous messages to others in the class."
        },
        {
            icon: <FaReply size={40} className="text-info" />,
            title: "Reply to Messages",
            description: "You can reply to anonymous messages while keeping identities hidden."
        },
        {
            icon: <FaShieldAlt size={40} className="text-danger" />,
            title: "Admin Controls",
            description: "Admins can approve or block requests, promote users, and manage class settings."
        },
        {
            icon: <FaBullhorn size={40} className="text-warning" />,
            title: "Class Announcements",
            description: "Admins can make important announcements to the entire class."
        },
        {
            icon: <FaUserTag size={40} className="text-secondary" />,
            title: "Unique Class Display Name",
            description: "Every user has a unique class display name for proper identification."
        }
    ];

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">How It Works</h1>
            <p className="text-center text-muted">A simple way to share thoughts anonymously and manage class interactions.</p>
            <div className="row g-4 mt-4">
                {steps.map((step, index) => (
                    <div key={index} className="col-md-6 d-flex">
                        <div className="card p-4 shadow-sm text-center w-100 d-flex flex-column">
                            <div className="mb-3">{step.icon}</div>
                            <h2 className="h5 flex-grow-1">{step.title}</h2>
                            <p className="text-muted">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
