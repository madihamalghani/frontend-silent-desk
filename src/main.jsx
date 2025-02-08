
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import here
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Import Bootstrap JS
import { StrictMode, createContext, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
export const Context = createContext({ isAuthorized: false });

const AppWrapper = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    // const [user, setUser] = useState([]);
    const [user, setUser] = useState(null); // Store user object instead of an empty array
    const [loading, setLoading] = useState(false); // Handle loading state
    const [error, setError] = useState(null); // Store errors
    const [classes, setClasses] = useState([]); // Store classes user is in
    const [messages, setMessages] = useState([]); // Store messages in class

    return (
        <Context.Provider value={{ isAuthorized, setIsAuthorized,
            user, setUser,
            loading, setLoading,
            error, setError,
            classes, setClasses,
            messages, setMessages }}>
            <App />
        </Context.Provider>
    );
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AppWrapper />
    </StrictMode>
);