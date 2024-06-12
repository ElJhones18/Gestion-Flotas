import React from "react";
import { Routes, Route } from 'react-router-dom';
import { AuthLayout } from "../layouts/authLayouts/AuthLayout";
import { Register } from "../pages/authPages/Register";
import { Login } from "../pages/authPages/Login";
import { Unauthorized } from "../components/general/auth/Unauthorized";
import { AdminLayout } from "../layouts/adminLayouts/AdminLayout";
import RequireNoAuth from "../components/general/auth/RequireNoAuth";

export const OpenRoutes = () => {
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        )
    }
    return (
        <Routes>
            <Route element={<RequireNoAuth />}>
                <Route path="/" element={loadLayout(AuthLayout, Register)} />
                <Route path="/register" element={loadLayout(AuthLayout, Register)} />
                <Route path="/login" element={loadLayout(AuthLayout, Login)} />
            </Route>
            
            <Route path="/unauthorized" element={loadLayout(AdminLayout, Unauthorized)} />
        </Routes>
    )
}