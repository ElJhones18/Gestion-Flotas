import React from "react";
import { Routes, Route } from 'react-router-dom';
import { AuthLayout } from "../layouts/authLayouts/AuthLayout";
import { Register } from "../pages/authPages/Register";
import { Login } from "../pages/authPages/Login";

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
            <Route path="/" element={loadLayout(AuthLayout, Register)} />
            <Route path="/register" element={loadLayout(AuthLayout, Register)} />
            <Route path="/login" element={loadLayout(AuthLayout, Login)} />
        </Routes>
    )
}