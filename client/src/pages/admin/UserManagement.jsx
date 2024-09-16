import React, { useEffect, useState } from 'react';
import Header from './common/Header';
import { SideBar } from './common/Sidebar';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const USERS_PER_PAGE = 5;

export const UserManagement = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // Added status filter state

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/api/admin/users/');
            setUsers(response.data);
            setTotalPages(Math.ceil(response.data.length / USERS_PER_PAGE));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized access. Please log in.');
                navigate('/login');
            } else {
                console.error('Error fetching users:', error.message || error);
            }
        }
    };

    const toggleUserStatus = async (userId) => {
        try {
            await api.post(`/api/admin/users/toggle-status/${userId}/`);
            fetchUsers(); // Refresh the user list after toggling status
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized access. Please log in.');
                navigate('/login');
            } else {
                console.error('Error toggling user status:', error.message || error);
            }
        }
    };

    const handleAddNewEmployee = () => {
        navigate('/register');
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Filter users based on search query and status filter
    const filteredUsers = users.filter(user => {
        const nameMatches = user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());

        const statusMatches = statusFilter === 'all' ||
            (statusFilter === 'active' && user.is_active) ||
            (statusFilter === 'inactive' && !user.is_active);

        return nameMatches && statusMatches;
    });

    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return (
        <>
            <div className="flex min-h-screen">
                <SideBar />
                <div className="flex-grow flex flex-col">
                    <Header />
                    <div className="p-4 flex-grow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Employee Management</h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleAddNewEmployee}
                            >
                                Add New Employee
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by first name, last name, or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border px-4 py-2 rounded w-96 focus:outline-none focus:border-transparent"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="mb-4">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="border px-4 py-2 rounded w-48 focus:outline-none focus:border-transparent"
                            >
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse border border-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border">First Name</th>
                                        <th className="px-4 py-2 border">Last Name</th>
                                        <th className="px-4 py-2 border">Email</th>
                                        <th className="px-4 py-2 border">Status</th>
                                        <th className="px-4 py-2 border">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUsers.map(user => (
                                        <tr key={user.id}>
                                            <td className="px-4 py-2 border text-center">
                                                {user.first_name || 'NaN'}
                                            </td>
                                            <td className="px-4 py-2 border text-center">
                                                {user.last_name || 'NaN'}
                                            </td>
                                            <td className="px-4 py-2 border text-center">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-2 border text-center">
                                                {user.is_active ? 'Active' : 'Inactive'}
                                            </td>
                                            <td className="px-4 py-2 border text-center">
                                                <button
                                                    className="px-4 py-2 rounded text-white"
                                                    style={{
                                                        backgroundColor: user.is_active ? '#f56565' : '#48bb78', // red and green
                                                        minWidth: '100px' // Fixed width to avoid resizing
                                                    }}
                                                    onClick={() => toggleUserStatus(user.id)}
                                                >
                                                    {user.is_active ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <button
                                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500'} text-white`}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="mx-4 text-lg">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500'} text-white`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
