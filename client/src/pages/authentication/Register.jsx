import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CornerUpLeft } from 'react-feather';

// Validation schema using Yup
const validationSchema = Yup.object({
    first_name: Yup.string()
        .required("First name is required"),
    last_name: Yup.string()
        .required("Last name is required"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
        ),
    email: Yup.string().email("Invalid email address").required("Email is required"),
});

export const Register = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Handle form submission
    const handleRegister = async (values) => {
        setLoading(true);
        const userData = {
            first_name: values.first_name,
            last_name: values.last_name,
            password: values.password,
            email: values.email,
            profile: { role: "employee" },
        };

        try {
            await api.post("api/accounts/register/", userData);
            toast.success('New employee registration was successful.');
            setTimeout(() => {
                navigate("/admin/user-management");
            }, 2000);
        } catch (error) {
            toast.error('Registration failed. The email might already exist.');
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Formik setup
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            password: "",
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleRegister(values);
        },
    });

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-blue-500 mb-4">New Employee Registration</h1>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="First Name"
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    {formik.touched.first_name && formik.errors.first_name ? (
                        <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
                    ) : null}

                    <input
                        type="text"
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Last Name"
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    {formik.touched.last_name && formik.errors.last_name ? (
                        <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
                    ) : null}

                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Email"
                        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    ) : null}

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Password"
                            autoComplete="new-password"
                            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-2 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 text-sm">{formik.errors.password}</div>
                    ) : null}

                    <button
                        className="w-full p-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="text-center">
                    <CornerUpLeft className="inline-block mr-2" />
                    <Link to="/admin/user-management" className="text-blue-500 hover:underline">
                        back
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
