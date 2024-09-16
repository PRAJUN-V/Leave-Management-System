import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import api from '../../api';
import { EmployeeHeader } from './components/EmployeeHeader';
import { EmployeeSideBar } from './components/EmployeeSideBar';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

export const EmployeeDashboard = () => {
  const [formData, setFormData] = useState({
    leave_type: '',
    leave_date: '',
    reason: '',
    request_date: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Set today's date as request_date by default
    const today = new Date().toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:MM
    setFormData((prevData) => ({
      ...prevData,
      request_date: today
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access'); // Assuming the token is stored in localStorage
    if (!token) {
      toast.error('User not authenticated');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;

    try {
      await api.post(`/api/employee/leave-request/${userId}/`, formData);
      toast.success('Leave request sent successfully');
      setFormData({
        leave_type: '',
        leave_date: '',
        reason: '',
        request_date: new Date().toISOString().slice(0, 16) // Reset to today's date
      });
    } catch (error) {
      toast.error('Failed to send leave request');
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <EmployeeSideBar />
        <div className="flex-grow flex flex-col">
          <EmployeeHeader />
          <div className="p-4 flex-grow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Leave Application</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-1/2 mx-auto"> {/* Center and limit width */}
                <label htmlFor="leave_type" className="block text-sm font-medium text-gray-700">Leave Type</label>
                <select
                  id="leave_type"
                  name="leave_type"
                  value={formData.leave_type}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-12"
                >
                  <option value="">Select Leave Type</option>
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="w-1/2 mx-auto"> {/* Center and limit width */}
                <label htmlFor="leave_date" className="block text-sm font-medium text-gray-700">Leave Date</label>
                <input
                  type="date"
                  id="leave_date"
                  name="leave_date"
                  value={formData.leave_date}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-12"
                />
              </div>
              <div className="w-1/2 mx-auto"> {/* Center and limit width */}
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-32 resize-none"
                />
              </div>
              <div className="w-1/2 mx-auto"> {/* Center and limit width */}
                <label htmlFor="request_date" className="block text-sm font-medium text-gray-700">Request Date</label>
                <input
                  type="datetime-local"
                  id="request_date"
                  name="request_date"
                  value={formData.request_date}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-12"
                  readOnly // Prevent user from changing the date
                />
              </div>
              <button
                type="submit"
                className="bg-gray-500 text-white py-2 px-4 rounded-md mx-auto block"
              >
                Apply
              </button>
            </form>
            <ToastContainer /> {/* Add ToastContainer here */}
          </div>
        </div>
      </div>
    </>
  );
};
