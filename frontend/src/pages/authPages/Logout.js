import React from 'react'
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const Logout = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('token');

    const { setAuth } = useAuth();
    setAuth({});

    return (

        <Navigate to='/login' />
    )
}