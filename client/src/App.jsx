import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import { Login } from "./pages/authentication/Login"
import { Register } from "./pages/authentication/Register"
import { EmployeeDashboard } from "./pages/employee/EmployeeDashboard"
import { UserManagement } from "./pages/admin/UserManagement"
import { EmployeeLeavePolicy } from "./pages/employee/EmployeeLeavePolicy"
import EmployeeLeaveStatus from "./pages/employee/EmployeeLeaveStatus"
import AdminLeaveManagement from "./pages/admin/AdminLeaveManagement"
import { AdminLeaveReport } from "./pages/admin/AdminLeaveReport"


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* General route : Anyone can access this page */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />


        {/* Employee Routes */}
        <Route path="/" element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        } />

        <Route path="/employee/leave-policy" element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeLeavePolicy />
          </ProtectedRoute>
        } />

        <Route path="/employee/leave-status" element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeLeaveStatus />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}

        <Route path="/register" element={
          <ProtectedRoute requiredRole="admin">
            <Register />
          </ProtectedRoute>
        } />

        <Route path="/admin/leave-management" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLeaveManagement />
          </ProtectedRoute>
        } />

        <Route path="/admin/leave-report" element={
          <ProtectedRoute requiredRole="admin">
            <AdminLeaveReport />
          </ProtectedRoute>
        } />

        <Route path="/admin/user-management" element={
          <ProtectedRoute requiredRole="admin">
            <UserManagement />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App