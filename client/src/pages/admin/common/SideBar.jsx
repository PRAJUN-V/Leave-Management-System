import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../../assets/images/Logo.png';
import logo from '../../../assets/image/Logo.png'
import { LogOut, Users, Grid, FileText, Calendar, BarChart2  } from 'react-feather';

export const SideBar = () => {
    return (
        <div className="bg-blue-500 text-white  w-64 flex flex-col">
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
                    {/* <li>
                        <Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-blue-600">
                            <Grid className="inline-block mr-2" /> Dashboard
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/admin/user-management" className="block py-2 px-4 hover:bg-blue-600">
                            <Users className="inline-block mr-2" /> Employees
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/leave-management" className="block py-2 px-4 hover:bg-blue-600">
                            <FileText className="inline-block mr-2" /> Leave Management
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/leave-report" className="block py-2 px-4 hover:bg-blue-600">
                            <BarChart2 className="inline-block mr-2" /> Leave Report
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/admin/course_list" className="block py-2 px-4 hover:bg-blue-600">
                            <Calendar className="inline-block mr-2" /> Calender view
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/logout" className="block py-2 px-4 hover:bg-blue-600">
                            <LogOut className="inline-block mr-2" /> Log Out
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
