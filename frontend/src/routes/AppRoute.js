import React from "react";
import { Routes, Route } from 'react-router-dom';

import { Home } from "../pages/Home";
import { AdminLayout } from "../layouts/adminLayouts/AdminLayout";

/* USUARIOS */
import { ListComponent } from "../pages/adminPages/users/ListComponent";
import { CreateUserComponent } from "../pages/adminPages/users/CreateUserComponent";

/* CAMIONES */
import { ListTruckComponent } from "../pages/adminPages/trucks/ListTruckComponent";
import { CreateTruckComponent } from "../pages/adminPages/trucks/CreateTruckComponent";

import { DragAndDrop } from "../pages/adminPages/tasks/ListTaskComponent";
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
            {/* USUARIOS */}
            <Route path="/admin/users" element={loadLayout(AdminLayout, ListComponent)} />
            <Route path="/admin/users/create" element={loadLayout(AdminLayout, CreateUserComponent)} />

            {/* CAMIONES */}
            <Route path="/admin/trucks" element={loadLayout(AdminLayout, ListTruckComponent)} />
            <Route path="/admin/truck/create" element={loadLayout(AdminLayout, CreateTruckComponent)} />

            <Route path="/admin/drivers" element={loadLayout(AdminLayout, ListDriversComponent)} />
            <Route path="/admin/tasks/:driverId" element={loadLayout(AdminLayout, DragAndDrop)} />
        </Routes>
    )
}