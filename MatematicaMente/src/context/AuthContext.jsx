import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({ isAuthenticated: false, role: null });

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001/verifyuser', {withCredentials: true})
            .then(response => {
                if (response.data.Status === 'Success') {
                    setAuth({ isAuthenticated: true, role: response.data.Role });
                }
            })
            .catch(() => {
                setAuth({ isAuthenticated: false, role: null });
            });
    }, []);

    const login = async (values) => {
        try {
            const res = await axios.post('http://localhost:3001/login', values, {withCredentials: true});
            if (res.data.Status === "Success") {
                const role  = res.data.Role;
                setAuth({ isAuthenticated: true, role });
                return { success: true, role };
            } else {
                return { success: false, message: res.data.Error };
            }
        } catch (err) {
            return { success: false, message: 'Error al iniciar sesión' };
        }
    };

    const logout = async () => {
        try {
            const res = await axios.get('http://localhost:3001/logout', { withCredentials: true });
            if (res.data.Status === "Success") {
                setAuth({ isAuthenticated: false, role: null });
                return { success: true };
            } else {
                return { success: false, message: "Error al Cerrar la sesion (response Axios)" };
            }
        } catch (err) {
            return { success: false, message: 'Error al Cerrar la sesion (Axios)' };
        }
    };

    const register = async (values) => {
        try {
            const res = await axios.post('http://localhost:3001/register', values, {withCredentials: true});
            if (res.data.Status === "Success") {
                return { success: true, message: "Usuario Creado con Exito" };
            } else {
                return { success: false, message: res.data.Error };
            }
        } catch (err) {
            return { success: false, message: 'Error al Registrar (Axios)' };
        }
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);