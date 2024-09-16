import React, { useState, useEffect } from 'react';
import api from '../../api'; // Custom API instance
import Header from './common/Header';
import { SideBar } from './common/Sidebar';
import { useNavigate } from 'react-router-dom';

const AdminLeaveManagement = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [leavesPerPage] = useState(10);
    const [modalContent, setModalContent] = useState({ isVisible: false, content: '' });
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [approvalRemark, setApprovalRemark] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [isRejecting, setIsRejecting] = useState(false); // To check if rejecting
    const navigate = useNavigate();

    // Function to fetch leave data from the server
    const fetchData = async () => {
        try {
            const response = await api.get('/api/admin/admin_leave_requests/');
            setLeaveData(response.data);
        } catch (error) {
            console.error('Error fetching leave data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const indexOfLastLeave = currentPage * leavesPerPage;
    const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
    const currentLeaves = leaveData.slice(indexOfFirstLeave, indexOfLastLeave);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleViewClick = (reason) => {
        setModalContent({ isVisible: true, content: reason });
    };

    const handleCloseModal = () => {
        setModalContent({ isVisible: false, content: '' });
    };

    const handleApprove = async () => {
        if (!selectedLeave) {
            console.error('No leave request selected');
            return;
        }

        try {
            await api.patch(`/api/admin/admin_leave_requests/${selectedLeave.id}/`, {
                admin_approved: true,
                reason_not_approved: rejectionReason,
            });
            await fetchData(); // Refresh the leave data
            setSelectedLeave(null); // Clear selected leave
            handleCloseModal(); // Close the modal
        } catch (error) {
            console.error('Error approving leave request:', error);
        }
    };

    const handleReject = async () => {
        if (!selectedLeave) {
            console.error('No leave request selected');
            return;
        }

        try {
            await api.patch(`/api/admin/admin_leave_requests/${selectedLeave.id}/`, {
                admin_approved: false,
                reason_not_approved: rejectionReason,
            });
            await fetchData(); // Refresh the leave data
            setRejectionReason(''); // Clear rejection reason
            setSelectedLeave(null); // Clear selected leave
            handleCloseModal(); // Close the modal
        } catch (error) {
            console.error('Error rejecting leave request:', error);
        }
    };

    const handleAction = async (actionType) => {
        if (!selectedLeave) {
            console.error('No leave request selected');
            return;
        }

        if (actionType === 'approve') {
            await handleApprove();
        } else if (actionType === 'reject') {
            if (rejectionReason.trim()) {
                await handleReject();
            } else {
                console.error('Rejection reason is required');
            }
        }
    };

    const totalPages = Math.ceil(leaveData.length / leavesPerPage);

    return (
        <>
            <div className="flex min-h-screen">
                <SideBar />
                <div className="flex-grow flex flex-col">
                    <Header />
                    <div className="p-4 flex-grow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Leave Management</h2>
                        </div>

                        {/* Leave Status Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action / Remark</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentLeaves.map((leave) => (
                                        <tr key={leave.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{leave.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.user.first_name} {leave.user.last_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.leave_type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{leave.leave_date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleViewClick(leave.reason)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {leave.admin_approved === null ? 'Pending' : leave.admin_approved ? 'Approved' : leave.reason_not_approved ? 'Rejected' : 'Pending'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {(leave.admin_approved === null || (leave.admin_approved === false && !leave.reason_not_approved)) && (
                                                    <>
                                                        <button
                                                            className="text-green-500 hover:text-green-700 mr-2"
                                                            onClick={() => {
                                                                setIsRejecting(false);
                                                                setSelectedLeave(leave);
                                                            }}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => {
                                                                setIsRejecting(true);
                                                                setSelectedLeave(leave);
                                                            }}
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {leave.admin_approved === false && leave.reason_not_approved && (
                                                    <button
                                                        className="text-blue-500 hover:text-blue-700"
                                                        onClick={() => handleViewClick(leave.reason_not_approved)}
                                                    >
                                                        View
                                                    </button>
                                                )}
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
                                    <h3 className="text-lg font-semibold mb-2">Leave Reason</h3>
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

                        {/* Approve/Reject Modal */}
                        {selectedLeave && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
                                    <h3 className="text-lg font-semibold mb-2">Leave Action</h3>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            {isRejecting ? 'Reason for Rejection' : 'Confirm Approval'}
                                        </label>
                                        {isRejecting ? (
                                            <textarea
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                rows="3"
                                                value={rejectionReason}
                                                onChange={(e) => setRejectionReason(e.target.value)}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        {/* <button
                                            className="bg-gray-300 text-white px-4 py-2 rounded"
                                            onClick={handleCloseModal}
                                        >
                                            Cancel
                                        </button> */}
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                            onClick={() => handleAction(isRejecting ? 'reject' : 'approve')}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLeaveManagement;
