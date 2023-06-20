import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const handleLogout = () => {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token")
            navigate("/login")
        }
    }

    return (
        <nav className="bg-gray-800">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-white">
                        iNotebook
                    </Link>
                    <div className="flex items-center">
                        <Link
                            to="/home"
                            className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/home" ? "active" : ""}`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium ${location.pathname === "/about" ? "active" : ""}`}
                        >
                            About
                        </Link>
                    </div>
                    {!localStorage.getItem("token") ?
                        <div className="flex items-center">
                            <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline">Login</Link>
                            <Link to="/signup" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</Link>
                        </div>
                        : <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Logout
                        </button>

                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
