import React from "react";
import { Routes, Route } from 'react-router-dom';
import { ListComponent } from "../pages/adminPages/users/ListComponent";
// import { ListVehicleComponent } from "../pages/AdminPages/vehicles/ListVehicleComponent";
import { AdminLayout } from "../layouts/adminLayouts/AdminLayout";
import { DragAndDrop } from "../pages/adminPages/drivers/TaskComponent";
import { Home } from "../pages/Home";
import { ListDriversComponent } from "../pages/adminPages/drivers/ListDriversComponent";

export const AdminRoutes = () => {
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        )
    }
    return (
        <Routes>
            <Route path="/admin/users" element={loadLayout(AdminLayout, ListComponent)} />
            <Route path="/admin/drivers" element={loadLayout(AdminLayout, ListDriversComponent)} />
            <Route path="/admin/tasks/:driverId" element={loadLayout(AdminLayout, DragAndDrop)} />
            <Route path="/" element={loadLayout(AdminLayout, Home)} />
        </Routes>
    )
}