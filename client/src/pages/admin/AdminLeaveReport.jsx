import React, { useEffect, useState } from 'react';
import api from '../../api';
import Header from './common/Header';
import { SideBar } from './common/Sidebar';

export const AdminLeaveReport = () => {
    const [userLeaveData, setUserLeaveData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchUserLeaveData = async () => {
            try {
                const response = await api.get('/api/admin/user-leave-report/');
                const mappedData = response.data.map(user => ({
                    full_name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    num_sick_leave: user.num_sick_leave,
                    num_casual_leave: user.num_casual_leave,
                    num_other_leave: user.num_other_leave
                }));
                setUserLeaveData(mappedData);
            } catch (err) {
                setError('Error fetching user leave data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserLeaveData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = userLeaveData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(userLeaveData.length / itemsPerPage);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-grow flex flex-col">
                <Header />
                <div className="p-4 flex-grow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Overall Report</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sick Leave</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Casual Leave</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other Leave</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.map((user) => (
                                    <tr key={user.email}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.full_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.num_sick_leave}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.num_casual_leave}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.num_other_leave}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 text-white' : 'bg-blue-500 text-white'}`}
                        >
                            Previous
                        </button>
                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 text-white' : 'bg-blue-500 text-white'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
