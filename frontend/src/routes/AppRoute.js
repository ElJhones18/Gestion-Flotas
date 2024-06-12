import React from "react";
import { Routes, Route } from 'react-router-dom';
import RequireAuth from '../components/general/auth/RequireAuth.js';

import { Home } from "../pages/Home";
// import { Home } from "../pages/Home";
import { AdminLayout } from "../layouts/adminLayouts/AdminLayout";
import { ROUTES } from "./index"

/* USUARIOS */
import { ListComponent } from "../pages/adminPages/users/ListComponent";
import { CreateUserComponent } from "../pages/adminPages/users/CreateUserComponent";

/* CAMIONES */
import { ListTruckComponent } from "../pages/adminPages/trucks/ListTruckComponent";
import { CreateTruckComponent } from "../pages/adminPages/trucks/CreateTruckComponent";

import { DragAndDrop } from "../pages/adminPages/tasks/ListTask";
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
            <Route element={<RequireAuth />}>

                <Route path="/home" element={loadLayout(AdminLayout, Home)} />

                {/* USUARIOS */}
                <Route path={ROUTES.ADMIN_LIST_USERS} element={loadLayout(AdminLayout, ListComponent)} />
                <Route path={ROUTES.ADMIN_CREATE_USER} element={loadLayout(AdminLayout, CreateUserComponent)} />

                {/* CAMIONES */}
                <Route path="/admin/trucks" element={loadLayout(AdminLayout, ListTruckComponent)} />
                <Route path={ROUTES.ADMIN_CREATE_TRUCK} element={loadLayout(AdminLayout, CreateTruckComponent)} />

                <Route path="/admin/drivers" element={loadLayout(AdminLayout, ListDriversComponent)} />
                <Route path={ROUTES.ADMIN_EDIT_TASK} element={loadLayout(AdminLayout, DragAndDrop)} />
            </Route>
        </Routes>
    )
}