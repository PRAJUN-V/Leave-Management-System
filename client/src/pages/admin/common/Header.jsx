import React from 'react';
import { LogOut } from 'react-feather';
import { Link } from 'react-router-dom';

// import profileImage from '../../../assets/images/Logo.png'; // Replace with your actual profile picture URL

const Header = () => {
    return (
        <div className="bg-white p-6 flex justify-between items-center shadow">
            <div className="flex-grow"></div>
            <div className="flex items-center">
                <Link
                    to="/logout"
                    className="block py-2 px-4 font-bold text-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition-all duration-300"
                >
                    <LogOut className="inline-block mr-2" /> Log Out
                </Link>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    {/* <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> */}
                </div>
            </div>
        </div>
    );
};

export default Header;
