import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../axios'; // Importe o axios configurado
import { FaArrowLeft, FaRegCompass, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { CgAdd } from "react-icons/cg";
import { GrTrophy } from "react-icons/gr";
import logo from '../assets/logo.png';

function MySidebar({ logout, login }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            localStorage.setItem('authToken', response.data.token);
            login();
            navigate('/dashboard/tourneys');
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('/register', { email, password, name: username, password_confirmation: confirmPassword });
            localStorage.setItem('authToken', response.data.token);
            login();
            navigate('/dashboard/tourneys');
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
        }
    };

    const sidebarBgColor = 'bg-[#0C0909]';
    const sidebarBorderColor = 'border-r-[#B22222]';

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    const isHomePage = location.pathname === '/';

    if (isHomePage) {
        return null;
    }

    return (
        <div className={`flex-shrink-0 ${sidebarBgColor} ${sidebarBorderColor} border-r-4 ${isAuthPage ? 'w-6/12 p-4' : 'w-16 p-2'} h-screen  flex flex-col`}>
            {isAuthenticated && !isAuthPage ? (
                <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-center mb-4 h-16">
                        <div className="w-full">
                            <img src={logo} alt="Logo" className="w-full h-auto" />
                        </div>
                    </div>
                    <ul className="flex-1 text-white text-2xl">
                        <li className="mb-3">
                            <Link to="/dashboard/tourneys" className="flex items-center justify-center hover:bg-[#1a1212] p-1 rounded transition duration-300">
                                <FaRegCompass className="w-8 h-8" />
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/dashboard/my-tourneys" className="flex items-center justify-center hover:bg-[#1a1212] p-1 rounded transition duration-300">
                                <GrTrophy className="w-8 h-8" />
                            </Link>
                        </li>
                        <li className="mb-3">
                            <Link to="/create-tournament" className="flex items-center justify-center hover:bg-[#1a1212] p-1 rounded transition duration-300">
                                <CgAdd className="w-8 h-8" />
                            </Link>
                        </li>
                    </ul>
                    <div className="flex justify-center mt-auto">
                        <button onClick={logout} className="flex items-center text-red-500 hover:bg-[#1a1212] p-2 rounded transition duration-300">
                            <FaSignOutAlt className="w-8 h-8" />
                        </button>
                    </div>
                </div>                           
            ) : (
                <div className="text-white flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center self-end">
                            <Link to="/" className="text-white mr-2"><FaArrowLeft /></Link>
                            <h2 className="text-xl font-extrabold underline">{isAuthPage ? (location.pathname === '/login' ? 'Login' : 'Register') : ''}</h2>
                        </div>
                        <div className="flex-shrink-1">
                            <img src={logo} alt="Logo" className="h-36" />
                        </div>
                    </div>
                    <form className="flex flex-col h-full justify-between space-y-4">
                        {location.pathname === '/login' ? (
                            <>
                                <div>
                                    <div>
                                        <label className="block mb-1">Email:</label>
                                        <input 
                                            type="email" 
                                            className="text-black w-full p-2 rounded border border-[#B22222] border-[3px]" 
                                            placeholder="Your email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1">Password:</label>
                                        <input 
                                            type="password" 
                                            className="text-black w-full p-2 rounded border border-[#B22222] border-[3px]" 
                                            placeholder="Your password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="pb-10">
                                    <div className="flex justify-center">
                                        <button type="button" className="bg-[#8B0000] text-white p-2 rounded font-bold px-16 py-3" onClick={handleLogin}>Login</button>
                                    </div>
                                    <div className="text-center mt-2">
                                        <p>
                                            Don't have an account? <Link to="/register" className="underline text-[#B22222] font-bold">Register here</Link>
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block mb-1 font-bold">Username</label>
                                    <input 
                                        type="text" 
                                        className="text-black w-full p-2 rounded border border-[#B22222] border-[3px]" 
                                        placeholder="Your username" 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-bold">Email</label>
                                    <input 
                                        type="email" 
                                        className="text-black w-full p-2 rounded border border-[#B22222] border-[3px]" 
                                        placeholder="Your email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-bold">Password</label>
                                    <input 
                                        type="password" 
                                        className="text-black w-full p-2 rounded border border-[#B22222] border-[3px]" 
                                        placeholder="Your password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-bold">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        className="text-black w-full p-2 rounded border border-[#B22222] border-[3px]" 
                                        placeholder="Confirm your password" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="pb-10">
                                    <div className="flex justify-center">
                                        <button type="button" className="bg-[#8B0000] text-white p-2 rounded font-bold px-16 py-3" onClick={handleRegister}>Register</button>
                                    </div>
                                    <div className="text-center mt-2">
                                        <p>
                                            Already have an account? <Link to="/login" className="underline text-[#B22222] font-bold">Login here</Link>
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
}

export default MySidebar;
