import React from "react";
import { Routes, Route } from 'react-router-dom';
import RequireAuth from '../components/general/auth/RequireAuth.js';
import PersistLogin from "../components/general/auth/PersistLogin.js";

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

import { DragAndDrop } from "../pages/adminPages/tasks/ListTaskComponent";
import { ListDriversComponent } from "../pages/adminPages/drivers/ListDriversComponent";

import { Logout } from "../pages/authPages/Logout.js";

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

            <Route element={<PersistLogin />}>

                <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                    <Route path={ROUTES.ADMIN_LIST_USERS} element={loadLayout(AdminLayout, ListComponent)} />
                    <Route path={ROUTES.ADMIN_CREATE_USER} element={loadLayout(AdminLayout, CreateUserComponent)} />
                    <Route path={ROUTES.ADMIN_CREATE_TRUCK} element={loadLayout(AdminLayout, CreateTruckComponent)} />
                    <Route path={ROUTES.ADMIN_EDIT_TASK} element={loadLayout(AdminLayout, DragAndDrop)} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["Conductor", "Admin"]} />}>
                    <Route path="/home" element={loadLayout(AdminLayout, Home)} />
                    <Route path="/logout" element={loadLayout(AdminLayout, Logout)} />
                    <Route path="/admin/trucks" element={loadLayout(AdminLayout, ListTruckComponent)} />
                    <Route path="/admin/drivers" element={loadLayout(AdminLayout, ListDriversComponent)} />
                </Route>

            </Route>
            {/* USUARIOS */}

            {/* CAMIONES */}

        </Routes >
    )
}