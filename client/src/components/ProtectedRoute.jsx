import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "./../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import Loading from "./Loading";

function ProtectedRoute({ children, requiredRole }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isActive, setIsActive] = useState(null);

    useEffect(() => {
        auth().catch(() => handleUnauthorized());
    }, []);

    const handleUnauthorized = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsAuthorized(false);
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/accounts/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                await checkUserStatus(res.data.access); // Check user status after refreshing the token
            } else {
                handleUnauthorized();
            }
        } catch (error) {
            console.log(error);
            handleUnauthorized();
        }
    };

    const checkUserStatus = async (token) => {
        try {
            const res = await api.get("/api/accounts/user-status/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                setIsActive(res.data.is_active);
                setUserRole(res.data.profile.role);

                if (res.data.is_active && (!requiredRole || requiredRole === res.data.profile.role)) {
                    setIsAuthorized(true);
                } else {
                    handleUnauthorized(); // User is not active, handle as unauthorized
                }
            } else {
                handleUnauthorized();
            }
        } catch (error) {
            console.log(error);
            handleUnauthorized();
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            handleUnauthorized();
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            await checkUserStatus(token); // Check user status if the token is valid
        }
    };

    if (isAuthorized === null) {
        return <Loading />
    }

    if (isAuthorized && isActive) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;
