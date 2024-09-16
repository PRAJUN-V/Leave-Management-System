import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/Loading";

export const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
            ),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const res = await api.post("api/accounts/token/", {
                email: values.email,
                password: values.password,
            });

            const { access, refresh } = res.data;
            localStorage.setItem(ACCESS_TOKEN, access);
            localStorage.setItem(REFRESH_TOKEN, refresh);

            const decoded = jwtDecode(access);
            const userRole = decoded.role;

            switch (userRole) {
                case "admin":
                    navigate("/admin/user-management");
                    break;
                case "employee":
                    navigate("/");
                    break;
                default:
                    navigate("/login");
                    break;
            }
        } catch (error) {
            setErrors({ submit: "Incorrect email or password." });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
            <h1 className="text-xl font-bold text-blue-500 mb-4 text-center">Leave Management System</h1>
                <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">Login</h1>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <>
                            {isSubmitting && <Loading />}
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="password" className="block text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            placeholder="Enter your password"
                                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </button>
                                    </div>
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {errors.submit && (
                                    <div className="text-red-500 text-sm mb-4 text-center">
                                        {errors.submit}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                                >
                                    Login
                                </button>
                            </Form>

                            {/* <div className="mt-6 text-center">
                                <Link to="/forgot-password" className="text-blue-500 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div> */}

                            <div className="mt-4 text-center">
                                <span className="text-gray-700">If you experience any issues while logging in, please contact the administrator.</span>
                            </div>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    );
};
