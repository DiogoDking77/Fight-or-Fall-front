import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRegCompass, FaSignOutAlt } from 'react-icons/fa';
import { CgAdd } from "react-icons/cg";
import { GrTrophy } from "react-icons/gr";
import logo from '../assets/logo.png';

function MySidebar({ logout, onCreateTournamentClick }) {
    const location = useLocation();

    const sidebarBgColor = 'bg-[#0C0909]';
    const sidebarBorderColor = 'border-r-[#B22222]';

    const isHomePage = location.pathname === '/';

    if (isHomePage) {
        return null;
    }

    return (
        <div className={`flex-shrink-0 ${sidebarBgColor} ${sidebarBorderColor} border-r-4 w-16 p-2 h-screen flex flex-col`}>
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
                    <button onClick={onCreateTournamentClick} className="flex items-center justify-center hover:bg-[#1a1212] p-1 rounded transition duration-300">
                        <CgAdd className="w-8 h-8" />
                    </button>
                </li>
            </ul>
            <div className="flex justify-center mt-auto">
            <button onClick={logout} className="flex items-center text-red-500 hover:bg-[#1a1212] p-2 rounded transition duration-300">
                    <FaSignOutAlt className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
}

export default MySidebar;
