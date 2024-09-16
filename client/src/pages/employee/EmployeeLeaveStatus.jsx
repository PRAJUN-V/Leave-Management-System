import React, { useState, useEffect } from 'react';
import api from '../../api';
import { jwtDecode } from 'jwt-decode';
import { EmployeeHeader } from './components/EmployeeHeader';
import { EmployeeSideBar } from './components/EmployeeSideBar';

// Function to get the user ID from token
const getUserIdFromToken = () => {
    const token = localStorage.getItem('access');
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.user_id; // Adjust this key based on your token structure
    }
    return null;
};

const EmployeeLeaveStatus = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [modalContent, setModalContent] = useState({ isVisible: false, content: '' });
    const [userId, setUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [leavesPerPage] = useState(10);

    // Fetch user ID from token
    useEffect(() => {
        const id = getUserIdFromToken();
        setUserId(id);
    }, []);

    // Fetch leave data
    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const response = await api.get(`/api/employee/leave_status/${userId}/`);
                    // Sort the data by id in descending order
                    const sortedData = response.data.sort((a, b) => b.id - a.id);
                    setLeaveData(sortedData);
                } catch (error) {
                    console.error('Error fetching leave data:', error);
                }
            }
        };

        fetchData();
    }, [userId]);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get current leaves
    const indexOfLastLeave = currentPage * leavesPerPage;
    const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
    const currentLeaves = leaveData.slice(indexOfFirstLeave, indexOfLastLeave);

    const handleViewClick = (content) => {
        setModalContent({ isVisible: true, content });
    };

    const handleCloseModal = () => {
        setModalContent({ isVisible: false, content: '' });
    };

    const totalPages = Math.ceil(leaveData.length / leavesPerPage);

    return (
        <>
            <div className="flex min-h-screen">
                {/* Sidebar with appropriate width */}
                <EmployeeSideBar />

                {/* Main content area */}
                <div className="flex-grow flex flex-col">
                    {/* Header */}
                    <EmployeeHeader />

                    {/* Main content */}
                    <div className="p-4 flex-grow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Leave Status</h2>
                        </div>

                        {/* Leave Status Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Feedback</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentLeaves.map((leave) => (
                                        <tr key={leave.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{leave.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.leave_type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.leave_date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleViewClick(leave.reason || 'Not updated')}
                                                >
                                                    View
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.leave_status}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleViewClick(leave.reason_not_approved || 'Not updated')}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="mt-4 flex justify-between items-center">
                            <button
                                className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </button>
                            <span className="px-4">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>

                        {/* Modal for viewing reasons */}
                        {modalContent.isVisible && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                                    <p>{modalContent.content}</p>
                                    <button
                                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                        onClick={handleCloseModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeLeaveStatus;
