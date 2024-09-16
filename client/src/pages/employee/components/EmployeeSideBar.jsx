import React from 'react'
import { Link } from 'react-router-dom';
// import logo from '../../../assets/images/Logo.png';
import logo from '../../../assets/image/Logo.png'
import { LogOut, Book, Calendar,CheckCircle } from 'react-feather';


export const EmployeeSideBar = () => {
    return (
        <div className="bg-gray-500 text-white  w-64 flex flex-col">
            {/* Logo and Name */}
            <div className="flex items-center justify-center ">
                <img src={logo} alt="Logo" className="h-20" />
                <span className="text-xl font-bold">ABC Company</span>
            </div>

            <div className="border-t border-white my-2"></div>

            {/* Admin Panel Text */}
            <div className="text-center py-4">
                <span className="text-xl font-semibold">Leave Management</span>
            </div>

            <div className="border-t border-white my-2"></div>

            {/* Navigation Links */}
            <nav className="flex-grow">
                <ul className="space-y-2">
                    <li>
                        <Link to="/" className="block py-2 px-4 hover:bg-gray-600">
                            <Calendar className="inline-block mr-2" /> Apply Leave
                        </Link>
                    </li>
                    <li>
                        <Link to="/employee/leave-status" className="block py-2 px-4 hover:bg-gray-600">
                            <CheckCircle className="inline-block mr-2" /> Leave Status
                        </Link>
                    </li>
                    <li>
                        <Link to="/employee/leave-policy" className="block py-2 px-4 hover:bg-gray-600">
                            <Book className="inline-block mr-2" /> Leave Policy
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout" className="block py-2 px-4 hover:bg-gray-600">
                            <LogOut className="inline-block mr-2" /> Log Out
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
